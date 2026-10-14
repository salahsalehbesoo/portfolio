/**
 * ============================================================================
 * Pro Portfolio - Core Configuration & Central Data Store (Upgraded 2026)
 * ============================================================================
 * Handles settings, projects, tutorials/articles with Table of Contents & Covers,
 * digital store products, dynamic menu navigation with dropdowns,
 * Logo & Profile ID Card customization, and Master Licensing protection.
 */

const STORAGE_KEYS = {
    CONFIG: 'pro_portfolio_config',
    PROJECTS: 'pro_portfolio_projects',
    TUTORIALS: 'pro_portfolio_tutorials',
    PRODUCTS: 'pro_portfolio_products',
    ANALYTICS: 'pro_portfolio_analytics',
    REVIEWS: 'pro_portfolio_reviews',
    VISITOR_ID: 'pro_portfolio_vid',
    THEME: 'site_theme',
    LANG: 'site_lang',
    CURRENCY: 'site_currency',
    MASTER_AUTH: 'pro_portfolio_master_auth'
};

const DEFAULT_CONFIG = {
    profile: {
        logoText: "CREATIVE",
        logoBadge: "PORTFOLIO",
        logoImgUrl: "",
        faviconUrl: "img/favicon.svg",
        avatarUrl: "img/default-avatar.svg",
        coverUrl: "img/default-cover.svg",
        nameAr: "صانع ومحرر فيديو سينمائي",
        nameEn: "Creative Video Editor & Motion Designer",
        roleAr: "مونتير فيديو ومصمم موشن جرافيكس سينمائي",
        roleEn: "High-Retention Video Editor & Motion Designer",
        bioAr: "صناعة محتوى سينمائي عالي الجودة ومونتاج احترافي مخصص لصناع المحتوى والبراندات لتحويل المشاهدات إلى تفاعل حقيقي.",
        bioEn: "Crafting high-retention cinematic edits and kinetic visuals that captivate audiences and scale engagement.",
        whatsapp: "201000000000",
        email: "info@example.com",
        expYears: 3,
        workStatus: "online", // "online" | "busy" | "offline"
        availabilityText: "متاح الآن لمشاريع جديدة",
        availabilityTextEn: "Available now for new projects",
        statusTextAr: "متاح الآن لمشاريع جديدة",
        statusTextEn: "Available for new projects",
        features: [
            "DaVinci Resolve & After Effects",
            "تصدير مناسب لكل المنصات",
            "إيقاع ممتع وسريع"
        ],
        featuresEn: [
            "DaVinci Resolve & After Effects",
            "Platform-Optimized Deliverables",
            "High Retention & Cinematic Pacing"
        ]
    },
    navItems: [
        { id: "nav-home", labelAr: "الرئيسية", labelEn: "Home", url: "index.html#bento", hidden: false },
        { id: "nav-works", labelAr: "الأعمال", labelEn: "Work", url: "index.html#portfolio", hidden: false },
        { id: "nav-tutorials", labelAr: "الدروس والمقالات", labelEn: "Tutorials", url: "tutorials.html", hidden: false },
        { id: "nav-store", labelAr: "متجر القوالب", labelEn: "Store", url: "store.html", hidden: false },
        { id: "nav-calc", labelAr: "حاسبة الأسعار", labelEn: "Pricing", url: "index.html#calculator", hidden: false },
        { 
            id: "nav-more", 
            labelAr: "المزيد ▾", 
            labelEn: "More ▾", 
            url: "#", 
            hidden: false,
            dropdown: [
                { labelAr: "آراء العملاء", labelEn: "Reviews", url: "index.html#reviews", hidden: false },
                { labelAr: "الأسئلة الشائعة", labelEn: "FAQ", url: "index.html#faq", hidden: false }
            ] 
        }
    ],
    branding: {
        accentColor: "#0071e3",
        theme: "dark",
        defaultLang: "ar", // Default site language for first-time visitors
        showParticles: true, // Lightweight 60-120 FPS particles
        showEntrance: false,
        fontFamily: "Cairo",
        faviconUrl: "img/favicon.svg",
        footerRightsAr: "جميع الحقوق محفوظة © 2026",
        footerRightsEn: "All rights reserved © 2026",
        footerDevAr: "تصميم وبرمجة خاصة بأعلى معايير السرعة والأمان.",
        footerDevEn: "Crafted with peak performance and security."
    },
    metrics: {
        projectsCount: "+180",
        totalViews: "+65M",
        clientRating: "5.0",
        satisfactionRate: "99%"
    },
    pricing: {
        currency: "USD",
        rates: {
            USD: { symbol: "$", rate: 1, nameAr: "دولار أمريكي", nameEn: "USD" },
            SAR: { symbol: "ر.س", rate: 3.75, nameAr: "ريال سعودي", nameEn: "SAR" },
            AED: { symbol: "د.إ", rate: 3.67, nameAr: "درهم إماراتي", nameEn: "AED" },
            EGP: { symbol: "ج.م", rate: 49.5, nameAr: "جنيه مصري", nameEn: "EGP" }
        },
        shorts: {
            s60: 35,
            s90: 45,
            s120: 55,
            s180: 75
        },
        long: {
            simpleBase: 60,
            simpleExtraPerMin: 5,
            heavyBase: 80,
            heavyExtraPerMin: 8,
            baseMinutes: 8
        },
        podcast: {
            h1: 60,
            h2: 115,
            h3: 165
        },
        discounts: {
            shorts10: 15,
            long4: 20
        }
    },
    sections: {
        store: true,
        tutorials: true,
        calculator: true,
        reviews: true,
        faq: true
    },
    store: {
        enabled: true
    },
    security: {
        adminEmail: "admin@example.com",
        pinCode: "123456",
        recoveryPhone: "201000000000",
        authorizedDomains: ["localhost", "127.0.0.1"],
        licenseKey: "",
        clientEmail: "",
        allowFooterRemoval: true,
        licenseType: "whitelabel"
    }
};

