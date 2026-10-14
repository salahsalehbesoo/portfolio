/**
 * ============================================================================
 * Pro Portfolio - Smart Visitor Analytics & Traffic Engine
 * ============================================================================
 * Zero-cost, privacy-friendly visitor intelligence engine.
 * Distinguishes between New vs. Returning visitors, tracks devices,
 * and monitors customer conversion actions (WhatsApp Clicks, Calculator uses).
 */

const AnalyticsEngine = {
    init() {
        this.trackVisit();
        this.setupActionTrackers();
    },

    getAnalyticsData() {
        try {
            const raw = localStorage.getItem('pro_portfolio_analytics');
            if (raw) return JSON.parse(raw);
        } catch (e) {
            console.error("Error reading analytics:", e);
        }
        return {
            totalVisits: 0,
            uniqueVisitors: 0,
            returningVisits: 0,
            waClicks: 0,
            calcUses: 0,
            videoPlays: 0,
            visitsLog: []
        };
    },

    saveAnalyticsData(data) {
        try {
            // Keep recent 150 visits in log for optimal performance
            if (data.visitsLog && data.visitsLog.length > 150) {
                data.visitsLog = data.visitsLog.slice(0, 150);
            }
            localStorage.setItem('pro_portfolio_analytics', JSON.stringify(data));
        } catch (e) {
            console.error("Error saving analytics:", e);
        }
    },

    trackVisit() {
        const data = this.getAnalyticsData();
        const visitorToken = localStorage.getItem('pro_portfolio_vtoken');
        const now = new Date();
        const isReturning = Boolean(visitorToken);

        let visitorId = visitorToken;
        if (!visitorToken) {
            visitorId = 'vis_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
            localStorage.setItem('pro_portfolio_vtoken', visitorId);
            data.uniqueVisitors = (data.uniqueVisitors || 0) + 1;
        } else {
            data.returningVisits = (data.returningVisits || 0) + 1;
        }

        data.totalVisits = (data.totalVisits || 0) + 1;

        // Session entry
        const visitEntry = {
            id: 'log_' + Date.now(),
            visitorId: visitorId,
            isReturning: isReturning,
            device: this.getDeviceType(),
            screen: `${window.innerWidth}x${window.innerHeight}`,
            language: navigator.language || 'ar',
            referrer: document.referrer ? new URL(document.referrer).hostname : 'Direct',
            timestamp: now.toISOString(),
            timeFormatted: now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
            dateFormatted: now.toLocaleDateString('ar-EG', { month: 'short', day: 'numeric' })
        };

        if (!data.visitsLog) data.visitsLog = [];
        data.visitsLog.unshift(visitEntry);

        this.saveAnalyticsData(data);
    },

    trackAction(actionType) {
        const data = this.getAnalyticsData();
        if (actionType === 'wa_click') {
            data.waClicks = (data.waClicks || 0) + 1;
        } else if (actionType === 'calc_use') {
            data.calcUses = (data.calcUses || 0) + 1;
        } else if (actionType === 'video_play') {
            data.videoPlays = (data.videoPlays || 0) + 1;
        }
        this.saveAnalyticsData(data);
    },

    setupActionTrackers() {
        // Track all WhatsApp buttons
        document.querySelectorAll('a[href*="wa.me"]').forEach(btn => {
            btn.addEventListener('click', () => {
                this.trackAction('wa_click');
            });
        });

        // Track video play clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.project-card') || e.target.closest('.project-play-btn')) {
                this.trackAction('video_play');
            }
        });
    },

    getDeviceType() {
        const ua = navigator.userAgent;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
            return 'Tablet';
        }
        if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
            return 'Mobile';
        }
        return 'Desktop';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Only track if not currently viewing admin panel
    if (!window.location.pathname.endsWith('admin.html')) {
        AnalyticsEngine.init();
    }
});
