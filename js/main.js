/**
 * ============================================================================
 * Creative Portfolio - High Performance Client Interactive Logic (2026)
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------------------------------------------
    // 0. Domain License Verification (Master Domain Lock)
    // ------------------------------------------------------------------------
    if (typeof verifyLicense === 'function' && !verifyLicense()) {
        document.body.innerHTML = `
            <div style="min-height:100vh; display:flex; align-items:center; justify-content:center; background:#07070a; color:#fff; font-family:Cairo, sans-serif; text-align:center; padding:2rem;">
                <div style="background:rgba(239,68,68,0.08); border:1px solid rgba(239,68,68,0.3); border-radius:24px; padding:3rem; max-width:550px;">
                    <i class="fa-solid fa-triangle-exclamation" style="font-size:3.5rem; color:#ef4444; margin-bottom:1.25rem;"></i>
                    <h1 style="font-size:1.8rem; font-weight:900; margin-bottom:0.75rem;">قالب غير مرخص لهذا الدومين</h1>
                    <p style="color:#aaa; font-size:1rem; line-height:1.6; margin-bottom:1.5rem;">
                        هذا النطاق غير مصرح له بتشغيل القالب. يرجى التواصل مع مالك القالب لتفعيل الترخيص على هذا الدومين.
                    </p>
                    <a href="admin.html" style="background:#0071e3; color:#fff; text-decoration:none; padding:0.8rem 1.8rem; border-radius:9999px; font-weight:800; display:inline-block;">
                        فتح لوحة التحكم الخاصة
                    </a>
                </div>
            </div>
        `;
        return;
    }

    // ------------------------------------------------------------------------
    // 1. State Management & Dynamic Elements
    // ------------------------------------------------------------------------
    let siteConfig = getSiteConfig();
    let currentLang = localStorage.getItem('site_lang') || (siteConfig.branding && siteConfig.branding.defaultLang) || 'ar';
    let currentTheme = localStorage.getItem('site_theme') || siteConfig.branding.theme || 'dark';
    let currentCurrency = localStorage.getItem('site_currency') || 'USD';
    let activeFilter = 'shorts';

    // Dynamic Navbar & Profile Branding Integration
    const dynamicNavContainer = document.getElementById('dynamicNavContainer');
    const mobileNavLinks = document.getElementById('mobileNavLinks');
    if (dynamicNavContainer || mobileNavLinks) renderDynamicNavbar(dynamicNavContainer, mobileNavLinks);

    function applyProfileBranding() {
        const prof = siteConfig.profile || {};
        const logoBrandEl = document.getElementById('brandLogoLink');
        const brandLogoText = document.getElementById('brandLogoText');
        const brandLogoBadge = document.getElementById('brandLogoBadge');
        const mobileBrandLogoText = document.getElementById('mobileBrandLogoText');
        const mobileBrandLogoBadge = document.getElementById('mobileBrandLogoBadge');
        const mobileBrandLink = document.querySelector('.mobile-nav-header .nav-brand');
        const navWaCta = document.getElementById('navWaCta');
        const mobileNavWaCta = document.getElementById('mobileNavWaCta');

        if (prof.logoImgUrl) {
            if (logoBrandEl) {
                logoBrandEl.innerHTML = `<img src="${prof.logoImgUrl}" alt="Logo" style="max-height: 34px; border-radius: 6px;">`;
            }
            if (mobileBrandLink) {
                mobileBrandLink.innerHTML = `<img src="${prof.logoImgUrl}" alt="Logo" style="max-height: 34px; border-radius: 6px;">`;
            }
        } else {
            if (brandLogoText) brandLogoText.textContent = prof.logoText || "CREATIVE";
            if (brandLogoBadge) brandLogoBadge.textContent = prof.logoBadge || "PORTFOLIO";
            if (mobileBrandLogoText) mobileBrandLogoText.textContent = prof.logoText || "CREATIVE";
            if (mobileBrandLogoBadge) mobileBrandLogoBadge.textContent = prof.logoBadge || "PORTFOLIO";
        }

        if (navWaCta && prof.whatsapp) {
            navWaCta.href = `https://wa.me/${prof.whatsapp}`;
        }
        if (mobileNavWaCta && prof.whatsapp) {
            mobileNavWaCta.href = `https://wa.me/${prof.whatsapp}`;
        }

        updateFooterBranding();
        applyHeroProfileCard();
    }

    function updateFooterBranding() {
        const b = siteConfig.branding || {};
        const prof = siteConfig.profile || DEFAULT_CONFIG.profile;

        const footerBrandEl = document.getElementById('footerNavBrand') || document.querySelector('.site-footer .nav-brand');
        if (footerBrandEl) {
            if (prof.logoImgUrl) {
                footerBrandEl.innerHTML = `<img src="${prof.logoImgUrl}" alt="Logo" style="max-height: 32px; border-radius: 6px;">`;
            } else {
                const text = prof.logoText || "CREATIVE";
                const badge = prof.logoBadge || "PORTFOLIO";
                footerBrandEl.innerHTML = `${text}<span class="brand-badge">${badge}</span>`;
            }
        }

        const rightsEl = document.querySelector('[data-i18n="footer.rights"]');
        if (rightsEl) {
            rightsEl.textContent = currentLang === 'ar' 
                ? (b.footerRightsAr || 'جميع الحقوق محفوظة © 2026.') 
                : (b.footerRightsEn || 'All rights reserved © 2026.');
        }
        const devEl = document.querySelector('[data-i18n="footer.developerTag"]');
        if (devEl) {
            devEl.textContent = currentLang === 'ar' 
                ? (b.footerDevAr || 'تصميم وبرمجة خاصة بأعلى معايير السرعة والأمان.') 
                : (b.footerDevEn || 'Crafted with peak performance and security.');
        }
    }

    function applyHeroProfileCard() {
        const prof = siteConfig.profile || DEFAULT_CONFIG.profile;
        const coverEl = document.getElementById('heroProfileCover');
        const avatarEl = document.getElementById('heroProfileAvatar');
        const statusDot = document.getElementById('heroStatusDot');
        const statusBadge = document.getElementById('heroStatusBadge');
        const availText = document.getElementById('heroAvailabilityText');
        const expBadge = document.getElementById('heroExpBadge');
        const nameEl = document.getElementById('heroProfileName');
        const roleEl = document.getElementById('heroProfileRole');
        const bioEl = document.getElementById('heroProfileBio');
        const featuresWrap = document.getElementById('heroFeaturesWrap');
        const heroWaBtn = document.getElementById('heroWaBtn');
        const heroCalcBtn = document.getElementById('heroCalcBtn');
        const heroWorksBtn = document.getElementById('heroWorksBtn');
        const floatingWaBubble = document.getElementById('floatingWaBubble');

        if (coverEl && prof.coverUrl) coverEl.src = prof.coverUrl;
        if (avatarEl && prof.avatarUrl) avatarEl.src = prof.avatarUrl;

        // Work status handling
        const status = prof.workStatus || 'online'; // online | busy | offline
        if (statusDot) {
            statusDot.className = `status-indicator-dot dot-${status}`;
            statusDot.title = currentLang === 'ar'
                ? (status === 'online' ? 'متصل الآن ومتاح' : (status === 'busy' ? 'مشغول حالياً في مشروع' : 'غير متصل الآن'))
                : (status === 'online' ? 'Online & Available' : (status === 'busy' ? 'Busy on Project' : 'Offline / Away'));
        }
        if (statusBadge) {
            statusBadge.className = `status-pill status-pill-${status === 'online' ? 'available' : (status === 'busy' ? 'busy' : 'offline')}`;
        }
        if (availText) {
            if (currentLang === 'ar') {
                availText.textContent = prof.availabilityText || prof.statusTextAr || (status === 'online' ? 'متاح الآن لمشاريع جديدة' : (status === 'busy' ? 'مشغول حالياً • متاح للحجز المسبق' : 'خارج أوقات العمل الآن'));
            } else {
                availText.textContent = prof.availabilityTextEn || prof.statusTextEn || (status === 'online' ? 'Available now for new projects' : (status === 'busy' ? 'Currently busy • Available for booking' : 'Outside business hours'));
            }
        }

        if (expBadge) {
            const expYears = prof.expYears || 3;
            expBadge.innerHTML = currentLang === 'ar'
                ? `<i class="fa-solid fa-award"></i> ${expYears} سنوات خبرة`
                : `<i class="fa-solid fa-award"></i> ${expYears}+ Years Experience`;
        }

        if (nameEl) {
            nameEl.textContent = currentLang === 'ar' ? (prof.nameAr || prof.nameEn || 'صانع ومحرر فيديو سينمائي') : (prof.nameEn || prof.nameAr || 'Creative Video Editor & Motion Designer');
        }
        if (roleEl) {
            roleEl.textContent = currentLang === 'ar' ? (prof.roleAr || prof.roleEn || 'مونتير فيديو ومصمم موشن جرافيكس') : (prof.roleEn || prof.roleAr || 'Creative Video Editor');
        }
        if (bioEl) {
            bioEl.textContent = currentLang === 'ar' ? (prof.bioAr || prof.bioEn || '') : (prof.bioEn || prof.bioAr || '');
        }

        // Action CTA buttons bilingual text
        if (heroCalcBtn) {
            const txt = heroCalcBtn.querySelector('span');
            if (txt) txt.textContent = currentLang === 'ar' ? 'احسب تكلفة مشروعك' : 'Estimate Project Cost';
            const arrow = heroCalcBtn.querySelector('i:last-child');
            if (arrow) arrow.className = currentLang === 'ar' ? 'fa-solid fa-arrow-left' : 'fa-solid fa-arrow-right';
        }
        if (heroWaBtn) {
            const txt = heroWaBtn.querySelector('span');
            if (txt) txt.textContent = currentLang === 'ar' ? 'مراسلة واتساب فورية' : 'Direct WhatsApp Chat';
        }
        if (heroWorksBtn) {
            const txt = heroWorksBtn.querySelector('span');
            if (txt) txt.textContent = currentLang === 'ar' ? 'تصفح الأعمال' : 'Explore Portfolio';
        }

        // Feature chips bilingual
        if (featuresWrap) {
            const feats = currentLang === 'ar' 
                ? (Array.isArray(prof.features) && prof.features.length > 0 ? prof.features : ["DaVinci Resolve & After Effects", "تصدير مناسب لكل المنصات", "إيقاع ممتع وسريع"])
                : (Array.isArray(prof.featuresEn) && prof.featuresEn.length > 0 ? prof.featuresEn : ["DaVinci Resolve & After Effects", "Platform-Optimized Deliverables", "High Retention & Cinematic Pacing"]);
            const icons = ['fa-wand-magic-sparkles', 'fa-desktop', 'fa-bolt', 'fa-film', 'fa-star'];
            featuresWrap.innerHTML = feats.map((feat, idx) => `
                <span class="hero-chip"><i class="fa-solid ${icons[idx % icons.length]}"></i> ${feat}</span>
            `).join('');
        }

        const waUrl = `https://wa.me/${prof.whatsapp || '201000000000'}`;
        if (heroWaBtn) heroWaBtn.href = waUrl;
        if (floatingWaBubble) floatingWaBubble.href = waUrl;
    }
    applyProfileBranding();

    // Calculator State
    let calcState = {
        tab: 'shorts',          // 'shorts' | 'long' | 'podcast'
        reelDuration: 60,       // 60, 90, 120, 180
        motionLevel: 'simple',  // 'simple' | 'heavy'
        longMinutes: 8,         // slider minutes
        podcastMinutes: 120,    // 60, 120, 180
        quantity: 1
    };

    const htmlEl = document.documentElement;
    const bodyEl = document.body;

    // Apply Theme
    function applyTheme(theme) {
        currentTheme = theme;
        localStorage.setItem('site_theme', theme);
        bodyEl.className = theme === 'light' ? 'theme-light' : 'theme-dark';
    }

    // Apply Language
    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('site_lang', lang);
        htmlEl.setAttribute('lang', lang);
        htmlEl.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

        const langLabel = document.getElementById('currentLangLabel');
        if (langLabel) langLabel.textContent = lang === 'ar' ? 'EN' : 'عربي';

        // Translate all data-i18n elements
        if (typeof translations !== 'undefined' && translations[lang]) {
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const path = el.getAttribute('data-i18n');
                const translation = getNestedTranslation(translations[lang], path);
                if (translation) el.innerHTML = translation;
            });
        }

        // Re-render dependent dynamic sections
        if (dynamicNavContainer || mobileNavLinks) renderDynamicNavbar(dynamicNavContainer, mobileNavLinks);
        applyHeroProfileCard();
        updateFooterBranding();
        renderProjects();
        renderHomePreviews();
        updateCalculator();
        renderReviews();
    }

    function getNestedTranslation(obj, path) {
        return path.split('.').reduce((prev, curr) => (prev && prev[curr] !== undefined) ? prev[curr] : null, obj);
    }

    // Controls Listeners
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
        });
    }

    const langToggleBtn = document.getElementById('langToggleBtn');
    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            applyLanguage(currentLang === 'ar' ? 'en' : 'ar');
        });
    }

    // ------------------------------------------------------------------------
    // 2. Projects Showcase & Filtering
    // ------------------------------------------------------------------------
    const projectsGrid = document.getElementById('projectsGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    function renderProjects() {
        if (!projectsGrid) return;
        const projects = getSiteProjects();
        projectsGrid.innerHTML = '';

        const filtered = projects.filter(p => {
            if (activeFilter === 'shorts') return p.category === 'shorts' || p.aspect === 'vertical';
            if (activeFilter === 'long') return p.category === 'long' || p.aspect === 'widescreen';
            return true;
        });

        if (filtered.length === 0) {
            projectsGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
                    <i class="fa-solid fa-film" style="font-size: 2.5rem; margin-bottom: 1rem; opacity: 0.4;"></i>
                    <p>${currentLang === 'ar' ? 'لا توجد مشاريع في هذا القسم حالياً.' : 'No projects found in this section.'}</p>
                </div>
            `;
            return;
        }

        filtered.forEach(proj => {
            const isVertical = proj.aspect === 'vertical';
            const title = currentLang === 'ar' ? (proj.titleAr || proj.titleEn) : (proj.titleEn || proj.titleAr);
            const thumb = proj.thumbnailUrl || 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80';

            const card = document.createElement('div');
            card.className = `project-card ${isVertical ? 'vertical-reel' : ''}`;
            card.setAttribute('data-id', proj.id);

            card.innerHTML = `
                <div class="project-thumb-wrapper ${isVertical ? 'aspect-9-16' : 'aspect-16-9'}">
                    <img src="${thumb}" alt="${title}" class="project-thumb-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80';">
                    <div class="project-floating-tags">
                        <span class="tag-badge tag-badge-accent">${proj.tag || 'Cinematic'}</span>
                        <span class="tag-badge">${isVertical ? '9:16 Reel' : '16:9 4K'}</span>
                    </div>
                    <div class="thumb-play-overlay">
                        <div class="play-circle-btn"><i class="fa-solid fa-play"></i></div>
                    </div>
                </div>
                <div class="project-info-box">
                    <h3 class="project-title" title="${title}">${title}</h3>
                    <div class="project-software">
                        <i class="fa-solid fa-wand-magic-sparkles"></i>
                        <span>${proj.software || 'DaVinci • AE'}</span>
                    </div>
                </div>
            `;

            card.addEventListener('click', () => {
                openLightbox(proj.videoUrl, title, isVertical, proj);
            });

            projectsGrid.appendChild(card);
        });
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeFilter = btn.getAttribute('data-filter');
            renderProjects();
        });
    });

    // ------------------------------------------------------------------------
    // 3. Home Previews for Tutorials & Store
    // ------------------------------------------------------------------------
    function renderHomePreviews() {
        const tutPreview = document.getElementById('homeTutorialsPreview');
        const storePreview = document.getElementById('homeStorePreview');

        if (tutPreview) {
            const tutorials = getSiteTutorials().slice(0, 3);
            tutPreview.innerHTML = '';
            tutorials.forEach(tut => {
                const card = document.createElement('a');
                card.href = 'tutorials.html';
                card.className = 'tutorial-card';
                card.style.textDecoration = 'none';

                const cardThumb = tut.thumbnailUrl || tut.coverImg;
                card.innerHTML = `
                    ${cardThumb ? `
                        <div class="tut-card-cover-wrap">
                            <img src="${cardThumb}" alt="${tut.titleAr}" class="tut-card-cover-img" loading="lazy">
                        </div>
                    ` : ''}
                    <div style="padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between; flex-grow: 1;">
                        <div>
                            <div class="tut-top-meta" style="margin-bottom: 0.6rem;">
                                <span class="tut-badge">${tut.categoryNameAr || 'درس'}</span>
                                <span class="tut-read-time"><i class="fa-regular fa-clock"></i> ${tut.readTime || '5 د'}</span>
                            </div>
                            <h3 class="tut-title" style="font-size: 1.15rem; font-weight: 800; margin-bottom: 0.5rem; color: var(--text-primary);">${tut.titleAr}</h3>
                            <p class="tut-summary" style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">${tut.summaryAr}</p>
                        </div>
                        <div class="tut-footer-action" style="display: flex; align-items: center; justify-content: space-between; color: var(--apple-blue); font-weight: 700; font-size: 0.85rem; padding-top: 0.65rem; border-top: 1px solid var(--border-subtle);">
                            <span>قراءة الدرس كاملاً بالفهرس</span>
                            <i class="fa-solid fa-arrow-left"></i>
                        </div>
                    </div>
                `;
                tutPreview.appendChild(card);
            });
        }

        if (storePreview) {
            const products = getSiteProducts().slice(0, 3);
            const rateObj = siteConfig.pricing.rates[currentCurrency] || { symbol: '$', rate: 1 };
            storePreview.innerHTML = '';
            products.forEach(p => {
                const priceLocal = Math.round(p.priceUsd * rateObj.rate);
                const waText = `أهلاً 👋\nأريد شراء وتحميل: ${p.titleAr} (${priceLocal} ${rateObj.symbol})`;
                const waLink = `https://wa.me/${siteConfig.profile.whatsapp || '201000000000'}?text=${encodeURIComponent(waText)}`;

                const card = document.createElement('div');
                card.className = 'product-card';
                card.innerHTML = `
                    <div>
                        ${p.badgeAr ? `<span class="prod-badge">${p.badgeAr}</span>` : ''}
                        <h3 class="prod-title">${p.titleAr}</h3>
                        <p class="prod-desc">${p.descAr}</p>
                        
                        <div class="prod-price-row">
                            <span class="prod-price-amount">${priceLocal}</span>
                            <span class="prod-price-currency">${rateObj.symbol}</span>
                        </div>

                        <ul class="prod-features-list">
                            ${p.features.slice(0, 3).map(f => `<li><i class="fa-solid fa-circle-check"></i> ${f}</li>`).join('')}
                        </ul>
                    </div>

                    <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="btn-buy-product">
                        <i class="fa-brands fa-whatsapp"></i> طلب وتحميل
                    </a>
                `;
                storePreview.appendChild(card);
            });
        }
    }

    // ------------------------------------------------------------------------
    // 4. Video Lightbox Player (Studio Experience matching Image 1)
    // ------------------------------------------------------------------------
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxBackdrop = document.getElementById('lightboxBackdrop');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxContentBox = document.getElementById('lightboxContentBox');
    const lightboxPlayerContainer = document.getElementById('lightboxPlayerContainer');
    const lightboxProjectTitle = document.getElementById('lightboxProjectTitle');
    const lightboxProjectSubtitle = document.getElementById('lightboxProjectSubtitle');
    const lightboxWaCta = document.getElementById('lightboxWaCta');

    function openLightbox(videoUrl, title, isVertical, proj) {
        if (!lightboxModal || !lightboxPlayerContainer) return;
        lightboxPlayerContainer.innerHTML = '';

        const isVert = isVertical !== undefined ? isVertical : (proj?.aspect === 'vertical');
        if (lightboxContentBox) {
            lightboxContentBox.classList.toggle('widescreen-mode', !isVert);
        }

        // Parse video source
        let cleanUrl = (videoUrl || '').trim();
        let isDirectVideo = false;

        if (cleanUrl.match(/\.(mp4|webm|ogg|mov)(\?.*)?$/i) || cleanUrl.startsWith('blob:') || cleanUrl.startsWith('data:video/')) {
            isDirectVideo = true;
        } else if (cleanUrl.includes('drive.google.com/file/d/')) {
            const match = cleanUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
            if (match && match[1]) {
                cleanUrl = `https://drive.google.com/file/d/${match[1]}/preview`;
            }
        } else if (cleanUrl.includes('youtube.com/watch?v=')) {
            const match = cleanUrl.match(/v=([a-zA-Z0-9_-]+)/);
            if (match && match[1]) {
                cleanUrl = `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0`;
            }
        } else if (cleanUrl.includes('youtu.be/')) {
            const match = cleanUrl.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
            if (match && match[1]) {
                cleanUrl = `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0`;
            }
        } else if (cleanUrl.includes('youtube.com/shorts/')) {
            const match = cleanUrl.match(/\/shorts\/([a-zA-Z0-9_-]+)/);
            if (match && match[1]) {
                cleanUrl = `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0`;
            }
        }

        if (isDirectVideo) {
            const videoEl = document.createElement('video');
            videoEl.src = cleanUrl;
            videoEl.controls = true;
            videoEl.autoplay = true;
            videoEl.playsInline = true;
            videoEl.className = `lightbox-video-frame ${!isVert ? 'widescreen-frame' : ''}`;
            lightboxPlayerContainer.appendChild(videoEl);
        } else {
            const iframe = document.createElement('iframe');
            iframe.src = cleanUrl;
            iframe.className = `lightbox-video-frame ${!isVert ? 'widescreen-frame' : ''}`;
            iframe.setAttribute('allow', 'autoplay; fullscreen; encrypted-media; picture-in-picture');
            iframe.setAttribute('allowfullscreen', 'true');
            iframe.title = title || 'Video Showcase';
            lightboxPlayerContainer.appendChild(iframe);
        }

        // Meta info
        if (lightboxProjectTitle) {
            lightboxProjectTitle.textContent = title || 'عمل استوديو مميز';
        }
        if (lightboxProjectSubtitle) {
            const sub = proj ? `${isVert ? 'ريلز رأسي 9:16' : 'فيديو عرضي 16:9'} • ${proj.software || 'DaVinci Resolve'} • ${proj.tag || 'مونتاج احترافي'}` : (isVert ? 'ريلز رأسي 9:16' : 'فيديو 16:9 4K');
            lightboxProjectSubtitle.textContent = sub;
        }

        // WhatsApp CTA
        if (lightboxWaCta) {
            const prof = siteConfig.profile || DEFAULT_CONFIG.profile;
            const hostName = (prof && prof.nameAr) ? prof.nameAr.split('|')[0].trim() : '';
            const greeting = hostName ? `مرحباً ${hostName}،` : 'مرحباً،';
            const waText = encodeURIComponent(`${greeting} أود الاستفسار وطلب تنفيذ مشروع فيديو مماثل لـ: "${title || 'أعمالك في الموقع'}"`);
            lightboxWaCta.href = `https://wa.me/${waNum}?text=${waText}`;
        }

        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (!lightboxModal) return;
        lightboxModal.classList.remove('active');
        if (lightboxPlayerContainer) lightboxPlayerContainer.innerHTML = '';
        document.body.style.overflow = '';
    }

    lightboxClose?.addEventListener('click', closeLightbox);
    lightboxBackdrop?.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });

    // ------------------------------------------------------------------------
    // 5. Studio Configurator & Multi-Currency Calculator
    // ------------------------------------------------------------------------
    const tabShorts = document.getElementById('tabCalcShorts');
    const tabLong = document.getElementById('tabCalcLong');
    const tabPodcast = document.getElementById('tabCalcPodcast');

    const optsShorts = document.getElementById('calcOptsShorts');
    const optsLong = document.getElementById('calcOptsLong');
    const optsPodcast = document.getElementById('calcOptsPodcast');

    const durationRange = document.getElementById('durationRange');
    const durationRangeVal = document.getElementById('durationRangeVal');
    const btnQtyDec = document.getElementById('btnQtyDec');
    const btnQtyInc = document.getElementById('btnQtyInc');
    const calcQtyInput = document.getElementById('calcQtyInput');

    const sumService = document.getElementById('sumService');
    const sumDuration = document.getElementById('sumDuration');
    const sumSingle = document.getElementById('sumSingle');
    const sumQty = document.getElementById('sumQty');
    const sumDelivery = document.getElementById('sumDelivery');
    const sumDiscount = document.getElementById('sumDiscount');
    const sumTotal = document.getElementById('sumTotal');
    const calcWhatsAppBtn = document.getElementById('calcWhatsAppBtn');

    function setCalcTab(tab) {
        calcState.tab = tab;
        [tabShorts, tabLong, tabPodcast].forEach(t => t?.classList.remove('active'));
        [optsShorts, optsLong, optsPodcast].forEach(o => {
            if (o) o.style.display = 'none';
        });

        if (tab === 'shorts') {
            tabShorts?.classList.add('active');
            if (optsShorts) optsShorts.style.display = 'block';
        } else if (tab === 'long') {
            tabLong?.classList.add('active');
            if (optsLong) optsLong.style.display = 'block';
        } else if (tab === 'podcast') {
            tabPodcast?.classList.add('active');
            if (optsPodcast) optsPodcast.style.display = 'block';
        }
        updateCalculator();
    }

    tabShorts?.addEventListener('click', () => setCalcTab('shorts'));
    tabLong?.addEventListener('click', () => setCalcTab('long'));
    tabPodcast?.addEventListener('click', () => setCalcTab('podcast'));

    // Duration Chips
    document.querySelectorAll('[data-calc-dur]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('[data-calc-dur]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            calcState.reelDuration = parseInt(btn.getAttribute('data-calc-dur'), 10);
            updateCalculator();
        });
    });

    // Motion Chips
    document.querySelectorAll('[data-calc-motion]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('[data-calc-motion]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            calcState.motionLevel = btn.getAttribute('data-calc-motion');
            updateCalculator();
        });
    });

    // Long Minutes Slider
    durationRange?.addEventListener('input', (e) => {
        calcState.longMinutes = parseInt(e.target.value, 10);
        if (durationRangeVal) durationRangeVal.textContent = `${calcState.longMinutes} دقيقة`;
        updateCalculator();
    });

    // Podcast Chips
    document.querySelectorAll('[data-calc-podcast]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('[data-calc-podcast]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            calcState.podcastMinutes = parseInt(btn.getAttribute('data-calc-podcast'), 10);
            updateCalculator();
        });
    });

    // Quantity controls
    btnQtyDec?.addEventListener('click', () => {
        if (calcState.quantity > 1) {
            calcState.quantity--;
            if (calcQtyInput) calcQtyInput.value = calcState.quantity;
            updateCalculator();
        }
    });

    btnQtyInc?.addEventListener('click', () => {
        calcState.quantity++;
        if (calcQtyInput) calcQtyInput.value = calcState.quantity;
        updateCalculator();
    });

    calcQtyInput?.addEventListener('change', (e) => {
        const val = parseInt(e.target.value, 10);
        calcState.quantity = isNaN(val) || val < 1 ? 1 : val;
        calcQtyInput.value = calcState.quantity;
        updateCalculator();
    });

    // Currency selector inside calculator
    document.querySelectorAll('.calc-curr-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.calc-curr-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCurrency = btn.getAttribute('data-curr');
            localStorage.setItem('site_currency', currentCurrency);
            updateCalculator();
            renderHomePreviews();
        });
    });

    function updateCalculator() {
        const pConf = siteConfig.pricing;
        const rateObj = pConf.rates[currentCurrency] || { symbol: '$', rate: 1 };
        const currRate = rateObj.rate;
        const currSymbol = rateObj.symbol;

        let singleUsd = 0;
        let serviceName = '';
        let durationDesc = '';
        let deliveryDays = 2;
        let discountPct = 0;

        if (calcState.tab === 'shorts') {
            serviceName = currentLang === 'ar' ? 'فيديو قصير (Reels / TikTok / Shorts)' : 'Short-form Video (Reels/Shorts)';
            if (calcState.reelDuration === 60) singleUsd = pConf.shorts.s60;
            else if (calcState.reelDuration === 90) singleUsd = pConf.shorts.s90;
            else if (calcState.reelDuration === 120) singleUsd = pConf.shorts.s120;
            else if (calcState.reelDuration === 180) singleUsd = pConf.shorts.s180;

            durationDesc = `${calcState.reelDuration} ${currentLang === 'ar' ? 'ثانية' : 'sec'}`;
            if (calcState.quantity >= 10) discountPct = pConf.discounts.shorts10 / 100;
            deliveryDays = Math.max(2, Math.ceil(calcState.quantity * 0.7));

        } else if (calcState.tab === 'long') {
            const isSimple = calcState.motionLevel === 'simple';
            serviceName = currentLang === 'ar' 
                ? `فيديو طويل (${isSimple ? 'موشن بسيط' : 'موشن مكثف وثائقي'})`
                : `Long-form Video (${isSimple ? 'Simple Motion' : 'Heavy Motion'})`;

            const basePrice = isSimple ? pConf.long.simpleBase : pConf.long.heavyBase;
            const extraPerMin = isSimple ? pConf.long.simpleExtraPerMin : pConf.long.heavyExtraPerMin;
            const baseMin = pConf.long.baseMinutes;
            const extraMin = Math.max(0, calcState.longMinutes - baseMin);

            singleUsd = basePrice + (extraMin * extraPerMin);
            durationDesc = `${calcState.longMinutes} ${currentLang === 'ar' ? 'دقيقة' : 'min'}`;
            if (calcState.quantity >= 4) discountPct = pConf.discounts.long4 / 100;
            deliveryDays = Math.max(3, Math.ceil(calcState.quantity * 1.5));

        } else if (calcState.tab === 'podcast') {
            serviceName = currentLang === 'ar' ? 'حلقة بودكاست / مقابلة متعددة الكاميرات' : 'Podcast / Multi-cam Interview';
            if (calcState.podcastMinutes === 60) singleUsd = pConf.podcast.h1;
            else if (calcState.podcastMinutes === 120) singleUsd = pConf.podcast.h2;
            else if (calcState.podcastMinutes === 180) singleUsd = pConf.podcast.h3;

            durationDesc = `${calcState.podcastMinutes / 60} ${currentLang === 'ar' ? 'ساعة' : 'hr(s)'}`;
            deliveryDays = Math.max(4, Math.ceil(calcState.quantity * 2));
        }

        const singleLocal = Math.round(singleUsd * currRate);
        const subtotal = singleLocal * calcState.quantity;
        const discountAmount = Math.round(subtotal * discountPct);
        const totalLocal = subtotal - discountAmount;

        const deliveryStr = `${deliveryDays} ${currentLang === 'ar' ? 'أيام عمل' : 'business days'}`;

        if (sumService) sumService.textContent = serviceName;
        if (sumDuration) sumDuration.textContent = durationDesc;
        if (sumSingle) sumSingle.textContent = `${singleLocal} ${currSymbol}`;
        if (sumQty) sumQty.textContent = `${calcState.quantity} ${currentLang === 'ar' ? 'فيديو' : 'video(s)'}`;
        if (sumDelivery) sumDelivery.textContent = deliveryStr;

        if (sumDiscount) {
            if (discountAmount > 0) {
                sumDiscount.parentElement.style.display = 'flex';
                sumDiscount.textContent = `-${discountAmount} ${currSymbol} (${discountPct * 100}%)`;
            } else {
                sumDiscount.parentElement.style.display = 'none';
            }
        }

        if (sumTotal) sumTotal.textContent = `${totalLocal} ${currSymbol}`;

        if (calcWhatsAppBtn) {
            const waNumber = siteConfig.profile.whatsapp || '201000000000';
            const waText = currentLang === 'ar'
                ? `أهلاً 👋\nأريد الاستفسار عن حجز باقة:\n• الخدمة: ${serviceName} (${calcState.quantity} فيديو - ${durationDesc})\n• التكلفة الإجمالية: ${totalLocal} ${currSymbol}${discountAmount > 0 ? ` (شامل خصم ${discountPct * 100}%)` : ''}\n• مدة التسليم: ${deliveryStr}\nجاهز لبدء العمل معك!`
                : `Hi 👋\nI'd like to book a project:\n• Service: ${serviceName} (${calcState.quantity} video(s) - ${durationDesc})\n• Total Cost: ${totalLocal} ${currSymbol}${discountAmount > 0 ? ` (${discountPct * 100}% OFF)` : ''}\n• Turnaround: ${deliveryStr}\nReady to get started!`;

            calcWhatsAppBtn.href = `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`;
        }
    }

    // ------------------------------------------------------------------------
    // 6. Reviews Submission
    // ------------------------------------------------------------------------
    const reviewForm = document.getElementById('clientReviewForm');
    const reviewsContainer = document.getElementById('publishedReviewsContainer');
    const starPicker = document.getElementById('starPicker');
    let selectedRating = 5;

    if (starPicker) {
        const starBtns = starPicker.querySelectorAll('.star-btn');
        starBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                selectedRating = parseInt(btn.getAttribute('data-rating'), 10);
                starBtns.forEach(b => {
                    const r = parseInt(b.getAttribute('data-rating'), 10);
                    b.classList.toggle('active', r <= selectedRating);
                });
            });
        });
    }

    function renderReviews() {
        if (!reviewsContainer) return;
        const reviews = getSiteReviews();

        if (reviews.length === 0) {
            reviewsContainer.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: var(--text-muted);">
                    <i class="fa-regular fa-comment-dots" style="font-size: 2rem; opacity: 0.5; margin-bottom: 0.6rem;"></i>
                    <p>كن أول من يترك تقييماً لتجربة العمل معنا!</p>
                </div>
            `;
            return;
        }

        reviewsContainer.innerHTML = '';
        reviews.forEach(rev => {
            const stars = '★'.repeat(rev.rating) + '☆'.repeat(Math.max(0, 5 - rev.rating));
            const card = document.createElement('div');
            card.style.cssText = 'background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1rem;';
            card.innerHTML = `
                <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
                    <span style="color: var(--accent-gold); font-size:1.1rem;">${stars}</span>
                    <span style="color: var(--text-muted); font-size:0.75rem;">${rev.date || 'حديثاً'}</span>
                </div>
                <p style="color: var(--text-primary); font-size: 0.95rem; margin-bottom: 0.8rem;">"${rev.comment}"</p>
                <div style="display:flex; align-items:center; gap:0.6rem;">
                    <div style="width:32px; height:32px; border-radius:50%; background: var(--apple-blue); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:0.85rem;">
                        ${(rev.name || 'ع').charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <strong style="display:block; font-size:0.9rem; color:var(--text-primary);">${rev.name}</strong>
                        ${rev.role ? `<span style="font-size:0.75rem; color:var(--text-muted);">${rev.role}</span>` : ''}
                    </div>
                </div>
            `;
            reviewsContainer.appendChild(card);
        });
    }

    if (reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('reviewName')?.value.trim();
            const role = document.getElementById('reviewRole')?.value.trim();
            const comment = document.getElementById('reviewComment')?.value.trim();

            if (!name || !comment) return;

            const now = new Date();
            const newRev = {
                id: 'rev_' + Date.now(),
                name: name,
                role: role,
                rating: selectedRating,
                comment: comment,
                date: now.toLocaleDateString(currentLang === 'ar' ? 'ar-EG' : 'en-US')
            };

            const reviews = getSiteReviews();
            reviews.unshift(newRev);
            saveSiteReviews(reviews);

            reviewForm.reset();
            const feedback = document.getElementById('reviewFeedback');
            if (feedback) {
                feedback.textContent = 'تم إرسال تقييمك بنجاح! شكراً لثقتك الغالية.';
                feedback.style.color = 'var(--accent-emerald)';
            }
            renderReviews();
        });
    }

    // ------------------------------------------------------------------------
    // 7. FAQ Accordion
    // ------------------------------------------------------------------------
    document.querySelectorAll('.faq-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const item = trigger.closest('.faq-item');
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    // ------------------------------------------------------------------------
    // 8. Lightweight Cosmic Particles Engine (60-120 FPS, Smooth & Non-blocking)
    // ------------------------------------------------------------------------
    function initLightweightParticles() {
        if (siteConfig.branding && siteConfig.branding.showParticles === false) return;
        const canvas = document.getElementById('particlesCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const particles = [];
        const count = Math.min(32, Math.floor(width / 45));

        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.45,
                vy: (Math.random() - 0.5) * 0.45,
                radius: Math.random() * 1.8 + 0.8,
                alpha: Math.random() * 0.5 + 0.2
            });
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 113, 227, ${p.alpha})`;
                ctx.fill();

                // Connect adjacent particles
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 110) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(0, 113, 227, ${0.15 * (1 - dist / 110)})`;
                        ctx.lineWidth = 0.7;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animate);
        }
        animate();
    }

    // ------------------------------------------------------------------------
    // 9. Initial Load
    // ------------------------------------------------------------------------
    applyTheme(currentTheme);
    applyLanguage(currentLang);
    renderProjects();
    renderHomePreviews();
    renderReviews();
    initLightweightParticles();
});