const DEFAULT_PROJECTS = [
    {
        id: "proj-1",
        titleAr: "ريل وثائقي وطني وسينمائي",
        titleEn: "National Documentary Cinema Reel",
        category: "shorts",
        aspect: "vertical",
        software: "DaVinci Resolve • After Effects",
        tag: "وثائقي سينمائي",
        views: "1.2M",
        retention: "78%",
        videoUrl: "https://drive.google.com/file/d/1abTTgBIORvaDfRIBsWIeiONcAbdEjVvU/preview",
        thumbnailUrl: "https://lh3.googleusercontent.com/d/1abTTgBIORvaDfRIBsWIeiONcAbdEjVvU=w800",
        descAr: "مونتاج بأسلوب سينمائي يركز على الـ Storytelling العميق، تدريج وتصحيح ألوان سينمائي وهندسة صوتية متكاملة.",
        descEn: "Documentary style with deep storytelling, cinematic color grading, and dynamic multi-layered sound design."
    },
    {
        id: "proj-2",
        titleAr: "ريل سياحي ترويجي فاخر (TURK)",
        titleEn: "Luxury Promo Travel Reel",
        category: "shorts",
        aspect: "vertical",
        software: "DaVinci Resolve Studio",
        tag: "سياحي ترويجي",
        views: "850K",
        retention: "82%",
        videoUrl: "https://drive.google.com/file/d/1zAgcpHCUyU4gQIAfjAw1KQyUKRedcbC7/preview",
        thumbnailUrl: "https://lh3.googleusercontent.com/d/1zAgcpHCUyU4gQIAfjAw1KQyUKRedcbC7=w800",
        descAr: "إيقاع سريع وتناغم بصري وصوتي فائق مع ترانزيشنز إبداعية تنقل المشاهد لقلب التجربة.",
        descEn: "High-paced visual rhythm with seamless creative transitions and atmospheric soundscape."
    },
    {
        id: "proj-3",
        titleAr: "ريل إعلاني لمنتج عالي الفخامة (PALACE)",
        titleEn: "Luxury Commercial Showcase",
        category: "shorts",
        aspect: "vertical",
        software: "After Effects • Premiere Pro",
        tag: "إعلاني فخم",
        views: "640K",
        retention: "75%",
        videoUrl: "https://drive.google.com/file/d/1tN5RGI6K8KVLIIoiQA7GgPp6ftGEXsXc/preview",
        thumbnailUrl: "https://lh3.googleusercontent.com/d/1tN5RGI6K8KVLIIoiQA7GgPp6ftGEXsXc=w800",
        descAr: "إبراز التفاصيل الفاخرة، نصوص متحركة مضيئة، وتصميم صوتي نقي يعزز رغبة الشراء.",
        descEn: "Elevating product details with elegant typography, smooth tracking, and premium sound effects."
    },
    {
        id: "proj-4",
        titleAr: "ريل محتوى تعليمي تفاعلي سريع (1111)",
        titleEn: "High-Retention Talking Head Reel",
        category: "shorts",
        aspect: "vertical",
        software: "DaVinci Resolve • After Effects",
        tag: "سوشيال ميديا",
        views: "2.1M",
        retention: "88%",
        videoUrl: "https://drive.google.com/file/d/1xiRSXg5tacDN85-RfkT9bUdwAv-ftx8v/preview",
        thumbnailUrl: "https://lh3.googleusercontent.com/d/1xiRSXg5tacDN85-RfkT9bUdwAv-ftx8v=w800",
        descAr: "أسلوب Alex Hormozi و Iman Gadzhi مع كابشنز ديناميكية ورسوم توضيحية ومؤثرات جذابة تبقي المشاهد مسمراً.",
        descEn: "Modern talking head style with engaging kinetic typography, animated b-rolls, and retention hooks."
    },
    {
        id: "proj-5",
        titleAr: "مونتاج سينمائي تجاري عريض 16:9",
        titleEn: "Commercial Cinematic Widescreen Edit",
        category: "long",
        aspect: "widescreen",
        software: "DaVinci Resolve Studio",
        tag: "إعلاني 16:9",
        views: "420K",
        retention: "69%",
        videoUrl: "https://drive.google.com/file/d/1eCGLcdz-rgdkmJ-74u2Zyvlaw-J_8uUg/preview",
        thumbnailUrl: "https://lh3.googleusercontent.com/d/1eCGLcdz-rgdkmJ-74u2Zyvlaw-J_8uUg=w800",
        descAr: "إنتاج سينمائي عالي الدقة لشاشات التلفزيون واليوتيوب بدقة ألوان استثنائية وهندسة صوتية محيطية.",
        descEn: "Widescreen commercial production crafted with pristine color science and immersive mixing."
    },
    {
        id: "proj-6",
        titleAr: "تلوين وتصحيح سينمائي متقدم (Color Grading)",
        titleEn: "Cinematic Color Grading Showcase",
        category: "long",
        aspect: "widescreen",
        software: "DaVinci Resolve Studio",
        tag: "تصحيح ألوان",
        views: "310K",
        retention: "74%",
        videoUrl: "https://drive.google.com/file/d/1ZJdvlJUSj85OCoCH1gcPFEFuj6dNsCuO/preview",
        thumbnailUrl: "https://lh3.googleusercontent.com/d/1ZJdvlJUSj85OCoCH1gcPFEFuj6dNsCuO=w800",
        descAr: "تحويل لقطات الـ Log المسطحة إلى مظهر سينمائي غني وتدرج لوني يعكس الحالة الدرامية للمشهد.",
        descEn: "Transforming flat log profiles into rich, cinematic color tones tailored to the mood of the narrative."
    }
];

// Rich Tutorials with Thumbnails, Header Covers, Table of Contents, and Embedded Images
const DEFAULT_TUTORIALS = [
    {
        id: "tut-1",
        titleAr: "أسرار مونتاج الـ High Retention: كيف تجعل المشاهد يكمل الفيديو للنهاية؟",
        titleEn: "High-Retention Editing Secrets: Hooking Viewers to the Last Second",
        category: "retention",
        categoryNameAr: "استراتيجيات تفاعل",
        thumbnailUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80",
        coverImg: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80",
        readTime: "5 دقائق قراءة",
        date: "2026-10-10",
        views: 1420,
        summaryAr: "دليل عملي لكيفية بناء الـ Visual Pacing وتغيير المشاهد كل 2-3 ثوانٍ مع اختيار المؤثر الصوتي الأنسب بدون تشتيت المشاهد.",
        toc: [
            { id: "sec-hook", title: "قاعدة أول 3 ثوانٍ (The Visual Hook)" },
            { id: "sec-pacing", title: "تناسق الـ Pacing البصري مع نبض الموسيقى" },
            { id: "sec-sound", title: "هندسة الصوت (Sound Design) نصف جودة الفيديو" },
            { id: "sec-summary", title: "الخلاصة والتطبيق العملي" }
        ],
        contentAr: `
            <div id="sec-hook">
                <h3 style="font-size:1.35rem; font-weight:800; color:var(--text-primary); margin:1.5rem 0 0.8rem 0;">1. قاعدة أول 3 ثوانٍ (The Visual Hook)</h3>
                <p>لا تبدأ الفيديو بمقدمة طويلة أو ترحيب تقليدي. ابدأ فوراً بنتيجة الحدث، أو بسؤال صادم، أو بلقطة ديناميكية مع مؤثر صوتي حاد (Whoosh + Impact) لجذب انتباه الإبهام ومنعه من التمرير.</p>
                <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80" alt="Visual Hook" style="width:100%; border-radius:14px; margin:1rem 0; border:1px solid var(--border-subtle);">
            </div>
            
            <div id="sec-pacing">
                <h3 style="font-size:1.35rem; font-weight:800; color:var(--text-primary); margin:1.5rem 0 0.8rem 0;">2. تناسق الـ Pacing البصري مع نبض الموسيقى</h3>
                <p>التقطيع العشوائي يربك العين؛ استخدم الـ Beat Drop لتغيير زوايا الكاميرا، وضع الـ B-Rolls عند كل فكرة جديدة لتوضيح المعنى بصرياً بدلاً من الاكتفاء بالحديث.</p>
            </div>
            
            <div id="sec-sound">
                <h3 style="font-size:1.35rem; font-weight:800; color:var(--text-primary); margin:1.5rem 0 0.8rem 0;">3. هندسة الصوت (Sound Design) نصف جودة الفيديو</h3>
                <p>الساوند ديزاين هو ما يعطي الحياة لكل حركة: أصوات النقرات (Mouse clicks)، حركة الورق (Paper tear)، والتأثيرات المحيطية (Riser) قبل كل نقطة رئيسية.</p>
            </div>

            <div id="sec-summary">
                <h3 style="font-size:1.35rem; font-weight:800; color:var(--text-primary); margin:1.5rem 0 0.8rem 0;">4. الخلاصة والتطبيق العملي</h3>
                <p>احرص دائماً على اختبار الفيديوهات بحذف الصوت أولاً؛ إذا كان الفيديو مشوقاً بدون صوت، فهو جاهز لاكتساح خوارزميات ريلز وتيك توك.</p>
            </div>
        `
    },
    {
        id: "tut-2",
        titleAr: "الدليل الشامل لتصحيح الألوان (Color Grading) في DaVinci Resolve",
        titleEn: "Complete Cinematic Color Grading Guide in DaVinci Resolve",
        category: "color",
        categoryNameAr: "تلوين سينمائي",
        thumbnailUrl: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=800&q=80",
        coverImg: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80",
        readTime: "7 دقائق قراءة",
        date: "2026-10-08",
        views: 980,
        summaryAr: "شرح هيكل الـ Nodes الاحترافي، كيفية تحويل الـ Log إلى Rec.709، وضبط الـ Skin Tones بدقة ميكروسكوبية.",
        toc: [
            { id: "sec-nodetree", title: "هيكلية الـ Node Tree الاحترافية" },
            { id: "sec-cst", title: "استخدام Color Space Transform (CST)" },
            { id: "sec-skintone", title: "ضبط لون البشرة (Skin Tones Vector)" }
        ],
        contentAr: `
            <div id="sec-nodetree">
                <h3 style="font-size:1.35rem; font-weight:800; color:var(--text-primary); margin:1.5rem 0 0.8rem 0;">1. هيكلية الـ Node Tree الاحترافية</h3>
                <p>افصل دائماً بين مرحلة التصحيح الأولي (Color Correction) ومرحلة التدرج الإبداعي (Color Grading). ابدأ بـ Exposure، ثم Contrast، ثم Balance، ثم Skin Tones في عقدة منفصلة.</p>
            </div>
            
            <div id="sec-cst">
                <h3 style="font-size:1.35rem; font-weight:800; color:var(--text-primary); margin:1.5rem 0 0.8rem 0;">2. استخدام Color Space Transform (CST)</h3>
                <p>تجنب استخدام LUTs تحويلية عشوائية؛ استخدم دائماً أداة CST المدمجة في دافينشي لتحويل كود الكاميرا (Sony S-Log3 أو Canon C-Log) إلى Rec.709 للحفاظ على كامل النطاق الديناميكي للضوء.</p>
            </div>

            <div id="sec-skintone">
                <h3 style="font-size:1.35rem; font-weight:800; color:var(--text-primary); margin:1.5rem 0 0.8rem 0;">3. ضبط لون البشرة (Skin Tones Vector)</h3>
                <p>استخدم الـ Vectorscope وتأكد من أن لون البشرة يقع بدقة على خط الـ Skin Tone Line بغض النظر عن عرق الشخص أو الإضاءة المحيطة.</p>
            </div>
        `
    }
];

