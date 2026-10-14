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
        masterKey: "SALAH-MASTER-2026",
        authorizedDomains: ["localhost", "127.0.0.1"],
        licenseKey: "",
        clientEmail: "",
        allowFooterRemoval: false
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
// Cryptographic Licensing & Anti-Theft Verification Engine (Creative Portfolio 2026)
// ----------------------------------------------------------------------------
const SALAH_MASTER_SALT = "SALAH_PRO_STUDIO_SALT_2026";

function computeLicenseHash(domain, flag) {
    const str = `${(domain || '').trim().toLowerCase()}_${flag || 'F0'}_${SALAH_MASTER_SALT}`;
    let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
    for (let i = 0; i < str.length; i++) {
        const ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    const hex1 = Math.abs(h1).toString(16).toUpperCase().padStart(8, '0');
    const hex2 = Math.abs(h2).toString(16).toUpperCase().padStart(8, '0');
    return (hex1 + hex2).slice(0, 12);
}

function generateLicenseKey(domain, allowFooter) {
    const cleanDomain = (domain || '').trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/$/, '');
    const flag = allowFooter ? 'F1' : 'F0';
    const sig = computeLicenseHash(cleanDomain, flag);
    return `PRO-${cleanDomain}-${flag}-${sig}`;
}

function verifyLicenseKey(key, currentHost) {
    if (!key || typeof key !== 'string') return { valid: false, allowFooter: false };
    const parts = key.trim().split('-');
    if (parts.length < 4 || parts[0] !== 'PRO') return { valid: false, allowFooter: false };
    
    // In case domain itself contained hyphens (e.g., PRO-my-site.github.io-F0-SIG)
    const sig = parts[parts.length - 1];
    const flag = parts[parts.length - 2];
    const licDomain = parts.slice(1, parts.length - 2).join('-').toLowerCase();

    const expectedSig = computeLicenseHash(licDomain, flag);
    if (sig !== expectedSig) return { valid: false, allowFooter: false };

    const cleanHost = (currentHost || '').toLowerCase().replace(/^https?:\/\//, '').replace(/\/$/, '');
    if (cleanHost !== licDomain && !cleanHost.endsWith('.' + licDomain)) {
        return { valid: false, allowFooter: false, domainMismatch: true, licDomain };
    }
    return { valid: true, allowFooter: (flag === 'F1'), licDomain };
}

// ----------------------------------------------------------------------------
// Reusable Dynamic Navbar Generator (Supports Dropdowns & Store Switch)
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

// ----------------------------------------------------------------------------
// Reusable Dynamic Navbar Generator (Supports Dropdowns & Section Visibility)
// ----------------------------------------------------------------------------
function renderDynamicNavbar(navContainerEl, mobileNavContainerEl) {
    const config = getSiteConfig();
    let navItems = config.navItems || DEFAULT_CONFIG.navItems;
    const currentLang = localStorage.getItem('site_lang') || 'ar';
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    const sec = config.sections || {};
    const isStoreEnabled = (sec.store !== false && (config.store ? config.store.enabled !== false : true));
    const isTutEnabled = sec.tutorials !== false;
    const isCalcEnabled = sec.calculator !== false;
    const isRevEnabled = sec.reviews !== false;
    const isFaqEnabled = sec.faq !== false;

    // Filter main nav and sub links according to section visibility and hidden flag
    navItems = navItems.filter(item => {
        if (item.hidden === true) return false;
        if (!isStoreEnabled && (item.id === 'nav-store' || (item.url && item.url.includes('store.html')))) return false;
        if (!isTutEnabled && (item.id === 'nav-tutorials' || (item.url && item.url.includes('tutorials.html')))) return false;
        if (!isCalcEnabled && (item.id === 'nav-calc' || (item.url && item.url.includes('#calculator')))) return false;
        return true;
    }).map(item => {
        if (item.dropdown && Array.isArray(item.dropdown)) {
            const filteredSubs = item.dropdown.filter(sub => {
                if (sub.hidden === true) return false;
                if (!isRevEnabled && sub.url && sub.url.includes('#reviews')) return false;
                if (!isFaqEnabled && sub.url && sub.url.includes('#faq')) return false;
                return true;
            });
            return Object.assign({}, item, { dropdown: filteredSubs });
        }
        return item;
    }).filter(item => {
        if (item.dropdown && Array.isArray(item.dropdown) && item.dropdown.length === 0) return false;
        return true;
    });

    // 1. Render Desktop Navbar
    if (navContainerEl) {
        navContainerEl.innerHTML = '';
        navItems.forEach(item => {
            const label = currentLang === 'ar' ? item.labelAr : item.labelEn;
            
            if (item.dropdown && Array.isArray(item.dropdown) && item.dropdown.length > 0) {
                const dropdownWrap = document.createElement('div');
                dropdownWrap.className = 'nav-dropdown-wrap';
                dropdownWrap.innerHTML = `
                    <button type="button" class="nav-dropdown-trigger">${label}</button>
                    <div class="nav-dropdown-menu">
                        ${item.dropdown.map(sub => `
                            <a href="${sub.url}" class="nav-dropdown-link">${currentLang === 'ar' ? sub.labelAr : sub.labelEn}</a>
                        `).join('')}
                    </div>
                `;
                navContainerEl.appendChild(dropdownWrap);
            } else {
                const a = document.createElement('a');
                a.href = item.url;
                a.textContent = label;
                if (item.url.includes(currentPage) && currentPage !== '') {
                    a.classList.add('active');
                }
                navContainerEl.appendChild(a);
            }
        });
    }

    // 2. Render Mobile Drawer Links
    const mobileContainer = mobileNavContainerEl || document.getElementById('mobileNavLinks');
    if (mobileContainer) {
        mobileContainer.innerHTML = '';
        navItems.forEach(item => {
            const label = currentLang === 'ar' ? item.labelAr : item.labelEn;

            if (item.dropdown && Array.isArray(item.dropdown) && item.dropdown.length > 0) {
                const group = document.createElement('div');
                group.style.marginBottom = '0.5rem';
                group.innerHTML = `
                    <span style="display:block; font-weight:800; color:var(--text-primary); padding:0.4rem 0.75rem; font-size:1rem;">${label}</span>
                    <div class="mobile-nav-sublinks">
                        ${item.dropdown.map(sub => `
                            <a href="${sub.url}">${currentLang === 'ar' ? sub.labelAr : sub.labelEn}</a>
                        `).join('')}
                    </div>
                `;
                mobileContainer.appendChild(group);
            } else {
                const a = document.createElement('a');
                a.href = item.url;
                a.textContent = label;
                if (item.url.includes(currentPage) && currentPage !== '') {
                    a.classList.add('active');
                }
                mobileContainer.appendChild(a);
            }
        });
    }

    // 3. Attach Mobile Drawer Open/Close Listeners
    const btnOpen = document.getElementById('btnOpenMobileNav');
    const btnClose = document.getElementById('btnCloseMobileNav');
    const drawer = document.getElementById('mobileNavDrawer');
    const backdrop = document.getElementById('mobileNavBackdrop');

    if (btnOpen && drawer && !btnOpen.dataset.bound) {
        btnOpen.dataset.bound = "true";
        btnOpen.addEventListener('click', () => {
            drawer.classList.add('open');
            backdrop?.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        const closeDrawer = () => {
            drawer.classList.remove('open');
            backdrop?.classList.remove('active');
            document.body.style.overflow = '';
        };

        btnClose?.addEventListener('click', closeDrawer);
        backdrop?.addEventListener('click', closeDrawer);
        mobileContainer?.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeDrawer);
        });
    }
}