// Digital Products & Templates (متجر القوالب)
const DEFAULT_PRODUCTS = [
    {
        id: "prod-1",
        titleAr: "حزمة الـ LUTs السينمائية الشاملة (Cinematic LUTs Master Pack)",
        titleEn: "Cinematic LUTs Master Pack (30+ Creative Looks)",
        category: "luts",
        priceUsd: 29,
        badgeAr: "الأكثر مبيعاً 🔥",
        badgeEn: "Best Seller",
        descAr: "أكثر من 30 بريسيت وتدرج لوني سينمائي جاهز لـ DaVinci Resolve و Premiere Pro متوافقة مع جميع أنواع الكاميرات والهواتف.",
        features: [
            "30+ ملف .cube احترافي عالي الدقة",
            "متوافق مع Sony, Canon, iPhone Log & Rec.709",
            "فيديو شرح التركيب والتطبيق في 30 ثانية",
            "تحديثات مجانية مدى الحياة"
        ]
    },
    {
        id: "prod-2",
        titleAr: "مكتبة المؤثرات الصوتية لصناع المحتوى (High-Impact SFX Library)",
        titleEn: "Ultimate Creators SFX Library (500+ HQ Audio)",
        category: "sfx",
        priceUsd: 19,
        badgeAr: "مكتبة حصرية ✨",
        badgeEn: "Essential",
        descAr: "أكثر من 500 صوت نقي ومعدل مسبقاً (Whooshes, Risers, Pops, Hits, Glitches) مخصصة لمونتاج الريلز واليوتيوب.",
        features: [
            "500+ ملف صوتي بصيغة WAV نقية 24-bit",
            "منظمة في مجلدات سهلة البحث والاستخدام",
            "مرخصة للاستخدام التجاري على يوتيوب وسوشيال ميديا",
            "سحب وإفلات فوري داخل مشروعك"
        ]
    },
    {
        id: "prod-3",
        titleAr: "قالب نصوص وكابشنز متحركة لـ After Effects & Premiere Pro",
        titleEn: "Kinetic Viral Captions MOGRT Pack",
        category: "mogrts",
        priceUsd: 25,
        badgeAr: "جديد ⚡",
        badgeEn: "New Release",
        descAr: "حزمة نصوص متحركة بأسلوب هورموزي وإيمان جادجي (MOGRTs) تدعم اللغة العربية والإنجليزية وتتحرك بنقرة زر.",
        features: [
            "25 ستايل كابشنز فيروسي عالي التفاعل",
            "دعم كامل وتلقائي للخطوط العربية",
            "تغيير الألوان وموضع الكلمات بسهولة",
            "خفيفة وسريعة الرندر بدون أي بطء"
        ]
    }
];

// ----------------------------------------------------------------------------
// Data Access & Synchronization Functions
// ----------------------------------------------------------------------------

function getSiteConfig() {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.CONFIG);
        if (stored) {
            let parsed = JSON.parse(stored);
            // Auto-clean legacy hardcoded prostudio & old test data
            if (parsed && parsed.profile) {
                if (parsed.profile.whatsapp === '201096419945') parsed.profile.whatsapp = DEFAULT_CONFIG.profile.whatsapp;
                if (parsed.profile.email === 'contact@prostudio.com') parsed.profile.email = DEFAULT_CONFIG.profile.email;
                if (parsed.profile.logoText === 'PRO' && parsed.profile.logoBadge === 'STUDIO') {
                    parsed.profile.logoText = DEFAULT_CONFIG.profile.logoText;
                    parsed.profile.logoBadge = DEFAULT_CONFIG.profile.logoBadge;
                }
                if (parsed.profile.nameAr && parsed.profile.nameAr.includes('PRO STUDIO')) {
                    parsed.profile.nameAr = DEFAULT_CONFIG.profile.nameAr;
                }
                if (parsed.profile.nameEn && parsed.profile.nameEn.includes('PRO STUDIO')) {
                    parsed.profile.nameEn = DEFAULT_CONFIG.profile.nameEn;
                }
            }
            if (parsed && parsed.security) {
                if (parsed.security.adminEmail === 'admin@prostudio.com') parsed.security.adminEmail = DEFAULT_CONFIG.security.adminEmail;
                if (parsed.security.recoveryPhone === '201096419945') parsed.security.recoveryPhone = DEFAULT_CONFIG.security.recoveryPhone;
            }
            return deepMerge(DEFAULT_CONFIG, parsed);
        }
    } catch (e) {
        console.error("Error reading site config:", e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_CONFIG));
}

function saveSiteConfig(newConfig) {
    try {
        localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(newConfig));
        applyBranding(newConfig.branding);
        return true;
    } catch (e) {
        console.error("Error saving site config:", e);
        return false;
    }
}

function getSiteProjects() {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.PROJECTS);
        if (stored !== null) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed)) return parsed;
        }
    } catch (e) {
        console.error("Error reading projects:", e);
    }
    saveSiteProjects(DEFAULT_PROJECTS);
    return JSON.parse(JSON.stringify(DEFAULT_PROJECTS));
}

function saveSiteProjects(projects) {
    try {
        localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
        return true;
    } catch (e) {
        console.error("Error saving projects:", e);
        return false;
    }
}

function getSiteTutorials() {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.TUTORIALS);
        if (stored !== null) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed)) return parsed;
        }
    } catch (e) {
        console.error("Error reading tutorials:", e);
    }
    saveSiteTutorials(DEFAULT_TUTORIALS);
    return JSON.parse(JSON.stringify(DEFAULT_TUTORIALS));
}

function saveSiteTutorials(tutorials) {
    try {
        localStorage.setItem(STORAGE_KEYS.TUTORIALS, JSON.stringify(tutorials));
        return true;
    } catch (e) {
        console.error("Error saving tutorials:", e);
        return false;
    }
}

function getSiteProducts() {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
        if (stored !== null) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed)) return parsed;
        }
    } catch (e) {
        console.error("Error reading products:", e);
    }
    saveSiteProducts(DEFAULT_PRODUCTS);
    return JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
}

function saveSiteProducts(products) {
    try {
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
        return true;
    } catch (e) {
        console.error("Error saving products:", e);
        return false;
    }
}

function getSiteReviews() {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.REVIEWS);
        if (stored) return JSON.parse(stored);
    } catch (e) {
        console.error("Error reading reviews:", e);
    }
    return [];
}

function saveSiteReviews(reviews) {
    try {
        localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
        return true;
    } catch (e) {
        console.error("Error saving reviews:", e);
        return false;
    }
}

function applyFavicon(faviconUrl) {
    if (!faviconUrl) return;
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
    }
    link.href = faviconUrl;
}

function applyBranding(branding) {
    if (!branding) return;
    const root = document.documentElement;
    if (branding.accentColor) {
        root.style.setProperty('--apple-blue', branding.accentColor);
        root.style.setProperty('--accent-glow', branding.accentColor + '30');
    }
    const config = getSiteConfig();
    const fav = (config.profile && config.profile.faviconUrl) || (branding && branding.faviconUrl);
    if (fav) applyFavicon(fav);
}

function deepMerge(target, source) {
    const output = Object.assign({}, target);
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[key])) {
                if (!(key in target)) Object.assign(output, { [key]: source[key] });
                else output[key] = deepMerge(target[key], source[key]);
            } else {
                Object.assign(output, { [key]: source[key] });
            }
        });
    }
    return output;
}

function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

// ----------------------------------------------------------------------------
// ============================================================================\n// Core Navigation & Section Engine\n// ============================================================================\n// Reusable Dynamic Navbar Generator (Supports Dropdowns & Store Switch)
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Section Visibility & State Guard (Controls all site sections with 1-click 👁️)
// ----------------------------------------------------------------------------
function applySectionVisibility() {
    const config = getSiteConfig();
    const sec = config.sections || {};
    const isStoreEnabled = (sec.store !== false && (config.store ? config.store.enabled !== false : true));
    const isTutEnabled = sec.tutorials !== false;
    const isCalcEnabled = sec.calculator !== false;
    const isRevEnabled = sec.reviews !== false;
    const isFaqEnabled = sec.faq !== false;

    // Elements on index.html
    const storeSec = document.getElementById('homeStoreSection');
    if (storeSec) storeSec.style.display = isStoreEnabled ? '' : 'none';

    const tutSec = document.getElementById('homeTutorialsSection');
    if (tutSec) tutSec.style.display = isTutEnabled ? '' : 'none';

    const calcSec = document.getElementById('calculator');
    if (calcSec) calcSec.style.display = isCalcEnabled ? '' : 'none';

    const heroCalcBtn = document.getElementById('heroCalcBtn');
    if (heroCalcBtn) heroCalcBtn.style.display = isCalcEnabled ? '' : 'none';

    const revSec = document.getElementById('reviews');
    if (revSec) revSec.style.display = isRevEnabled ? '' : 'none';

    const faqSec = document.getElementById('faq');
    if (faqSec) faqSec.style.display = isFaqEnabled ? '' : 'none';

    // On store.html page itself:
    if (window.location.pathname.includes('store.html')) {
        const storeDisabledNotice = document.getElementById('storeDisabledNotice');
        const storeMainGrid = document.querySelector('.products-grid') || document.getElementById('storeGrid');
        const storePageHeader = document.querySelector('.store-header');
        if (!isStoreEnabled) {
            if (!storeDisabledNotice) {
                const notice = document.createElement('div');
                notice.id = 'storeDisabledNotice';
                notice.style.cssText = 'background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); border-radius: 20px; padding: 3rem 1.5rem; text-align: center; max-width: 580px; margin: 4rem auto; font-family: Cairo, sans-serif;';
                notice.innerHTML = `
                    <div style="width:70px; height:70px; border-radius:50%; background:rgba(239,68,68,0.15); color:#ef4444; display:flex; align-items:center; justify-content:center; font-size:2rem; margin:0 auto 1.25rem auto;">
                        <i class="fa-solid fa-store-slash"></i>
                    </div>
                    <h2 style="color:#fff; font-size:1.5rem; font-weight:800; margin-bottom:0.5rem;">متجر القوالب مغلق حالياً</h2>
                    <p style="color:#9ca3af; font-size:0.95rem; line-height:1.6; margin-bottom:1.5rem;">المتجر مخفي ومغلق حالياً للتحديثات الدورية وإضافة قوالب وحزم جديدة. يمكنك تصفح معرض أعمالنا أو التواصل معنا عبر واتساب.</p>
                    <a href="index.html" style="background:#0071e3; color:#fff; text-decoration:none; padding:0.85rem 2rem; border-radius:9999px; font-weight:800; display:inline-block;">العودة إلى الصفحة الرئيسية</a>
                `;
                if (storeMainGrid) storeMainGrid.style.display = 'none';
                if (storePageHeader) storePageHeader.style.display = 'none';
                const cont = document.querySelector('.container') || document.body;
                cont.prepend(notice);
            }
        } else if (storeDisabledNotice) {
            storeDisabledNotice.remove();
            if (storeMainGrid) storeMainGrid.style.display = '';
            if (storePageHeader) storePageHeader.style.display = '';
        }
    }

    // On tutorials.html page itself:
    if (window.location.pathname.includes('tutorials.html')) {
        const tutDisabledNotice = document.getElementById('tutDisabledNotice');
        const tutMainGrid = document.getElementById('tutorialsGrid');
        const tutPageHeader = document.querySelector('.tutorials-header');
        if (!isTutEnabled) {
            if (!tutDisabledNotice) {
                const notice = document.createElement('div');
                notice.id = 'tutDisabledNotice';
                notice.style.cssText = 'background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); border-radius: 20px; padding: 3rem 1.5rem; text-align: center; max-width: 580px; margin: 4rem auto; font-family: Cairo, sans-serif;';
                notice.innerHTML = `
                    <div style="width:70px; height:70px; border-radius:50%; background:rgba(239,68,68,0.15); color:#ef4444; display:flex; align-items:center; justify-content:center; font-size:2rem; margin:0 auto 1.25rem auto;">
                        <i class="fa-solid fa-book-bookmark"></i>
                    </div>
                    <h2 style="color:#fff; font-size:1.5rem; font-weight:800; margin-bottom:0.5rem;">قسم المقالات والدروس مغلق حالياً</h2>
                    <p style="color:#9ca3af; font-size:0.95rem; line-height:1.6; margin-bottom:1.5rem;">هذا القسم غير متاح للعرض في الوقت الحالي. تصفح معرض الأعمال أو تواصل معنا مباشرة.</p>
                    <a href="index.html" style="background:#0071e3; color:#fff; text-decoration:none; padding:0.85rem 2rem; border-radius:9999px; font-weight:800; display:inline-block;">العودة إلى الصفحة الرئيسية</a>
                `;
                if (tutMainGrid) tutMainGrid.style.display = 'none';
                if (tutPageHeader) tutPageHeader.style.display = 'none';
                const cont = document.querySelector('.container') || document.body;
                cont.prepend(notice);
            }
        } else if (tutDisabledNotice) {
            tutDisabledNotice.remove();
            if (tutMainGrid) tutMainGrid.style.display = '';
            if (tutPageHeader) tutPageHeader.style.display = '';
        }
    }
}