// ----------------------------------------------------------------------------
// Anti-Theft Activation Guard & Lock Overlay
// ----------------------------------------------------------------------------
function renderActivationLockScreen(currentHost) {
    if (document.getElementById('antiTheftLockOverlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'antiTheftLockOverlay';
    overlay.style.cssText = `
        position: fixed; inset: 0; z-index: 9999999;
        background: rgba(5, 5, 8, 0.94);
        backdrop-filter: blur(25px);
        display: flex; align-items: center; justify-content: center;
        padding: 1.5rem; font-family: 'Cairo', system-ui, sans-serif; direction: rtl;
    `;

    overlay.innerHTML = `
        <div style="background: rgba(20, 20, 28, 0.95); border: 1px solid rgba(239, 68, 68, 0.4); border-radius: 26px; padding: 2.5rem 2rem; max-width: 520px; width: 100%; text-align: center; box-shadow: 0 30px 70px rgba(0,0,0,0.8);">
            <div style="width: 72px; height: 72px; border-radius: 50%; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.4); color: #ef4444; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 1.5rem auto;">
                <i class="fa-solid fa-lock"></i>
            </div>
            <h2 style="color: #fff; font-size: 1.5rem; font-weight: 800; margin-bottom: 0.5rem;">
                هذا القالب يتطلب تفعيل الترخيص الرسمي
            </h2>
            <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239,68,68,0.25); border-radius: 10px; padding: 0.6rem 1rem; margin: 1rem 0; font-size: 0.88rem; color: #fca5a5;">
                الدومين الحالي: <strong>${currentHost}</strong> (غير مرخص أو منسوخ بدون ترخيص)
            </div>
            <p style="color: #9ca3af; font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.75rem;">
                تم حماية هذا الموقع بنظام <strong>Creative Anti-Theft Guard</strong>. لتشغيل الموقع على هذا الدومين يلزم إدخال كود الترخيص الرسمي المعتمد من المطور (صلاح).
            </p>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                <a href="https://wa.me/201000000000?text=${encodeURIComponent('مرحباً، أود تفعيل ترخيص رسمي للقالب على الدومين: ' + currentHost)}" target="_blank" style="display: flex; align-items: center; justify-content: center; gap: 0.6rem; background: #25D366; color: #fff; padding: 0.9rem 1.5rem; border-radius: 9999px; font-weight: 800; text-decoration: none; font-size: 1rem; box-shadow: 0 4px 15px rgba(37,211,102,0.3);">
                    <i class="fa-brands fa-whatsapp"></i> طلب تفعيل وترخيص الموقع عبر واتساب
                </a>
                <a href="admin.html" style="display: flex; align-items: center; justify-content: center; gap: 0.6rem; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.15); color: #fff; padding: 0.8rem 1.5rem; border-radius: 9999px; font-weight: 700; text-decoration: none; font-size: 0.9rem;">
                    <i class="fa-solid fa-key"></i> أنا صاحب الموقع ولدي كود التفعيل (الدخول للوحة التحكم)
                </a>
            </div>
            <div style="margin-top: 1.5rem; font-size: 0.78rem; color: #6b7280;">
                Secure Licensing System © 2026 • برمجة وتطوير خاص
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
}

function verifyLicense() {
    const config = getSiteConfig();
    const currentHost = window.location.hostname;

    // 1. Localhost and local files always allowed (Developer Preview)
    if (!currentHost || currentHost === 'localhost' || currentHost === '127.0.0.1') {
        return { status: 'dev_unlocked', allowFooter: true };
    }

    // 2. Check Whitelist or Cryptographic License
    const authorized = config.security.authorizedDomains || [];
    const isWhitelisted = authorized.some(d => d && (d === currentHost || currentHost.endsWith('.' + d)));

    const licCheck = verifyLicenseKey(config.security.licenseKey, currentHost);

    if (isWhitelisted || licCheck.valid) {
        const canEditFooter = licCheck.valid ? licCheck.allowFooter : (config.security.allowFooterRemoval === true);
        return { status: 'licensed', allowFooter: canEditFooter };
    }

    // 3. Unauthorized live domain -> Trigger Anti-theft Lock Screen!
    console.warn(`[Anti-Theft] Unauthorized domain (${currentHost}). Locking application.`);
    setTimeout(() => renderActivationLockScreen(currentHost), 300);
    return { status: 'locked', allowFooter: false };
}

document.addEventListener('DOMContentLoaded', () => {
    const config = getSiteConfig();
    const lic = verifyLicense();

    // Copyright Protection: Unless licensed for white-labeling, preserve developer credits
    if (!lic.allowFooter) {
        if (!config.branding.footerDevAr || !config.branding.footerDevAr.includes('صلاح')) {
            config.branding.footerDevAr = "تصميم وبرمجة خاصة بأعلى معايير السرعة والأمان بواسطة صلاح © 2026.";
            config.branding.footerDevEn = "Crafted with peak performance by Salah © 2026.";
        }
    }

    applyBranding(config.branding);
    applySectionVisibility();
});