// ----------------------------------------------------------------------------\n\n// ============================================================================\n// [PROTECTED] Anti-Theft Guard & Cryptographic Verification Engine (C) 2026\n// ============================================================================\nconst a0_0x582967=a0_0x5e62;function a0_0x5e62(_0xb9711f,_0x4d5e8f){_0xb9711f=_0xb9711f-0x173;const _0x54f2fc=a0_0x54f2();let _0x5e622b=_0x54f2fc[_0xb9711f];if(a0_0x5e62['hFCTXH']===undefined){var _0x34de36=function(_0x28a29d){const _0x9bb99b='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x4beacd='',_0x2b155b='';for(let _0x4fcef3=0x0,_0x303aa7,_0x43c973,_0x2ec261=0x0;_0x43c973=_0x28a29d['charAt'](_0x2ec261++);~_0x43c973&&(_0x303aa7=_0x4fcef3%0x4?_0x303aa7*0x40+_0x43c973:_0x43c973,_0x4fcef3++%0x4)?_0x4beacd+=String['fromCharCode'](0xff&_0x303aa7>>(-0x2*_0x4fcef3&0x6)):0x0){_0x43c973=_0x9bb99b['indexOf'](_0x43c973);}for(let _0x337ae2=0x0,_0xf2e542=_0x4beacd['length'];_0x337ae2<_0xf2e542;_0x337ae2++){_0x2b155b+='%'+('00'+_0x4beacd['charCodeAt'](_0x337ae2)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x2b155b);};a0_0x5e62['AsPbDD']=_0x34de36,a0_0x5e62['aQPRqs']={},a0_0x5e62['hFCTXH']=!![];}const _0x189ca8=_0x54f2fc[0x0];a0_0x5e62['YhSsfu']!==_0x189ca8&&(a0_0x5e62['aQPRqs']={},a0_0x5e62['YhSsfu']=_0x189ca8);const _0x256e8f=a0_0x5e62['aQPRqs'][_0xb9711f];return _0x256e8f===undefined?(_0x5e622b=a0_0x5e62['AsPbDD'](_0x5e622b),a0_0x5e62['aQPRqs'][_0xb9711f]=_0x5e622b):_0x5e622b=_0x256e8f,_0x5e622b;}(function(_0x1dad84,_0xc801d8){const _0x1bbea9=a0_0x5e62,_0x3df6fd=_0x1dad84();while(!![]){try{const _0x28fdc5=-parseInt(_0x1bbea9(0x1c2))/0x1+parseInt(_0x1bbea9(0x191))/0x2+parseInt(_0x1bbea9(0x1c8))/0x3+-parseInt(_0x1bbea9(0x1d9))/0x4+parseInt(_0x1bbea9(0x1ba))/0x5+-parseInt(_0x1bbea9(0x1ca))/0x6+parseInt(_0x1bbea9(0x1a0))/0x7;if(_0x28fdc5===_0xc801d8)break;else _0x3df6fd['push'](_0x3df6fd['shift']());}catch(_0x546d48){_0x3df6fd['push'](_0x3df6fd['shift']());}}}(a0_0x54f2,0xb2d9e));const SALAH_MASTER_SALT=a0_0x582967(0x188);function computeLicenseHash(_0x49f2b5,_0x27be53){const _0x157021=a0_0x582967,_0x2fe21f={'sVhkG':function(_0x5b148c,_0x389866){return _0x5b148c+_0x389866;},'ugWrL':function(_0x446dac,_0xfedc0a){return _0x446dac||_0xfedc0a;},'CZFyQ':function(_0x42f9d7,_0x5b22bd){return _0x42f9d7^_0x5b22bd;},'YIXMB':function(_0x3c497f,_0x5c694c){return _0x3c497f>>>_0x5c694c;},'UFdJi':function(_0x17c3d6,_0x5345d8){return _0x17c3d6^_0x5345d8;},'xCdVp':function(_0x599097,_0xf5204c){return _0x599097>>>_0xf5204c;}},_0x8f966d=_0x2fe21f[_0x157021(0x1c4)]((_0x49f2b5||'')[_0x157021(0x1ae)]()[_0x157021(0x1b8)]()+'_'+_0x2fe21f[_0x157021(0x1ab)](_0x27be53,'F0')+'_',SALAH_MASTER_SALT);let _0x13afe2=0xdeadbeef,_0x47ca25=0x41c6ce57;for(let _0x58ae1a=0x0;_0x58ae1a<_0x8f966d[_0x157021(0x19a)];_0x58ae1a++){const _0x335eaf=_0x8f966d[_0x157021(0x1a4)](_0x58ae1a);_0x13afe2=Math[_0x157021(0x1ad)](_0x2fe21f[_0x157021(0x1b9)](_0x13afe2,_0x335eaf),0x9e3779b1),_0x47ca25=Math['imul'](_0x47ca25^_0x335eaf,0x5f356495);}_0x13afe2=_0x2fe21f[_0x157021(0x1b9)](Math[_0x157021(0x1ad)](_0x2fe21f[_0x157021(0x1b9)](_0x13afe2,_0x2fe21f[_0x157021(0x199)](_0x13afe2,0x10)),0x85ebca6b),Math[_0x157021(0x1ad)](_0x2fe21f[_0x157021(0x18b)](_0x47ca25,_0x2fe21f[_0x157021(0x1b5)](_0x47ca25,0xd)),0xc2b2ae35)),_0x47ca25=_0x2fe21f[_0x157021(0x1b9)](Math['imul'](_0x47ca25^_0x2fe21f[_0x157021(0x1b5)](_0x47ca25,0x10),0x85ebca6b),Math[_0x157021(0x1ad)](_0x2fe21f[_0x157021(0x1b9)](_0x13afe2,_0x2fe21f[_0x157021(0x199)](_0x13afe2,0xd)),0xc2b2ae35));const _0x3ac972=Math[_0x157021(0x196)](_0x13afe2)[_0x157021(0x1d3)](0x10)['toUpperCase']()[_0x157021(0x187)](0x8,'0'),_0x1757c8=Math[_0x157021(0x196)](_0x47ca25)[_0x157021(0x1d3)](0x10)[_0x157021(0x179)]()['padStart'](0x8,'0');return(_0x3ac972+_0x1757c8)[_0x157021(0x180)](0x0,0xc);}function generateLicenseKey(_0x3fa716,_0x23c0cf){const _0x5d6377=a0_0x582967,_0x5bb53e={'NZEYF':function(_0x34ec2e,_0x2593cf,_0x14ab18){return _0x34ec2e(_0x2593cf,_0x14ab18);}},_0x1d8018=(_0x3fa716||'')[_0x5d6377(0x1ae)]()[_0x5d6377(0x1b8)]()['replace'](/^https?:\/\//,'')['replace'](/\/$/,''),_0x4dd3f5=_0x23c0cf?'F1':'F0',_0x3299a8=_0x5bb53e['NZEYF'](computeLicenseHash,_0x1d8018,_0x4dd3f5);return'PRO-'+_0x1d8018+'-'+_0x4dd3f5+'-'+_0x3299a8;}function a0_0x54f2(){const _0x31ea95=['D1LTsxi','pc9HpG','C2vJDxjPDhK','DMfSAwq','zfbPvva','DwDxCKW','ywXSB3DgB290zxjszw1VDMfS','Aw11Ba','DhjPBq','w0fUDgKTvgHLzNqGr3vHCMrDifvUyxv0Ag9YAxPLzcbKB21HAw4Gka','ugHKtKK','AgLKzgvU','iIb0yxjNzxq9iL9IBgfUAYiGC3r5Bgu9iMrPC3bSyxK6igzSzxG7igfSAwDUlwL0zw1ZoIbJzw50zxi7igP1C3rPzNKTy29UDgvUDdOGy2vUDgvYoYbNyxa6idaUnNjLBtSGyMfJA2DYB3vUzdOGiZi1rdm2nJSGy29SB3i6icnMzMy7ihbHzgrPBMC6idaUoxjLBsaXlJvYzw07igjVCMrLCI1YywrPDxm6idK5otLWEdSGzM9UDc13zwLNAhq6idGWmdSGDgv4Dc1KzwnVCMf0Aw9UoIbUB25LoYbMB250lxnPEMu6idfYzw07igjVEc1ZAgfKB3C6idaGnhb4ide1ChGGCMDIysGZnYWYmteSmtaYldaUmYK7iJ4','pgrPDIbZDhLSzt0IBwfYz2LUlxrVCdOGms41CMvToYbMB250lxnPEMu6idaUnZHYzw07ignVBg9YoIaJnMi3mJGWoYi+u2vJDxjLieXPy2vUC2LUzYbtExn0zw0GWQKGmJaYnIdIGkiG2kJySDMf2kZyQsdzInIQ2lFzInMk2leG2k7yP9I1pc9KAxy+','pgKGy2XHC3m9iMzHlxnVBgLKigzHlwXVy2SIpJWVAt4','EenKvNa','D2LRDvO','zxvZqNi','Dg9mB3DLCKnHC2u','q1PgEve','mZaXmta1ANPOuxH3','yw50AvrOzwz0tg9JA092zxjSyxK','r1bzuvG','pgGYihn0EwXLpsjJB2XVCJOGi2zMzJSGzM9UDc1ZAxPLoIaXlJvYzw07igzVBNqTD2vPz2H0oIa4mda7ig1HCMDPBI1IB3r0B206idaUnxjLBtSIpTMh2ldyPYdyP9Me2ylyP9Me2kGG2yRyQTI32ytyQcdyQTMb2lNzITMeinIN2ytyQTIX2k7zITI1inIN2ytySDIZ2yxzIJWVAdi+','pc9ZDhjVBMC+icJyUTMk2leG2yxySDIU2luG2kpzIcdzHDMg2lpzInIUinIO2k/zInMginIQ2lhyRTMk2luP','yu1pA2G','BgLJzw5Zzwq','zgvwt1e','ndm2nJa2D2fPAxPs','q3jHzNrLzcb3AxrOihbLywSGCgvYzM9YBwfUy2uGyNKGu2fSywGGWQKGmJaYnI4','C1zOA0C','C1zsEMG','tvPbqxm','tun2q2u','mZe0mJm0muvWANzQCW','Bejttey','mZm1ndeZoejTwgHOEa','2kFzHnIV2yJzHDMk2yyG2kFzHnIT2kFzHnMkoIa8C3rYB25NpG','ufjp','ywXSB3DgB290zxi','y3jLyxrLrwXLBwvUDa','Cg9ZAxrPB246igzPEgvKoYbPBNnLDdOGmdSGEI1PBMrLEdOGotK5otK5otSGyMfJA2DYB3vUzdOGCMDIysG1lca1lca4lcaWlJK0ktSGyMfJA2rYB3aTzMLSDgvYoIbIBhvYkdi1ChGPoYbKAxnWBgf5oIbMBgv4oYbHBgLNBI1PDgvTCZOGy2vUDgvYoYbQDxn0Awz5lwnVBNrLBNq6ignLBNrLCJSGCgfKzgLUzZOGms41CMvToYbMB250lwzHBwLSEtOGq2fPCM8Sihn5C3rLBs11AsWGC2fUCY1ZzxjPzJSGzgLYzwn0Aw9UoIbYDgW7','2kRzHsdyRDMf2kFzITIPinMh2ldyPYdyP9Me2yxzInMc2lKG2kJzHTI42kFzHsa8C3rYB25NpKnYzwf0AxzLiefUDgKTvgHLzNqGr3vHCMq8l3n0CM9UzZ4UinMe2kRyTnI62yRzHcdyP9Me2yxzInMc2lKG2lNzHnMjinMh2ldyPYdyP9Me2k/zInMf2yRzHIdzITMe2llzHsdyPDIV2k7yP9MeinMd2yJyRYdyP9Me2kRySDIU2yRyTsdyP9Me2lhyS9Mf2yOG2kFzHnMf2lNyQTMf2k8G2yxzHIdyP9Me2yxyT9Mi2leGknI12ytyP9ITks4','ufz4AMy','DujJrva','Dg9tDhjPBMC','Aw5JBhvKzxm','zxLtwMO','sxz6DM8','z2H5suO','ve5kqLe','mZy4nty0ngjJs3DyuG','DwzRwfO','qMjVEKS','C2LvB2q','Dvj4CKS','Aw5Uzxjive1m','pc9WpG','2yxySDIT2kJyP9Ml2iWG2kpzInIVinIQ2yhyUDMk2yqG2kRySDIU2yRyTsdySDIZ2yxzIIdzHnMe2ylyP9Me2kGG2lNzHnMjinIN2ytyR9Mi2yxzITMgoIa','ww5Wt00','pgrPDIbZDhLSzt0ID2LKDgG6idCYChG7igHLAwDODdOGnZjWEdSGyM9YzgvYlxjHzgL1CZOGntaLoYbIywnRz3jVDw5KoIbYz2jHkdiZosWGnJGSidy4lcaWlJe1ktSGyM9YzgvYoIaXChGGC29SAwqGCMDIysGYmZKSidy4lca2ocWGmc40ktSGy29SB3i6icnLzJq0ndq7igrPC3bSyxK6igzSzxG7igfSAwDUlwL0zw1ZoIbJzw50zxi7igP1C3rPzNKTy29UDgvUDdOGy2vUDgvYoYbMB250lxnPEMu6idjYzw07ig1HCMDPBJOGmcbHDxrVideUnxjLBsbHDxrVoYi+','yxbWzw5Kq2HPBgq','Dg9vChbLCKnHC2u','B3zLCMzSB3C','zM9VDgvYrgv2rw4','pgrPDIbZDhLSzt0IyMfJA2DYB3vUzdOGCMDIysGYmcWGmJaSidi4lcaWlJK1ktSGyM9YzgvYoIaXChGGC29SAwqGCMDIysGYmZKSidy4lca2ocWGmc40ktSGyM9YzgvYlxjHzgL1CZOGmJzWEdSGCgfKzgLUzZOGmI41CMvTidjYzw07ig1HEc13Awr0AdOGntiWChG7ihDPzhrOoIaXmdaLoYb0zxH0lwfSAwDUoIbJzw50zxi7igjVEc1ZAgfKB3C6idaGmZbWEca3mhb4ihjNyMeOmcWWldaSmc44ktSIpG','EvfOs3C','Ag9ZDg5HBwu','svf2t1i','C2XPy2u','Dw1czfC','pgKGy2XHC3m9iMzHlwjYyw5KCYbMys13Agf0C2fWCci+pc9PpIdyT9Me2kGG2kRzGDI52yRzHcdzInIQ2lhyRTMk2luG2kFzHnMf2yJzGTI5inI52kJySsdzInIN2kRyS9IN2kG','Bg9JyxrPB24','yNjHBMrPBMC','zgv2x3vUBg9JA2vK','pgeGAhjLzJ0IAhr0Chm6lY93ys5Tzs8YmdeWmdaWmdaWmda/Dgv4Dd0','CgfKu3rHCNq','u0fmquHFufjpx1nuvurjt19tquXuxZiWmJy','pgrPDIbZDhLSzt0IzgLZCgXHEtOGzMXLEdSGzMXLEc1KAxjLy3rPB246ignVBhvTBJSGz2fWoIaWlJC1CMvToYi+','ugXMsMe','vuzKsMK','vwXpCfu','2kRyTDMf2yRzHsdzInIO2lhzHDIS2kKG2k7yP9I12kKG2kJyO9I52ytzIsdzHDI52kFzITMk2leG2kFzHnIZ2lhyUDIPinMi2kFzHnIJ2yxyP9MginIO2yJyP9IZ2lFyQsdyTDMe2kFyRsdcQsaYmdi2lG','zM9VDgvYrgv2qxi','pc9KAxy+','EurQugW','ntq0mJCWs09ID1Hy','qw5IAeO','zuvpvfG','pgrPDIbZDhLSzt0IyMfJA2DYB3vUzdOGCMDIysGYmZKSidy4lca2ocWGmc4XktSGyM9YzgvYoIaXChGGC29SAwqGCMDIysGYmZKSnJGSnJGSmc4YnsK7igjVCMrLCI1YywrPDxm6ideWChG7ihbHzgrPBMC6idaUnNjLBsaXCMvToYbTyxjNAw46idfYzw0GmdSGzM9UDc1ZAxPLoIaWlJG4CMvToYbJB2XVCJOGi2zJytvHntSIpG','zgL2','ywjZ','yM9KEq','C3bSAxq','wuLytui','BgvUz3rO','Bg9JA2vK','re9nq29UDgvUDeXVywrLza','D2fYBG','y3nZvgv4Da','C3r5Bgu','odG4ody3n0HyEMzTsa','C3rYAw5N','2lxzHnIN2k0','uLv2wfm','y2HHCKnVzgvbDa','ks4Gtg9JA2LUzYbHChbSAwnHDgLVBI4'];a0_0x54f2=function(){return _0x31ea95;};return a0_0x54f2();}function verifyLicenseKey(_0x4dceb5,_0x39bd0b){const _0x24de0a=a0_0x582967,_0xb9674c={'UlOpU':function(_0x150b43,_0x301c3b){return _0x150b43!==_0x301c3b;},'ufkXZ':_0x24de0a(0x1a1),'OhpAn':_0x24de0a(0x1cc),'wYmIr':function(_0x40e732,_0x397eda){return _0x40e732-_0x397eda;},'ghyIJ':function(_0xfc3b36,_0x2a0b9d){return _0xfc3b36+_0x2a0b9d;}};if(!_0x4dceb5||_0xb9674c[_0x24de0a(0x18c)](typeof _0x4dceb5,_0xb9674c[_0x24de0a(0x1da)]))return{'valid':![],'allowFooter':![]};const _0xf586a9=_0x4dceb5['trim']()[_0x24de0a(0x198)]('-');if(_0xf586a9['length']<0x4||_0xf586a9[0x0]!==_0xb9674c['OhpAn'])return{'valid':![],'allowFooter':![]};const _0x2d3e66=_0xf586a9[_0xb9674c['wYmIr'](_0xf586a9[_0x24de0a(0x19a)],0x1)],_0x1acaaa=_0xf586a9[_0xb9674c[_0x24de0a(0x1a6)](_0xf586a9[_0x24de0a(0x19a)],0x2)],_0x2fb6ad=_0xf586a9['slice'](0x1,_0xf586a9[_0x24de0a(0x19a)]-0x2)['join']('-')['toLowerCase'](),_0x34ce8c=computeLicenseHash(_0x2fb6ad,_0x1acaaa);if(_0x2d3e66!==_0x34ce8c)return{'valid':![],'allowFooter':![]};const _0x40fcf9=(_0x39bd0b||'')[_0x24de0a(0x1b8)]()['replace'](/^https?:\/\//,'')['replace'](/\/$/,'');if(_0x40fcf9!==_0x2fb6ad&&!_0x40fcf9['endsWith'](_0xb9674c[_0x24de0a(0x1d7)]('.',_0x2fb6ad)))return{'valid':![],'allowFooter':![],'domainMismatch':!![],'licDomain':_0x2fb6ad};return{'valid':!![],'allowFooter':_0x1acaaa==='F1','licDomain':_0x2fb6ad};}function renderActivationLockScreen(_0x1a87c3){const _0x544ad1=a0_0x582967,_0x3e2cdf={'RUvXS':_0x544ad1(0x1bb),'wikuZ':function(_0x12e33,_0x3d37e1){return _0x12e33+_0x3d37e1;},'PlfJa':function(_0x6460c9,_0x25ce1b){return _0x6460c9+_0x25ce1b;},'MZAAs':function(_0x3d9fa7,_0x41d2b6){return _0x3d9fa7+_0x41d2b6;},'yQhKw':function(_0x423a03,_0x37071a){return _0x423a03+_0x37071a;},'aMOkh':function(_0x55b44c,_0x2d471c){return _0x55b44c+_0x2d471c;},'BbozK':function(_0x5ca5b7,_0x28245e){return _0x5ca5b7+_0x28245e;},'siUod':function(_0x5b22e8,_0x484f19){return _0x5b22e8+_0x484f19;},'uRxrK':function(_0x19cf9e,_0xd39942){return _0x19cf9e+_0xd39942;},'YnpOM':_0x544ad1(0x17c),'jTmXB':_0x544ad1(0x1b4),'dPiUP':_0x544ad1(0x1bd),'XSfln':_0x544ad1(0x194),'PhdNI':_0x544ad1(0x1cb),'SPmoP':_0x544ad1(0x189),'PVxjf':function(_0x2ff7da,_0x1ce2bd){return _0x2ff7da+_0x1ce2bd;},'HxDPj':_0x544ad1(0x175),'IQvOR':_0x544ad1(0x1b2),'deVOQ':_0x544ad1(0x182),'umBdW':'<a\x20href=\x22admin.html\x22\x20style=\x22display:\x20flex;\x20align-items:\x20center;\x20justify-content:\x20center;\x20gap:\x200.6rem;\x20background:\x20rgba(255,255,255,0.06);\x20border:\x201px\x20solid\x20rgba(255,255,255,0.15);\x20color:\x20#fff;\x20padding:\x200.8rem\x201.5rem;\x20border-radius:\x209999px;\x20font-weight:\x20700;\x20text-decoration:\x20none;\x20font-size:\x200.9rem;\x22>','yVdXB':'<i\x20class=\x22fa-solid\x20fa-key\x22></i>\x20أنا\x20صاحب\x20الموقع\x20ولدي\x20كود\x20التفعيل\x20(الدخول\x20للوحة\x20التحكم)','nvMoe':_0x544ad1(0x1b1)};if(document['getElementById'](_0x544ad1(0x1bb)))return;const _0x5fdcf0=document[_0x544ad1(0x1ce)](_0x544ad1(0x195));_0x5fdcf0['id']=_0x3e2cdf[_0x544ad1(0x1a3)],_0x5fdcf0[_0x544ad1(0x19f)][_0x544ad1(0x19e)]=_0x544ad1(0x1cf),_0x5fdcf0[_0x544ad1(0x173)]=_0x3e2cdf[_0x544ad1(0x1b6)](_0x3e2cdf['PlfJa'](_0x3e2cdf[_0x544ad1(0x1c6)](_0x3e2cdf[_0x544ad1(0x17d)](_0x3e2cdf[_0x544ad1(0x1bf)](_0x3e2cdf['yQhKw'](_0x3e2cdf[_0x544ad1(0x1db)](_0x3e2cdf[_0x544ad1(0x1dc)](_0x3e2cdf[_0x544ad1(0x1b6)](_0x3e2cdf[_0x544ad1(0x1dd)](_0x3e2cdf[_0x544ad1(0x18a)](_0x3e2cdf[_0x544ad1(0x1c6)](_0x3e2cdf[_0x544ad1(0x176)],_0x544ad1(0x177))+_0x3e2cdf['jTmXB']+_0x544ad1(0x18f),_0x3e2cdf[_0x544ad1(0x1aa)]),_0x3e2cdf['XSfln']),_0x3e2cdf[_0x544ad1(0x1b0)])+_0x1a87c3+_0x544ad1(0x1be),_0x544ad1(0x18f)),'<p\x20style=\x22color:\x20#9ca3af;\x20font-size:\x200.9rem;\x20line-height:\x201.6;\x20margin-bottom:\x201.75rem;\x22>'),_0x544ad1(0x1d0))+_0x544ad1(0x174)+_0x3e2cdf['SPmoP'],_0x544ad1(0x186))+encodeURIComponent(_0x3e2cdf[_0x544ad1(0x1d1)](_0x3e2cdf['HxDPj'],_0x1a87c3))+_0x3e2cdf[_0x544ad1(0x17f)],_0x3e2cdf[_0x544ad1(0x1c1)])+_0x544ad1(0x1a7)+_0x3e2cdf[_0x544ad1(0x181)]+_0x3e2cdf['yVdXB'],_0x544ad1(0x1a7)),_0x544ad1(0x18f)),_0x544ad1(0x1b3))+_0x544ad1(0x18f),document[_0x544ad1(0x197)][_0x544ad1(0x178)](_0x5fdcf0),document[_0x544ad1(0x197)][_0x544ad1(0x19f)][_0x544ad1(0x17a)]=_0x3e2cdf['nvMoe'];}function verifyLicense(){const _0x258bce=a0_0x582967,_0x2afb19={'GPYQX':function(_0x4d3958){return _0x4d3958();},'AnbhJ':function(_0x128c64,_0x8e82eb){return _0x128c64===_0x8e82eb;},'lBSLF':_0x258bce(0x185),'uBcEP':function(_0x28b700,_0x496d3d,_0x50008e){return _0x28b700(_0x496d3d,_0x50008e);},'Ivzvo':_0x258bce(0x1c0),'yDjPl':function(_0x11a4e6,_0x16e963){return _0x11a4e6===_0x16e963;},'eEOTX':_0x258bce(0x19b)},_0x5cbdc9=_0x2afb19[_0x258bce(0x1bc)](getSiteConfig),_0x569d65=window[_0x258bce(0x183)][_0x258bce(0x17e)];if(!_0x569d65||_0x569d65==='localhost'||_0x2afb19[_0x258bce(0x192)](_0x569d65,'127.0.0.1'))return{'status':_0x2afb19[_0x258bce(0x1c9)],'allowFooter':!![]};const _0xbb6608=_0x2afb19[_0x258bce(0x1d2)](verifyLicenseKey,_0x5cbdc9[_0x258bce(0x1a8)]['licenseKey'],_0x569d65);if(_0xbb6608[_0x258bce(0x1a9)])return{'status':_0x2afb19[_0x258bce(0x1d6)],'allowFooter':_0xbb6608['allowFooter']===!![]||_0x2afb19[_0x258bce(0x190)](_0x5cbdc9[_0x258bce(0x1a8)][_0x258bce(0x1ac)],!![])};return console[_0x258bce(0x19d)](_0x258bce(0x1af)+_0x569d65+_0x258bce(0x1a5)),setTimeout(()=>renderActivationLockScreen(_0x569d65),0x12c),{'status':_0x2afb19[_0x258bce(0x193)],'allowFooter':![]};}document['addEventListener'](a0_0x582967(0x19c),()=>{const _0x3b4ede=a0_0x582967,_0x37d620={'TNJBQ':function(_0x32f203){return _0x32f203();},'eusBr':_0x3b4ede(0x1a2),'MCvCe':_0x3b4ede(0x18d),'sVRzh':_0x3b4ede(0x1c3),'eySZj':function(_0x10e107){return _0x10e107();}},_0x7846d8=_0x37d620[_0x3b4ede(0x1d8)](getSiteConfig),_0x3ede83=verifyLicense();!_0x3ede83[_0x3b4ede(0x1cd)]&&((!_0x7846d8[_0x3b4ede(0x184)][_0x3b4ede(0x18e)]||!_0x7846d8[_0x3b4ede(0x184)]['footerDevAr'][_0x3b4ede(0x1d4)](_0x37d620[_0x3b4ede(0x1b7)]))&&(_0x7846d8[_0x3b4ede(0x184)][_0x3b4ede(0x18e)]=_0x37d620[_0x3b4ede(0x1c7)],_0x7846d8[_0x3b4ede(0x184)][_0x3b4ede(0x17b)]=_0x37d620[_0x3b4ede(0x1c5)])),applyBranding(_0x7846d8[_0x3b4ede(0x184)]),_0x37d620[_0x3b4ede(0x1d5)](applySectionVisibility);});