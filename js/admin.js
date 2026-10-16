/**
 * ============================================================================
 * Creative Portfolio - Admin Control Panel Interactive Logic (Full Suite 2026)
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    let siteConfig = getSiteConfig();
    let currentProjects = getSiteProjects();
    let currentTutorials = getSiteTutorials();
    let currentProducts = getSiteProducts();

    const pinLockOverlay = document.getElementById('pinLockOverlay');
    const adminUsernameInput = document.getElementById('adminUsernameInput');
    const adminPasswordInput = document.getElementById('adminPasswordInput');
    const btnToggleLoginPass = document.getElementById('btnToggleLoginPass');
    const chkRememberMe = document.getElementById('chkRememberMe');
    const pinFeedback = document.getElementById('pinFeedback');
    const btnUnlock = document.getElementById('btnUnlock');
    const btnDirectDefaultLogin = document.getElementById('btnDirectDefaultLogin');
    const btnResetToDefaultPin = document.getElementById('btnResetToDefaultPin');
    const btnLogoutAdmin = document.getElementById('btnLogoutAdmin');
    const btnAdminMobileLogout = document.getElementById('btnAdminMobileLogout');

    // ------------------------------------------------------------------------
    // 0. Mobile Admin Sidebar Drawer Handlers
    // ------------------------------------------------------------------------
    const btnMobileToggle = document.getElementById('btnAdminMobileToggle');
    const adminSidebar = document.getElementById('adminSidebar');
    const adminBackdrop = document.getElementById('adminSidebarBackdrop');

    if (btnMobileToggle && adminSidebar) {
        btnMobileToggle.addEventListener('click', () => {
            adminSidebar.classList.toggle('open');
            adminBackdrop?.classList.toggle('active');
        });

        const closeMobileSidebar = () => {
            adminSidebar.classList.remove('open');
            adminBackdrop?.classList.remove('active');
        };

        adminBackdrop?.addEventListener('click', closeMobileSidebar);
        document.querySelectorAll('.admin-nav-item button').forEach(b => {
            b.addEventListener('click', () => {
                if (window.innerWidth <= 900) closeMobileSidebar();
            });
        });
    }

    // ------------------------------------------------------------------------
    // 1. Modern Admin Login & Session Management
    // ------------------------------------------------------------------------
    if (btnToggleLoginPass && adminPasswordInput) {
        btnToggleLoginPass.addEventListener('click', () => {
            const isPass = adminPasswordInput.type === 'password';
            adminPasswordInput.type = isPass ? 'text' : 'password';
            btnToggleLoginPass.innerHTML = isPass ? '<i class="fa-solid fa-eye-slash"></i>' : '<i class="fa-solid fa-eye"></i>';
        });
    }

    function attemptLogin() {
        const u = adminUsernameInput ? adminUsernameInput.value.trim().toLowerCase() : '';
        const p = adminPasswordInput ? adminPasswordInput.value.trim() : '';

        if (!p) {
            if (pinFeedback) {
                pinFeedback.style.color = 'var(--admin-crimson)';
                pinFeedback.textContent = 'يرجى إدخال كلمة المرور أو رمز PIN.';
            }
            if (adminPasswordInput) adminPasswordInput.focus();
            return;
        }

        const validPins = [
            '123456',
            '1234',
            'admin',
            siteConfig?.security?.pinCode,
            siteConfig?.security?.masterKey || 'SALAH-MASTER-2026'
        ].filter(Boolean);

        const isPasswordMatch = validPins.includes(p);

        const validUsers = [
            'admin',
            (siteConfig?.security?.adminUsername || '').toLowerCase(),
            (siteConfig?.security?.adminEmail || '').toLowerCase(),
            (siteConfig?.profile?.email || '').toLowerCase(),
            'salah saleh',
            'salahsalehbesoo@gmail.com'
        ].filter(Boolean);

        // If password is master key or 123456, allow login immediately; otherwise match username
        const isUserMatch = (p === 'SALAH-MASTER-2026' || p === '123456') || !u || validUsers.includes(u) || u === 'admin' || (siteConfig?.security?.adminUsername && u === siteConfig.security.adminUsername.toLowerCase());

        if (isPasswordMatch && isUserMatch) {
            if (chkRememberMe && chkRememberMe.checked) {
                sessionStorage.setItem('pro_admin_logged_in', 'true');
                localStorage.setItem('pro_admin_remember', 'true');
            } else {
                sessionStorage.setItem('pro_admin_logged_in', 'true');
                localStorage.removeItem('pro_admin_remember');
            }

            if (pinLockOverlay) {
                pinLockOverlay.classList.add('hidden');
                pinLockOverlay.style.display = 'none';
            }
            const antiOverlay = document.getElementById('antiTheftLockOverlay');
            if (antiOverlay) antiOverlay.remove();
            document.body.style.overflow = '';

            if (pinFeedback) pinFeedback.textContent = '';
            initDashboard();
            showToast('تم تسجيل الدخول بنجاح! أهلاً بك في لوحة التحكم.');
        } else {
            if (pinFeedback) {
                pinFeedback.style.color = 'var(--admin-crimson)';
                pinFeedback.textContent = 'بيانات الدخول غير صحيحة. تأكد من اسم المستخدم أو كلمة المرور.';
            }
            if (adminPasswordInput) {
                adminPasswordInput.value = '';
                adminPasswordInput.focus();
            }
        }
    }
    window.attemptLogin = attemptLogin;

    function loginWithDefaultCredentials() {
        siteConfig.security.pinCode = '123456';
        saveSiteConfig(siteConfig);
        sessionStorage.setItem('pro_admin_logged_in', 'true');
        if (pinLockOverlay) {
            pinLockOverlay.classList.add('hidden');
            pinLockOverlay.style.display = 'none';
        }
        const antiOverlay = document.getElementById('antiTheftLockOverlay');
        if (antiOverlay) antiOverlay.remove();
        document.body.style.overflow = '';

        if (adminPasswordInput) adminPasswordInput.value = '123456';
        if (pinFeedback) pinFeedback.textContent = '';
        initDashboard();
        showToast('تم تسجيل الدخول وتعيين كلمة المرور الافتراضية (123456) بنجاح!');
    }

    if (btnDirectDefaultLogin) {
        btnDirectDefaultLogin.addEventListener('click', loginWithDefaultCredentials);
    }
    if (btnResetToDefaultPin) {
        btnResetToDefaultPin.addEventListener('click', loginWithDefaultCredentials);
    }

    if (btnUnlock) {
        btnUnlock.addEventListener('click', attemptLogin);
    }

    const adminLoginForm = document.getElementById('adminLoginForm');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            attemptLogin();
        });
    }

    [adminUsernameInput, adminPasswordInput].forEach(inp => {
        if (inp) {
            inp.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    attemptLogin();
                }
            });
        }
    });

    // Check saved session on page load helper
    function checkSessionOnLoad() {
        if (sessionStorage.getItem('pro_admin_logged_in') === 'true' || localStorage.getItem('pro_admin_remember') === 'true') {
            if (pinLockOverlay) {
                pinLockOverlay.classList.add('hidden');
                pinLockOverlay.style.display = 'none';
            }
            const antiOverlay = document.getElementById('antiTheftLockOverlay');
            if (antiOverlay) antiOverlay.remove();
            document.body.style.overflow = '';
            initDashboard();
        }
    }
    checkSessionOnLoad();

    // Logout Handlers
    function logoutAdmin() {
        sessionStorage.removeItem('pro_admin_logged_in');
        localStorage.removeItem('pro_admin_remember');
        if (adminPasswordInput) adminPasswordInput.value = '';
        if (pinLockOverlay) pinLockOverlay.classList.remove('hidden');
        if (pinFeedback) pinFeedback.textContent = '';
        showToast('تم تسجيل الخروج وقفل لوحة التحكم.');
    }

    if (btnLogoutAdmin) btnLogoutAdmin.addEventListener('click', logoutAdmin);
    if (btnAdminMobileLogout) btnAdminMobileLogout.addEventListener('click', logoutAdmin);

    // Forgot PIN & Reset Password Handlers
    const btnForgotPin = document.getElementById('btnForgotPin');
    const pinResetBox = document.getElementById('pinResetBox');
    const btnCancelResetPin = document.getElementById('btnCancelResetPin');
    const btnConfirmResetPin = document.getElementById('btnConfirmResetPin');
    const resetRecoveryContact = document.getElementById('resetRecoveryContact') || document.getElementById('resetRecoveryKey');
    const resetNewPin = document.getElementById('resetNewPin');
    const resetPinFeedback = document.getElementById('resetPinFeedback');

    if (btnForgotPin && pinResetBox) {
        btnForgotPin.addEventListener('click', () => {
            const isHidden = pinResetBox.style.display === 'none';
            pinResetBox.style.display = isHidden ? 'block' : 'none';
            if (resetPinFeedback) resetPinFeedback.textContent = '';
        });
    }

    if (btnCancelResetPin && pinResetBox) {
        btnCancelResetPin.addEventListener('click', () => {
            pinResetBox.style.display = 'none';
            if (resetRecoveryContact) resetRecoveryContact.value = '';
            if (resetNewPin) resetNewPin.value = '';
            if (resetPinFeedback) resetPinFeedback.textContent = '';
        });
    }

    if (btnConfirmResetPin) {
        btnConfirmResetPin.addEventListener('click', () => {
            const enteredContact = resetRecoveryContact?.value.trim().toLowerCase();
            const np = resetNewPin?.value.trim();

            if (!enteredContact || !np) {
                if (resetPinFeedback) {
                    resetPinFeedback.style.color = 'var(--admin-crimson)';
                    resetPinFeedback.textContent = 'يرجى إدخال البريد أو رقم الهاتف المسجل وكلمة المرور الجديدة.';
                }
                return;
            }

            const profEmail = ((siteConfig.security && siteConfig.security.adminEmail) || (siteConfig.profile && siteConfig.profile.email) || 'Salahsalehbesoo@gmail.com').trim().toLowerCase();
            const profPhone = ((siteConfig.security && siteConfig.security.recoveryPhone) || (siteConfig.profile && siteConfig.profile.whatsapp) || '201028076694').trim().replace(/[^0-9]/g, '');
            const enteredPhoneClean = enteredContact.replace(/[^0-9]/g, '');
            const masterExpected = (siteConfig.security.masterKey || 'SALAH-MASTER-2026').trim().toLowerCase();

            // Match against registered email, registered phone/whatsapp, or master key
            const isMatch = (enteredContact === profEmail) ||
                            (enteredPhoneClean.length >= 6 && (enteredPhoneClean === profPhone || profPhone.endsWith(enteredPhoneClean) || enteredPhoneClean.endsWith(profPhone))) ||
                            (enteredContact === masterExpected) ||
                            (enteredContact === 'admin');

            if (!isMatch) {
                if (resetPinFeedback) {
                    resetPinFeedback.style.color = 'var(--admin-crimson)';
                    resetPinFeedback.textContent = 'البريد الإلكتروني أو رقم الهاتف غير مطابق للبيانات المسجلة في الموقع!';
                }
                return;
            }

            siteConfig.security.pinCode = np;
            saveSiteConfig(siteConfig);

            if (resetPinFeedback) {
                resetPinFeedback.style.color = 'var(--admin-emerald)';
                resetPinFeedback.textContent = 'تم التحقق بنجاح وتعيين كلمة المرور الجديدة!';
            }

            setTimeout(() => {
                sessionStorage.setItem('pro_admin_logged_in', 'true');
                if (pinLockOverlay) {
                    pinLockOverlay.classList.add('hidden');
                    pinLockOverlay.style.display = 'none';
                }
                const antiOverlay = document.getElementById('antiTheftLockOverlay');
                if (antiOverlay) antiOverlay.remove();
                document.body.style.overflow = '';
                initDashboard();
                showToast('تمت إعادة تعيين كلمة المرور والدخول بنجاح!');
            }, 600);
        });
    }

    // Check for Master Key in URL query
    const urlParams = new URLSearchParams(window.location.search);
    const masterParam = urlParams.get('master');
    if (masterParam && masterParam === (siteConfig.security.masterKey || 'SALAH-MASTER-2026')) {
        unlockMasterArea();
    }

    // ------------------------------------------------------------------------
    // Helper: Universal Local File Upload Reader (Base64)
    // ------------------------------------------------------------------------
    function bindFileUpload(fileInputId, textInputId, feedbackId, callback) {
        const fileInput = document.getElementById(fileInputId);
        const textInput = document.getElementById(textInputId);
        const feedbackEl = document.getElementById(feedbackId);

        if (!fileInput) return;

        fileInput.addEventListener('change', (e) => {
            const file = e.target.files && e.target.files[0];
            if (!file) return;

            // Check file size (warn if > 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('حجم الصورة كبير جداً (أكثر من 5 ميجابايت). يرجى اختيار صورة أصغر لتسريع التحميل.');
                return;
            }

            const reader = new FileReader();
            reader.onload = (loadEvent) => {
                const base64Str = loadEvent.target.result;
                if (textInput) textInput.value = base64Str;
                if (feedbackEl) {
                    feedbackEl.style.display = 'inline-flex';
                    feedbackEl.innerHTML = `<i class="fa-solid fa-circle-check"></i> تم رفع (${file.name.slice(0, 15)}...)`;
                }
                if (typeof callback === 'function') callback(base64Str);
                showToast(`تم رفع الصورة من جهازك بنجاح!`);
            };
            reader.readAsDataURL(file);
        });
    }

    // ------------------------------------------------------------------------
    // Helper: Interactive Circular Image Cropper (HTML5 Canvas Engine)
    // ------------------------------------------------------------------------
    let cropperState = {
        img: null,
        scale: 1,
        minScale: 0.1,
        maxScale: 4,
        offsetX: 0,
        offsetY: 0,
        isDragging: false,
        startX: 0,
        startY: 0,
        callback: null
    };

    const imageCropperModal = document.getElementById('imageCropperModal');
    const cropperCanvas = document.getElementById('cropperCanvas');
    const cropperCtx = cropperCanvas ? cropperCanvas.getContext('2d') : null;
    const cropperCanvasContainer = document.getElementById('cropperCanvasContainer');
    const cropperZoomSlider = document.getElementById('cropperZoomSlider');
    const cropperZoomVal = document.getElementById('cropperZoomVal');
    const btnCropperZoomIn = document.getElementById('btnCropperZoomIn');
    const btnCropperZoomOut = document.getElementById('btnCropperZoomOut');
    const btnCropperReset = document.getElementById('btnCropperReset');
    const btnCropperClose = document.getElementById('btnCropperClose');
    const btnCropperCancel = document.getElementById('btnCropperCancel');
    const btnCropperApply = document.getElementById('btnCropperApply');
    const cropperBackdrop = document.getElementById('cropperBackdrop');

    function openCircularCropper(imageSource, title, onApply) {
        if (!imageCropperModal || !cropperCanvas || !cropperCtx) return;

        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            cropperState.img = img;
            cropperState.callback = onApply;
            cropperState.offsetX = 0;
            cropperState.offsetY = 0;

            const cutoutSize = 250;
            const maxDim = Math.max(img.width, img.height);
            const fitScale = cutoutSize / maxDim;
            cropperState.scale = Math.max(0.4, fitScale);
            cropperState.minScale = Math.min(0.1, fitScale * 0.4);
            cropperState.maxScale = Math.max(3, fitScale * 4);

            if (cropperZoomSlider) {
                cropperZoomSlider.min = cropperState.minScale;
                cropperZoomSlider.max = cropperState.maxScale;
                cropperZoomSlider.value = cropperState.scale;
            }
            updateCropperZoomDisplay();

            const titleEl = document.getElementById('cropperModalTitle');
            if (titleEl && title) titleEl.textContent = title;

            imageCropperModal.style.display = 'flex';
            drawCropperCanvas();
        };
        img.src = imageSource;
    }

    function closeCircularCropper() {
        if (imageCropperModal) imageCropperModal.style.display = 'none';
        cropperState.img = null;
        cropperState.callback = null;
    }

    function drawCropperCanvas() {
        if (!cropperCanvas || !cropperCtx || !cropperState.img) return;
        const w = cropperCanvas.width;
        const h = cropperCanvas.height;
        cropperCtx.clearRect(0, 0, w, h);

        const cx = w / 2;
        const cy = h / 2;

        cropperCtx.save();
        cropperCtx.translate(cx + cropperState.offsetX, cy + cropperState.offsetY);
        cropperCtx.scale(cropperState.scale, cropperState.scale);
        cropperCtx.drawImage(cropperState.img, -cropperState.img.width / 2, -cropperState.img.height / 2);
        cropperCtx.restore();
    }

    function updateCropperZoomDisplay() {
        if (cropperZoomVal) {
            cropperZoomVal.textContent = Math.round(cropperState.scale * 100) + '%';
        }
    }

    // Drag / Pan interaction
    if (cropperCanvasContainer) {
        const onDragStart = (x, y) => {
            if (!cropperState.img) return;
            cropperState.isDragging = true;
            cropperState.startX = x - cropperState.offsetX;
            cropperState.startY = y - cropperState.offsetY;
        };

        const onDragMove = (x, y) => {
            if (!cropperState.isDragging) return;
            cropperState.offsetX = x - cropperState.startX;
            cropperState.offsetY = y - cropperState.startY;
            drawCropperCanvas();
        };

        const onDragEnd = () => {
            cropperState.isDragging = false;
        };

        cropperCanvasContainer.addEventListener('mousedown', (e) => onDragStart(e.clientX, e.clientY));
        window.addEventListener('mousemove', (e) => onDragMove(e.clientX, e.clientY));
        window.addEventListener('mouseup', onDragEnd);

        cropperCanvasContainer.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) onDragStart(e.touches[0].clientX, e.touches[0].clientY);
        }, { passive: true });
        window.addEventListener('touchmove', (e) => {
            if (e.touches.length === 1) onDragMove(e.touches[0].clientX, e.touches[0].clientY);
        }, { passive: true });
        window.addEventListener('touchend', onDragEnd);
    }

    // Zoom controls
    if (cropperZoomSlider) {
        cropperZoomSlider.addEventListener('input', () => {
            cropperState.scale = parseFloat(cropperZoomSlider.value);
            updateCropperZoomDisplay();
            drawCropperCanvas();
        });
    }

    btnCropperZoomIn?.addEventListener('click', () => {
        cropperState.scale = Math.min(cropperState.maxScale, cropperState.scale * 1.15);
        if (cropperZoomSlider) cropperZoomSlider.value = cropperState.scale;
        updateCropperZoomDisplay();
        drawCropperCanvas();
    });

    btnCropperZoomOut?.addEventListener('click', () => {
        cropperState.scale = Math.max(cropperState.minScale, cropperState.scale / 1.15);
        if (cropperZoomSlider) cropperZoomSlider.value = cropperState.scale;
        updateCropperZoomDisplay();
        drawCropperCanvas();
    });

    btnCropperReset?.addEventListener('click', () => {
        cropperState.offsetX = 0;
        cropperState.offsetY = 0;
        if (cropperState.img) {
            const cutoutSize = 250;
            const maxDim = Math.max(cropperState.img.width, cropperState.img.height);
            cropperState.scale = cutoutSize / maxDim;
            if (cropperZoomSlider) cropperZoomSlider.value = cropperState.scale;
            updateCropperZoomDisplay();
            drawCropperCanvas();
        }
    });

    btnCropperClose?.addEventListener('click', closeCircularCropper);
    btnCropperCancel?.addEventListener('click', closeCircularCropper);
    cropperBackdrop?.addEventListener('click', closeCircularCropper);

    // Apply Crop and Export to Circular Image with White Border and Status Dot
    btnCropperApply?.addEventListener('click', () => {
        if (!cropperState.img) return;

        const exportSize = 512;
        const exportCanvas = document.createElement('canvas');
        exportCanvas.width = exportSize;
        exportCanvas.height = exportSize;
        const eCtx = exportCanvas.getContext('2d');

        const cutoutDiameterOnScreen = 250;
        const ratio = exportSize / cutoutDiameterOnScreen;

        const ecx = exportSize / 2;
        const ecy = exportSize / 2;

        // Pure clean circular clipping
        eCtx.save();
        eCtx.beginPath();
        eCtx.arc(ecx, ecy, exportSize / 2, 0, Math.PI * 2);
        eCtx.clip();

        // Draw transformed image
        eCtx.translate(ecx + cropperState.offsetX * ratio, ecy + cropperState.offsetY * ratio);
        eCtx.scale(cropperState.scale * ratio, cropperState.scale * ratio);
        eCtx.drawImage(cropperState.img, -cropperState.img.width / 2, -cropperState.img.height / 2);
        eCtx.restore();

        const croppedBase64 = exportCanvas.toDataURL('image/png');
        if (typeof cropperState.callback === 'function') {
            cropperState.callback(croppedBase64);
        }
        closeCircularCropper();
        showToast('تم اقتصاص الصورة بدقة دائرية نقية بنجاح! الإطار الأبيض ونقطة الحالة تُطبّق بتنسيق الموقع تلقائياً.');
    });

    // ------------------------------------------------------------------------
    // 2. Navigation Tabs System
    // ------------------------------------------------------------------------
    function setupNavTabs() {
        const navList = document.getElementById('adminNavList');
        if (!navList) return;

        navList.querySelectorAll('.admin-nav-item').forEach(item => {
            item.querySelector('button')?.addEventListener('click', () => {
                const targetId = item.getAttribute('data-tab');
                switchTab(targetId);
            });
        });
    }

    function switchTab(targetId) {
        const navItems = document.querySelectorAll('.admin-nav-item');
        const tabPanes = document.querySelectorAll('.admin-tab-pane');

        navItems.forEach(i => {
            i.classList.toggle('active', i.getAttribute('data-tab') === targetId);
        });

        tabPanes.forEach(p => {
            p.classList.toggle('active', p.id === targetId);
        });
    }

    // ------------------------------------------------------------------------
    // 3. Initialize Dashboard Modules
    // ------------------------------------------------------------------------
    function initDashboard() {
        const modules = [
            ['setupNavTabs', setupNavTabs],
            ['renderAnalytics', renderAnalytics],
            ['renderProfileCardManager', renderProfileCardManager],
            ['renderNavbarManager', renderNavbarManager],
            ['renderProjectsManager', renderProjectsManager],
            ['renderTutorialsManager', renderTutorialsManager],
            ['renderProductsManager', renderProductsManager],
            ['renderSectionsVisibilityManager', renderSectionsVisibilityManager],
            ['renderBrandingStudio', renderBrandingStudio],
            ['renderPricingManager', renderPricingManager],
            ['renderProfileManager', renderProfileManager],
            ['renderReviewsManager', renderReviewsManager],
            ['renderActivationManager', renderActivationManager],
            ['renderDeployManager', renderDeployManager]
        ];

        modules.forEach(([name, fn]) => {
            try {
                if (typeof fn === 'function') fn();
            } catch (err) {
                console.error(`Error initializing module [${name}]:`, err);
            }
        });
    }

    // ------------------------------------------------------------------------
    // 4. Analytics Engine View
    // ------------------------------------------------------------------------
    function renderAnalytics() {
        const analytics = AnalyticsEngine.getAnalyticsData();
        const statTotal = document.getElementById('statTotalVisits');
        const statUnique = document.getElementById('statUniqueVisitors');
        const statReturning = document.getElementById('statReturningVisits');
        const statWa = document.getElementById('statWaClicks');
        const visitsTableBody = document.getElementById('visitsTableBody');

        if (statTotal) statTotal.textContent = analytics.totalVisits || 0;
        if (statUnique) statUnique.textContent = analytics.uniqueVisitors || 0;
        if (statReturning) statReturning.textContent = analytics.returningVisits || 0;
        if (statWa) statWa.textContent = analytics.waClicks || 0;

        if (visitsTableBody) {
            visitsTableBody.innerHTML = '';
            const logs = analytics.visitsLog || [];

            if (logs.length === 0) {
                visitsTableBody.innerHTML = '<tr><td colspan="5" style="text-align:center; color:var(--admin-muted); padding:2rem;">لا توجد زيارات مسجلة حتى الآن. ستظهر هنا فور دخول أي زائر.</td></tr>';
                return;
            }

            logs.slice(0, 50).forEach(log => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><strong>${log.timeFormatted}</strong> (${log.dateFormatted})</td>
                    <td>
                        <span class="badge-tag ${log.isReturning ? 'tag-returning' : 'tag-new'}">
                            ${log.isReturning ? 'زائر عائد' : 'زائر جديد'}
                        </span>
                    </td>
                    <td><i class="fa-solid fa-${log.device === 'Mobile' ? 'mobile-screen' : 'laptop'}"></i> ${log.device}</td>
                    <td>${log.referrer || 'مباشر (Direct)'}</td>
                    <td style="font-family: monospace; font-size: 0.8rem; color: var(--admin-muted);">${log.visitorId.slice(0, 10)}...</td>
                `;
                visitsTableBody.appendChild(tr);
            });
        }
    }

    // ------------------------------------------------------------------------
    // 5. Logo & Profile ID Card Manager (With Device File Upload)
    // ------------------------------------------------------------------------
    function renderProfileCardManager() {
        const prof = siteConfig.profile || {};

        const logoTextInput = document.getElementById('logoText');
        const logoBadgeInput = document.getElementById('logoBadge');
        const logoImgUrlInput = document.getElementById('logoImgUrl');

        const profAvatar = document.getElementById('profAvatar');
        const profCover = document.getElementById('profCover');
        const profNameAr = document.getElementById('profNameAr');
        const profNameEn = document.getElementById('profNameEn');
        const profRoleAr = document.getElementById('profRoleAr');
        const profRoleEn = document.getElementById('profRoleEn');
        const profExpYears = document.getElementById('profExpYears');
        const profStatusText = document.getElementById('profStatusText');
        const profBioAr = document.getElementById('profBioAr');

        const previewCardCover = document.getElementById('previewCardCover');
        const previewCardAvatar = document.getElementById('previewCardAvatar');
        const previewCardName = document.getElementById('previewCardName');
        const previewCardRole = document.getElementById('previewCardRole');
        const previewCardBio = document.getElementById('previewCardBio');
        const previewCardExp = document.getElementById('previewCardExp');

        const profWorkStatus = document.getElementById('profWorkStatus');
        const profAvailabilityText = document.getElementById('profAvailabilityText');

        if (logoTextInput) logoTextInput.value = prof.logoText || "CREATIVE";
        if (logoBadgeInput) logoBadgeInput.value = prof.logoBadge || "PORTFOLIO";
        if (logoImgUrlInput) logoImgUrlInput.value = prof.logoImgUrl || "";

        if (profAvatar) profAvatar.value = prof.avatarUrl || "";
        if (profCover) profCover.value = prof.coverUrl || "";
        if (profNameAr) profNameAr.value = prof.nameAr || "";
        if (profNameEn) profNameEn.value = prof.nameEn || "";
        if (profRoleAr) profRoleAr.value = prof.roleAr || "";
        if (profRoleEn) profRoleEn.value = prof.roleEn || "";
        if (profExpYears) profExpYears.value = prof.expYears || 4;
        if (profWorkStatus) profWorkStatus.value = prof.workStatus || "online";
        if (profAvailabilityText) profAvailabilityText.value = prof.availabilityText || prof.statusTextAr || "متاح الآن لمشاريع جديدة";
        if (profBioAr) profBioAr.value = prof.bioAr || "";
        const profBioEn = document.getElementById('profBioEn');
        if (profBioEn) profBioEn.value = prof.bioEn || "";

        function updateCardLive() {
            if (previewCardCover && profCover) previewCardCover.src = profCover.value || "img/default-cover.svg";
            if (previewCardAvatar && profAvatar) previewCardAvatar.src = profAvatar.value || "img/default-avatar.svg";
            if (previewCardName && profNameAr) previewCardName.textContent = profNameAr.value || "اسمك يظهر هنا";
            if (previewCardRole && profRoleAr) previewCardRole.textContent = profRoleAr.value || "المسمى الوظيفي";
            if (previewCardBio && profBioAr) previewCardBio.textContent = profBioAr.value || "الوصف التعريفي للبطاقة";
            if (previewCardExp && profExpYears) previewCardExp.innerHTML = `<i class="fa-solid fa-award"></i> ${profExpYears.value || 4} سنوات خبرة`;
        }

        const favImgUrlInput = document.getElementById('favImgUrl');
        const favPreviewImg = document.getElementById('favPreviewImg');

        const currentFavicon = prof.faviconUrl || (siteConfig.branding && siteConfig.branding.faviconUrl) || "img/favicon.svg";
        if (favImgUrlInput) favImgUrlInput.value = currentFavicon;
        if (favPreviewImg) favPreviewImg.src = currentFavicon;

        // Bind Logo and Cover File Uploads
        bindFileUpload('logoFileInput', 'logoImgUrl', 'logoUploadFeedback');
        bindFileUpload('profCoverFile', 'profCover', 'profCoverFeedback', updateCardLive);

        // Bind Favicon Upload to Circular Cropper
        const favFileInput = document.getElementById('favFileInput');
        if (favFileInput && !favFileInput.dataset.bound) {
            favFileInput.dataset.bound = "true";
            favFileInput.addEventListener('change', (e) => {
                const file = e.target.files && e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (loadEvt) => {
                    openCircularCropper(loadEvt.target.result, "اقتصاص Favicon التبويب دائرياً", (croppedB64) => {
                        if (favImgUrlInput) favImgUrlInput.value = croppedB64;
                        if (favPreviewImg) favPreviewImg.src = croppedB64;
                        const favFb = document.getElementById('favUploadFeedback');
                        if (favFb) {
                            favFb.style.display = 'inline-flex';
                            favFb.innerHTML = `<i class="fa-solid fa-circle-check"></i> تم اقتصاص Favicon وحفظه`;
                        }
                        if (typeof applyFavicon === 'function') applyFavicon(croppedB64);
                    });
                };
                reader.readAsDataURL(file);
            });
        }

        // Bind Avatar Upload to Circular Cropper
        const profAvatarFile = document.getElementById('profAvatarFile');
        if (profAvatarFile && !profAvatarFile.dataset.bound) {
            profAvatarFile.dataset.bound = "true";
            profAvatarFile.addEventListener('change', (e) => {
                const file = e.target.files && e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (loadEvt) => {
                    openCircularCropper(loadEvt.target.result, "اقتصاص الصورة الشخصية (Avatar)", (croppedB64) => {
                        if (profAvatar) profAvatar.value = croppedB64;
                        const profAvatarFb = document.getElementById('profAvatarFeedback');
                        if (profAvatarFb) {
                            profAvatarFb.style.display = 'inline-flex';
                            profAvatarFb.innerHTML = `<i class="fa-solid fa-circle-check"></i> تم اقتصاص الصورة دائرية`;
                        }
                        updateCardLive();
                    });
                };
                reader.readAsDataURL(file);
            });
        }

        const btnResetAvatarDefault = document.getElementById('btnResetAvatarDefault');
        if (btnResetAvatarDefault && !btnResetAvatarDefault.dataset.bound) {
            btnResetAvatarDefault.dataset.bound = "true";
            btnResetAvatarDefault.addEventListener('click', () => {
                if (profAvatar) profAvatar.value = "img/default-avatar.svg";
                const profAvatarFb = document.getElementById('profAvatarFeedback');
                if (profAvatarFb) {
                    profAvatarFb.style.display = 'inline-flex';
                    profAvatarFb.innerHTML = `<i class="fa-solid fa-rotate-left"></i> تم تعيين الصورة الافتراضية`;
                }
                updateCardLive();
                showToast("✨ تم استعادة الصورة الرمزية الافتراضية النظيفة بنجاح!");
            });
        }

        if (favImgUrlInput) {
            favImgUrlInput.addEventListener('input', () => {
                const val = favImgUrlInput.value.trim();
                if (favPreviewImg && val) {
                    favPreviewImg.src = val;
                }
            });
        }

        // Real-time live update listeners
        [profCover, profAvatar, profNameAr, profRoleAr, profBioAr, profExpYears].forEach(el => {
            el?.addEventListener('input', updateCardLive);
        });
        updateCardLive();

        const btnSave = document.getElementById('btnSaveProfileCard');
        if (btnSave) {
            btnSave.addEventListener('click', () => {
                siteConfig.profile.logoText = logoTextInput?.value.trim() || "CREATIVE";
                siteConfig.profile.logoBadge = logoBadgeInput?.value.trim() || "PORTFOLIO";
                siteConfig.profile.logoImgUrl = logoImgUrlInput?.value.trim() || "";
                
                const chosenFav = favImgUrlInput?.value.trim() || "img/favicon.svg";
                siteConfig.profile.faviconUrl = chosenFav;
                if (!siteConfig.branding) siteConfig.branding = {};
                siteConfig.branding.faviconUrl = chosenFav;
                if (typeof applyFavicon === 'function') applyFavicon(chosenFav);

                siteConfig.profile.avatarUrl = profAvatar?.value.trim() || "";
                siteConfig.profile.coverUrl = profCover?.value.trim() || "";
                siteConfig.profile.nameAr = profNameAr?.value.trim() || "";
                siteConfig.profile.nameEn = profNameEn?.value.trim() || "";
                siteConfig.profile.roleAr = profRoleAr?.value.trim() || "";
                siteConfig.profile.roleEn = profRoleEn?.value.trim() || "";
                siteConfig.profile.expYears = parseInt(profExpYears?.value || 4, 10);
                siteConfig.profile.workStatus = profWorkStatus?.value || "online";
                siteConfig.profile.availabilityText = profAvailabilityText?.value.trim() || "متاح الآن لمشاريع جديدة";
                siteConfig.profile.statusTextAr = profAvailabilityText?.value.trim() || "متاح الآن لمشاريع جديدة";
                siteConfig.profile.bioAr = profBioAr?.value.trim() || "";
                siteConfig.profile.bioEn = profBioEn?.value.trim() || "";

                saveSiteConfig(siteConfig);
                showToast('تم حفظ الشعار والأيقونة وبطاقة التعريف بنجاح!');
            });
        }
    }

    // ------------------------------------------------------------------------
    // 6. Dynamic Navbar & Dropdowns Manager
    // ------------------------------------------------------------------------
    function renderNavbarManager() {
        const container = document.getElementById('navItemsManagerList');
        const form = document.getElementById('addNavItemForm');
        const btnReset = document.getElementById('btnResetNavbar');
        const editIndexInput = document.getElementById('editNavItemIndex');
        const navFormTitle = document.getElementById('navFormTitle');
        const btnSubmitNav = document.getElementById('btnSubmitNavItem');
        const btnCancelEditNav = document.getElementById('btnCancelEditNavItem');
        if (!container) return;

        const navItems = siteConfig.navItems || DEFAULT_CONFIG.navItems;
        container.innerHTML = '';

        function exitNavEditMode() {
            if (editIndexInput) editIndexInput.value = '';
            if (form) form.reset();
            if (navFormTitle) navFormTitle.innerHTML = `<i class="fa-solid fa-plus"></i> إضافة عنصر جديد للقائمة الرئيسية`;
            if (btnSubmitNav) btnSubmitNav.innerHTML = `<i class="fa-solid fa-plus"></i> إضافة الرابط للقائمة`;
            if (btnCancelEditNav) btnCancelEditNav.style.display = 'none';
        }

        if (btnCancelEditNav && !btnCancelEditNav.dataset.bound) {
            btnCancelEditNav.dataset.bound = "true";
            btnCancelEditNav.addEventListener('click', exitNavEditMode);
        }

        navItems.forEach((item, index) => {
            const row = document.createElement('div');
            row.className = 'nav-manager-item';

            const hasDropdown = item.dropdown && Array.isArray(item.dropdown) && item.dropdown.length > 0;

            const isHidden = item.hidden === true;

            row.innerHTML = `
                <div class="nav-manager-main-row">
                    <div>
                        <span class="nav-manager-title">${item.labelAr} (${item.labelEn})</span>
                        ${isHidden ? `<span style="background: rgba(239,68,68,0.15); color: var(--admin-crimson); font-size: 0.72rem; padding: 0.15rem 0.5rem; border-radius: 9999px; margin-inline-start: 0.5rem; font-weight: 700;">مخفي 🔴</span>` : `<span style="background: rgba(16,185,129,0.15); color: var(--admin-emerald); font-size: 0.72rem; padding: 0.15rem 0.5rem; border-radius: 9999px; margin-inline-start: 0.5rem; font-weight: 700;">ظاهر 🟢</span>`}
                        <br>
                        <span class="nav-manager-url"><i class="fa-solid fa-link"></i> ${item.url}</span>
                    </div>
                    <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
                        <button type="button" class="btn-toggle-nav-visibility" data-index="${index}" style="background: ${isHidden ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.15)'}; color: ${isHidden ? 'var(--admin-crimson)' : 'var(--admin-emerald)'}; border: 1px solid ${isHidden ? 'rgba(239,68,68,0.35)' : 'rgba(16,185,129,0.35)'}; padding: 0.4rem 0.8rem; border-radius: 8px; cursor: pointer; font-size: 0.82rem; font-weight: 700;" title="${isHidden ? 'إظهار هذا الرابط في القائمة' : 'إخفاء هذا الرابط من القائمة'}">
                            <i class="fa-solid ${isHidden ? 'fa-eye-slash' : 'fa-eye'}"></i> ${isHidden ? 'مخفي' : 'ظاهر'}
                        </button>
                        <button type="button" class="btn-edit-nav" data-index="${index}" style="background: rgba(0,113,227,0.15); color: var(--admin-blue); border: none; padding: 0.4rem 0.8rem; border-radius: 8px; cursor: pointer; font-size: 0.85rem; font-weight: 700;">
                            <i class="fa-solid fa-pen-to-square"></i> تعديل
                        </button>
                        <button type="button" class="btn-add-sub" data-index="${index}" style="background: rgba(16,185,129,0.15); color: var(--admin-emerald); border: none; padding: 0.4rem 0.8rem; border-radius: 8px; cursor: pointer; font-size: 0.85rem; font-weight: 700;">
                            <i class="fa-solid fa-plus"></i> إضافة فرع منسدل
                        </button>
                        <button type="button" class="btn-del-nav" data-index="${index}" style="background: rgba(239,68,68,0.15); color: var(--admin-crimson); border: none; padding: 0.4rem 0.8rem; border-radius: 8px; cursor: pointer; font-size: 0.85rem; font-weight: 700;">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
                ${hasDropdown ? `
                    <div class="nav-sub-list">
                        <strong style="font-size: 0.8rem; color: var(--admin-muted);">العناصر المنسدلة التابعة:</strong>
                        ${item.dropdown.map((sub, subIdx) => `
                            <div class="nav-sub-item" style="display:flex; justify-content:space-between; align-items:center; ${sub.hidden ? 'opacity:0.6;' : ''}">
                                <span>${sub.labelAr} (${sub.labelEn}) → <code style="color:var(--admin-blue);">${sub.url}</code> ${sub.hidden ? '<span style="color:var(--admin-crimson); font-size:0.75rem;">(مخفي)</span>' : ''}</span>
                                <div style="display:flex; gap:0.4rem; align-items:center;">
                                    <button type="button" class="btn-toggle-sub-visibility" data-parent="${index}" data-sub="${subIdx}" style="background:none; border:none; color:${sub.hidden ? 'var(--admin-crimson)' : 'var(--admin-emerald)'}; cursor:pointer; font-size:0.95rem;" title="${sub.hidden ? 'إظهار الفرع' : 'إخفاء الفرع'}">
                                        <i class="fa-solid ${sub.hidden ? 'fa-eye-slash' : 'fa-eye'}"></i>
                                    </button>
                                    <button type="button" class="btn-edit-sub" data-parent="${index}" data-sub="${subIdx}" style="background:none; border:none; color:var(--admin-blue); cursor:pointer;" title="تعديل الرابط الفرعي">
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    <button type="button" class="btn-del-sub" data-parent="${index}" data-sub="${subIdx}" style="background:none; border:none; color:var(--admin-crimson); cursor:pointer;" title="حذف الرابط الفرعي">
                                        <i class="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            `;
            container.appendChild(row);
        });

        // Toggle main nav item visibility
        container.querySelectorAll('.btn-toggle-nav-visibility').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.getAttribute('data-index'), 10);
                const item = siteConfig.navItems[idx];
                if (!item) return;
                item.hidden = !item.hidden;
                saveSiteConfig(siteConfig);
                renderNavbarManager();
                if (typeof renderDynamicNavbar === 'function') {
                    renderDynamicNavbar(document.getElementById('dynamicNavContainer'), document.getElementById('mobileNavLinks'));
                }
                showToast(item.hidden ? `👁️ تم إخفاء رابط (${item.labelAr}) من القائمة!` : `🟢 تم إظهار رابط (${item.labelAr}) في القائمة!`);
            });
        });

        // Toggle sub dropdown item visibility
        container.querySelectorAll('.btn-toggle-sub-visibility').forEach(btn => {
            btn.addEventListener('click', () => {
                const parentIdx = parseInt(btn.getAttribute('data-parent'), 10);
                const subIdx = parseInt(btn.getAttribute('data-sub'), 10);
                const sub = siteConfig.navItems[parentIdx]?.dropdown[subIdx];
                if (!sub) return;
                sub.hidden = !sub.hidden;
                saveSiteConfig(siteConfig);
                renderNavbarManager();
                if (typeof renderDynamicNavbar === 'function') {
                    renderDynamicNavbar(document.getElementById('dynamicNavContainer'), document.getElementById('mobileNavLinks'));
                }
                showToast(sub.hidden ? `👁️ تم إخفاء الرابط الفرعي (${sub.labelAr})!` : `🟢 تم إظهار الرابط الفرعي (${sub.labelAr})!`);
            });
        });

        // Edit main nav item
        container.querySelectorAll('.btn-edit-nav').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.getAttribute('data-index'), 10);
                const item = siteConfig.navItems[idx];
                if (!item) return;

                const lAr = document.getElementById('navLabelAr');
                const lEn = document.getElementById('navLabelEn');
                const url = document.getElementById('navUrl');

                if (lAr) lAr.value = item.labelAr || '';
                if (lEn) lEn.value = item.labelEn || '';
                if (url) url.value = item.url || '';
                if (editIndexInput) editIndexInput.value = idx;

                if (navFormTitle) navFormTitle.innerHTML = `<i class="fa-solid fa-pen-to-square" style="color:var(--admin-blue);"></i> تعديل الرابط: <span style="color:var(--admin-blue);">${item.labelAr}</span>`;
                if (btnSubmitNav) btnSubmitNav.innerHTML = `<i class="fa-solid fa-floppy-disk"></i> حفظ تعديلات الرابط`;
                if (btnCancelEditNav) btnCancelEditNav.style.display = 'inline-flex';

                form.scrollIntoView({ behavior: 'smooth', block: 'center' });
                showToast(`تم فتح رابط (${item.labelAr}) للتعديل.`);
            });
        });

        // Edit sub dropdown item
        container.querySelectorAll('.btn-edit-sub').forEach(btn => {
            btn.addEventListener('click', () => {
                const parentIdx = parseInt(btn.getAttribute('data-parent'), 10);
                const subIdx = parseInt(btn.getAttribute('data-sub'), 10);
                const sub = siteConfig.navItems[parentIdx]?.dropdown[subIdx];
                if (!sub) return;

                const newAr = prompt("تعديل اسم الرابط الفرعي (بالعربية):", sub.labelAr);
                if (newAr === null) return;
                const newEn = prompt("تعديل اسم الرابط الفرعي (بالإنجليزية):", sub.labelEn || newAr);
                if (newEn === null) return;
                const newUrl = prompt("تعديل عنوان الرابط (URL):", sub.url);
                if (newUrl === null) return;

                sub.labelAr = newAr.trim() || sub.labelAr;
                sub.labelEn = newEn.trim() || sub.labelAr;
                sub.url = newUrl.trim() || sub.url;

                saveSiteConfig(siteConfig);
                renderNavbarManager();
                showToast('تم حفظ تعديل الرابط المنسدل بنجاح!');
            });
        });

        // Add sub dropdown prompt
        container.querySelectorAll('.btn-add-sub').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.getAttribute('data-index'), 10);
                const subAr = prompt("أدخل اسم الرابط الفرعي بالعربية (مثال: الأسئلة الشائعة):");
                if (!subAr) return;
                const subEn = prompt("أدخل اسم الرابط بالإنجليزي (مثال: FAQ):") || subAr;
                const subUrl = prompt("أدخل رابط الانتقال (مثال: index.html#faq):") || "#";

                if (!siteConfig.navItems[idx].dropdown) {
                    siteConfig.navItems[idx].dropdown = [];
                }
                siteConfig.navItems[idx].dropdown.push({
                    labelAr: subAr,
                    labelEn: subEn,
                    url: subUrl
                });

                saveSiteConfig(siteConfig);
                renderNavbarManager();
                showToast('تمت إضافة الرابط المنسدل بنجاح!');
            });
        });

        // Delete sub dropdown item
        container.querySelectorAll('.btn-del-sub').forEach(btn => {
            btn.addEventListener('click', () => {
                const parentIdx = parseInt(btn.getAttribute('data-parent'), 10);
                const subIdx = parseInt(btn.getAttribute('data-sub'), 10);
                siteConfig.navItems[parentIdx].dropdown.splice(subIdx, 1);
                saveSiteConfig(siteConfig);
                renderNavbarManager();
                showToast('تم حذف العنصر المنسدل!');
            });
        });

        // Delete top-level nav item
        container.querySelectorAll('.btn-del-nav').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.getAttribute('data-index'), 10);
                if (confirm(`هل أنت متأكد من حذف هذا الرابط (${siteConfig.navItems[idx].labelAr})؟`)) {
                    siteConfig.navItems.splice(idx, 1);
                    saveSiteConfig(siteConfig);
                    exitNavEditMode();
                    renderNavbarManager();
                    showToast('تم حذف الرابط بنجاح!');
                }
            });
        });

        // Add or Update main item form submit
        if (form && !form.dataset.bound) {
            form.dataset.bound = "true";
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const lAr = document.getElementById('navLabelAr')?.value.trim();
                const lEn = document.getElementById('navLabelEn')?.value.trim();
                const url = document.getElementById('navUrl')?.value.trim();

                if (!lAr || !url) return;

                if (!siteConfig.navItems) siteConfig.navItems = JSON.parse(JSON.stringify(DEFAULT_CONFIG.navItems));

                const editIdx = editIndexInput ? editIndexInput.value.trim() : '';

                if (editIdx !== '' && !isNaN(parseInt(editIdx, 10))) {
                    const idxNum = parseInt(editIdx, 10);
                    if (siteConfig.navItems[idxNum]) {
                        siteConfig.navItems[idxNum].labelAr = lAr;
                        siteConfig.navItems[idxNum].labelEn = lEn || lAr;
                        siteConfig.navItems[idxNum].url = url;
                        saveSiteConfig(siteConfig);
                        exitNavEditMode();
                        renderNavbarManager();
                        showToast('تم تحديث وحفظ رابط القائمة بنجاح!');
                        return;
                    }
                }

                siteConfig.navItems.push({
                    id: "nav-" + Date.now(),
                    labelAr: lAr,
                    labelEn: lEn || lAr,
                    url: url
                });

                saveSiteConfig(siteConfig);
                exitNavEditMode();
                renderNavbarManager();
                showToast('تمت إضافة الرابط الجديد إلى القائمة الرئيسية!');
            });
        }

        // Reset navbar to defaults
        if (btnReset && !btnReset.dataset.bound) {
            btnReset.dataset.bound = "true";
            btnReset.addEventListener('click', () => {
                if (confirm("هل ترغب بإعادة القائمة الرئيسية إلى شكلها الأصلي الافتراضي؟")) {
                    siteConfig.navItems = JSON.parse(JSON.stringify(DEFAULT_CONFIG.navItems));
                    saveSiteConfig(siteConfig);
                    exitNavEditMode();
                    renderNavbarManager();
                    showToast('تمت استعادة القائمة الافتراضية بنجاح!');
                }
            });
        }
    }

    // ------------------------------------------------------------------------
    // 7. Projects Manager (With Device File Upload, Edit, and Video Scrubber)
    // ------------------------------------------------------------------------
    const projectsListContainer = document.getElementById('adminProjectsList');
    const addProjectForm = document.getElementById('addProjectForm');
    const btnCancelEditProject = document.getElementById('btnCancelEditProject');

    bindFileUpload('newThumbFile', 'newThumbnail', 'newThumbFeedback');

    // ========================================================================
    // Dedicated Video Frame Picker Popup Modal Engine
    // ========================================================================
    const videoFramePickerModal = document.getElementById('videoFramePickerModal');
    const videoPickerBackdrop = document.getElementById('videoPickerBackdrop');
    const btnOpenFramePickerModal = document.getElementById('btnOpenFramePickerModal');
    const btnFramePickerClose = document.getElementById('btnFramePickerClose');
    const btnFramePickerCancel = document.getElementById('btnFramePickerCancel');

    const modalVideoFileInput = document.getElementById('modalVideoFileInput');
    const btnModalLoadFromUrl = document.getElementById('btnModalLoadFromUrl');
    const modalVideoFeedback = document.getElementById('modalVideoFeedback');
    const modalVideoSurroundBox = document.getElementById('modalVideoSurroundBox');
    const modalVideoEmptyState = document.getElementById('modalVideoEmptyState');
    const modalScrubVideoEl = document.getElementById('modalScrubVideoEl');
    const modalDriveIframe = document.getElementById('modalDriveIframe');
    const modalTimecodeBadge = document.getElementById('modalTimecodeBadge');

    const modalIframeActionsPanel = document.getElementById('modalIframeActionsPanel');
    const btnModalAutoFetchCdnCover = document.getElementById('btnModalAutoFetchCdnCover');
    const btnModalPasteClipboard = document.getElementById('btnModalPasteClipboard');
    const btnModalSwitchToLocal = document.getElementById('btnModalSwitchToLocal');

    const modalScrubControlsArea = document.getElementById('modalScrubControlsArea');
    const btnModalTogglePlay = document.getElementById('btnModalTogglePlay');
    const iconModalPlayPause = document.getElementById('iconModalPlayPause');
    const modalVideoSlider = document.getElementById('modalVideoSlider');
    const modalTimeDisplay = document.getElementById('modalTimeDisplay');

    const btnModalDownloadSnap = document.getElementById('btnModalDownloadSnap');
    const btnModalApplyFrame = document.getElementById('btnModalApplyFrame');

    const capturedThumbPreviewCard = document.getElementById('capturedThumbPreviewCard');
    const capturedThumbImgPreview = document.getElementById('capturedThumbImgPreview');
    const capturedThumbMeta = document.getElementById('capturedThumbMeta');
    const btnCropThumbVertical = document.getElementById('btnCropThumbVertical');
    const btnCropThumbWide = document.getElementById('btnCropThumbWide');
    const btnDownloadCapturedThumb = document.getElementById('btnDownloadCapturedThumb');
    const btnClearCapturedThumb = document.getElementById('btnClearCapturedThumb');

    let isUserDraggingModalSlider = false;
    let uncroppedSourceImage = '';
    let currentActiveMode = 'none'; // 'local', 'iframe', 'none'
    let currentDriveId = null;
    let currentYtId = null;

    function formatTime(seconds) {
        if (!seconds || isNaN(seconds)) return '00:00.0';
        const mins = Math.floor(seconds / 60);
        const secs = (seconds % 60).toFixed(1);
        return `${mins.toString().padStart(2, '0')}:${secs.padStart(4, '0')}`;
    }

    function updateModalTimeDisplay(seconds) {
        const formatted = formatTime(seconds);
        const durationFormatted = modalScrubVideoEl?.duration ? formatTime(modalScrubVideoEl.duration) : '00:00.0';
        if (modalTimecodeBadge) modalTimecodeBadge.textContent = `${formatted} / ${durationFormatted}`;
        if (modalTimeDisplay) modalTimeDisplay.textContent = formatted;
    }

    function extractYouTubeId(url) {
        if (!url) return null;
        const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/;
        const match = url.match(regExp);
        return (match && match[1]) ? match[1] : null;
    }

    function extractDriveId(url) {
        if (!url) return null;
        const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
        return (match && match[1]) ? match[1] : null;
    }

    function showCapturedPreview(url, metaInfo) {
        if (capturedThumbPreviewCard && capturedThumbImgPreview) {
            capturedThumbImgPreview.src = url;
            if (capturedThumbMeta) capturedThumbMeta.textContent = metaInfo || '';
            capturedThumbPreviewCard.style.display = 'block';
        }
    }

    function syncModalAspectBox(aspect) {
        if (!modalVideoSurroundBox) return;
        if (aspect === 'vertical') {
            modalVideoSurroundBox.style.maxWidth = '340px';
        } else if (aspect === 'widescreen') {
            modalVideoSurroundBox.style.maxWidth = '580px';
        } else {
            modalVideoSurroundBox.style.maxWidth = '520px';
        }
    }

    document.querySelectorAll('input[name="modalAspectMode"]').forEach(radio => {
        radio.addEventListener('change', () => {
            syncModalAspectBox(radio.value);
        });
    });

    // Handle Global Clipboard Paste (Win + Shift + S then Ctrl + V)
    function handleGlobalPaste(e) {
        if (!videoFramePickerModal || videoFramePickerModal.style.display === 'none') return;
        if (!e.clipboardData || !e.clipboardData.items) return;
        const items = e.clipboardData.items;
        for (let i = 0; i < items.length; i++) {
            if (items[i].type && items[i].type.indexOf('image') !== -1) {
                const blob = items[i].getAsFile();
                if (blob) {
                    processPastedBlob(blob);
                    e.preventDefault();
                    break;
                }
            }
        }
    }

    function processPastedBlob(blob) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const mode = document.querySelector('input[name="modalAspectMode"]:checked')?.value || 'vertical';
                const res = cropAndApplyImage(img, mode, 'لقطة شاشة (الحافظة)');
                if (res) {
                    closeFramePickerModal();
                    showToast('تم لصق واقتصاص اللقطة بنجاح واعتمادها للمشروع! ✨');
                }
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(blob);
    }

    // Modal Open/Close Controls
    function openFramePickerModal() {
        if (!videoFramePickerModal) return;
        videoFramePickerModal.style.display = 'flex';
        
        const currentAspect = document.getElementById('newAspect')?.value || 'vertical';
        const targetRadio = document.querySelector(`input[name="modalAspectMode"][value="${currentAspect}"]`);
        if (targetRadio) {
            targetRadio.checked = true;
            syncModalAspectBox(currentAspect);
        }

        window.addEventListener('paste', handleGlobalPaste);

        // Auto-check newUrl input
        const rawUrl = document.getElementById('newUrl')?.value?.trim() || '';
        if (rawUrl && currentActiveMode === 'none') {
            loadFromUrlString(rawUrl);
        }
    }

    function closeFramePickerModal() {
        if (!videoFramePickerModal) return;
        if (modalScrubVideoEl && !modalScrubVideoEl.paused) {
            modalScrubVideoEl.pause();
        }
        window.removeEventListener('paste', handleGlobalPaste);
        videoFramePickerModal.style.display = 'none';
    }

    if (btnOpenFramePickerModal && !btnOpenFramePickerModal.dataset.bound) {
        btnOpenFramePickerModal.dataset.bound = "true";
        btnOpenFramePickerModal.addEventListener('click', openFramePickerModal);
    }
    if (btnFramePickerClose && !btnFramePickerClose.dataset.bound) {
        btnFramePickerClose.dataset.bound = "true";
        btnFramePickerClose.addEventListener('click', closeFramePickerModal);
    }
    if (btnFramePickerCancel && !btnFramePickerCancel.dataset.bound) {
        btnFramePickerCancel.dataset.bound = "true";
        btnFramePickerCancel.addEventListener('click', closeFramePickerModal);
    }
    if (videoPickerBackdrop && !videoPickerBackdrop.dataset.bound) {
        videoPickerBackdrop.dataset.bound = "true";
        videoPickerBackdrop.addEventListener('click', closeFramePickerModal);
    }

    // Load from URL (Google Drive / YouTube / Direct MP4)
    function loadFromUrlString(rawUrl) {
        if (!rawUrl) return false;
        const driveId = extractDriveId(rawUrl);
        const ytId = extractYouTubeId(rawUrl);

        if (driveId) {
            currentDriveId = driveId;
            currentYtId = null;
            currentActiveMode = 'iframe';

            if (modalVideoEmptyState) modalVideoEmptyState.style.display = 'none';
            if (modalScrubVideoEl) {
                modalScrubVideoEl.pause();
                modalScrubVideoEl.style.display = 'none';
            }
            if (modalScrubControlsArea) modalScrubControlsArea.style.display = 'none';
            if (modalTimecodeBadge) modalTimecodeBadge.style.display = 'none';

            if (modalDriveIframe) {
                modalDriveIframe.src = `https://drive.google.com/file/d/${driveId}/preview`;
                modalDriveIframe.style.display = 'block';
            }
            if (modalIframeActionsPanel) modalIframeActionsPanel.style.display = 'flex';

            if (modalVideoFeedback) {
                modalVideoFeedback.style.display = 'inline-flex';
                modalVideoFeedback.innerHTML = `<i class="fa-brands fa-google-drive" style="color: #60a5fa;"></i> فيديو Google Drive جاهز للتشغيل 🎬`;
            }
            showToast('تم تشغيل مشغل Google Drive داخل النافذة! شاهد الفيديو واضغط زر الغلاف أو الصق لقطة الشاشة.');
            return true;
        }

        if (ytId) {
            currentYtId = ytId;
            currentDriveId = null;
            currentActiveMode = 'iframe';

            if (modalVideoEmptyState) modalVideoEmptyState.style.display = 'none';
            if (modalScrubVideoEl) {
                modalScrubVideoEl.pause();
                modalScrubVideoEl.style.display = 'none';
            }
            if (modalScrubControlsArea) modalScrubControlsArea.style.display = 'none';
            if (modalTimecodeBadge) modalTimecodeBadge.style.display = 'none';

            if (modalDriveIframe) {
                modalDriveIframe.src = `https://www.youtube.com/embed/${ytId}?autoplay=1`;
                modalDriveIframe.style.display = 'block';
            }
            if (modalIframeActionsPanel) modalIframeActionsPanel.style.display = 'flex';

            if (modalVideoFeedback) {
                modalVideoFeedback.style.display = 'inline-flex';
                modalVideoFeedback.innerHTML = `<i class="fa-brands fa-youtube" style="color: #ef4444;"></i> فيديو YouTube جاهز للتشغيل 🎬`;
            }
            showToast('تم تشغيل فيديو YouTube داخل النافذة! شاهد الفيديو واضغط زر الغلاف أو الصق لقطة الشاشة.');
            return true;
        }

        if (rawUrl.match(/\.(mp4|mov|webm|avi)/i)) {
            currentDriveId = null;
            currentYtId = null;
            currentActiveMode = 'local';

            if (modalVideoEmptyState) modalVideoEmptyState.style.display = 'none';
            if (modalDriveIframe) {
                modalDriveIframe.src = 'about:blank';
                modalDriveIframe.style.display = 'none';
            }
            if (modalIframeActionsPanel) modalIframeActionsPanel.style.display = 'none';

            if (modalScrubVideoEl) {
                modalScrubVideoEl.style.display = 'block';
                modalScrubVideoEl.controls = true;
                modalScrubVideoEl.crossOrigin = 'anonymous';
                modalScrubVideoEl.src = rawUrl;
                modalScrubVideoEl.load();
                modalScrubVideoEl.play().catch(() => {});
            }
            if (modalScrubControlsArea) modalScrubControlsArea.style.display = 'flex';
            if (modalTimecodeBadge) modalTimecodeBadge.style.display = 'inline-block';

            if (modalVideoFeedback) {
                modalVideoFeedback.style.display = 'inline-flex';
                modalVideoFeedback.innerHTML = `<i class="fa-solid fa-play"></i> فيديو مباشر جاهز`;
            }
            showToast('جاري تشغيل رابط الفيديو المباشر...');
            return true;
        }

        return false;
    }

    if (btnModalLoadFromUrl && !btnModalLoadFromUrl.dataset.bound) {
        btnModalLoadFromUrl.dataset.bound = "true";
        btnModalLoadFromUrl.addEventListener('click', () => {
            const rawUrl = document.getElementById('newUrl')?.value?.trim() || '';
            if (!rawUrl) {
                alert('يرجى كتابة رابط الفيديو في حقل الرابط بصفحة إضافة المشروع أولاً.');
                return;
            }
            const ok = loadFromUrlString(rawUrl);
            if (!ok) {
                alert('الرابط المكتوب ليس رابط فيديو مباشر أو Google Drive أو YouTube.\n\n💡 أفضل وأدق طريقة: اضغط الزر رقم (1) لاختيار ملف الفيديو من جهازك والتقليب فريم بـ فريم بدقة 60 إطار بدون أي قيود!');
            }
        });
    }

    // 1. Load Local Video File into Modal (Zero-Lag Local Stream with Native Controls)
    function loadLocalVideoFileToModal(file) {
        if (!file) return;
        const blobUrl = URL.createObjectURL(file);
        currentActiveMode = 'local';
        currentDriveId = null;
        currentYtId = null;

        if (modalVideoEmptyState) modalVideoEmptyState.style.display = 'none';
        if (modalDriveIframe) {
            modalDriveIframe.src = 'about:blank';
            modalDriveIframe.style.display = 'none';
        }
        if (modalIframeActionsPanel) modalIframeActionsPanel.style.display = 'none';

        if (modalScrubVideoEl) {
            modalScrubVideoEl.style.display = 'block';
            modalScrubVideoEl.controls = true;
            modalScrubVideoEl.muted = false;
            modalScrubVideoEl.playsInline = true;
            modalScrubVideoEl.preload = 'auto';
            modalScrubVideoEl.src = blobUrl;
            modalScrubVideoEl.load();

            if (modalTimecodeBadge) modalTimecodeBadge.style.display = 'inline-block';
            if (modalScrubControlsArea) modalScrubControlsArea.style.display = 'flex';

            if (modalVideoFeedback) {
                modalVideoFeedback.style.display = 'inline-flex';
                modalVideoFeedback.innerHTML = `<i class="fa-solid fa-circle-check"></i> تم فتح (${file.name.slice(0, 22)}) للتقليب فريم بـ فريم`;
            }

            modalScrubVideoEl.onloadedmetadata = () => {
                if (modalVideoSlider) {
                    modalVideoSlider.min = 0;
                    modalVideoSlider.max = modalScrubVideoEl.duration || 10;
                    modalVideoSlider.step = (modalScrubVideoEl.duration > 60) ? 0.08 : 0.03;
                    modalVideoSlider.value = 0;
                }
                updateModalTimeDisplay(0);
                try { modalScrubVideoEl.currentTime = 0.05; } catch (e) {}

                if (modalScrubVideoEl.videoWidth && modalScrubVideoEl.videoHeight) {
                    const isVert = modalScrubVideoEl.videoHeight > modalScrubVideoEl.videoWidth;
                    const aspectVal = isVert ? 'vertical' : 'widescreen';
                    const targetRadio = document.querySelector(`input[name="modalAspectMode"][value="${aspectVal}"]`);
                    if (targetRadio) targetRadio.checked = true;
                    syncModalAspectBox(aspectVal);
                }
            };
            showToast('تم فتح الفيديو! يمكنك تشغيله وتقليب الفريمات ثم اعتماد اللقطة.');
        }
    }

    if (modalVideoFileInput && !modalVideoFileInput.dataset.bound) {
        modalVideoFileInput.dataset.bound = "true";
        modalVideoFileInput.addEventListener('change', (e) => {
            const file = e.target.files && e.target.files[0];
            loadLocalVideoFileToModal(file);
        });
    }

    if (btnModalSwitchToLocal && !btnModalSwitchToLocal.dataset.bound) {
        btnModalSwitchToLocal.dataset.bound = "true";
        btnModalSwitchToLocal.addEventListener('click', () => {
            modalVideoFileInput?.click();
        });
    }

    // Video Play/Pause & Slider Sync
    function toggleModalVideoPlay() {
        if (!modalScrubVideoEl) return;
        if (modalScrubVideoEl.paused) {
            modalScrubVideoEl.play().catch(() => {});
        } else {
            modalScrubVideoEl.pause();
        }
    }

    if (btnModalTogglePlay && !btnModalTogglePlay.dataset.bound) {
        btnModalTogglePlay.dataset.bound = "true";
        btnModalTogglePlay.addEventListener('click', toggleModalVideoPlay);
    }
    if (modalScrubVideoEl && !modalScrubVideoEl.dataset.bound) {
        modalScrubVideoEl.dataset.bound = "true";
        modalScrubVideoEl.addEventListener('play', () => {
            if (iconModalPlayPause) iconModalPlayPause.className = 'fa-solid fa-pause';
        });
        modalScrubVideoEl.addEventListener('pause', () => {
            if (iconModalPlayPause) iconModalPlayPause.className = 'fa-solid fa-play';
        });
        modalScrubVideoEl.addEventListener('timeupdate', () => {
            if (!isUserDraggingModalSlider && modalVideoSlider) {
                modalVideoSlider.value = modalScrubVideoEl.currentTime;
            }
            updateModalTimeDisplay(modalScrubVideoEl.currentTime);
        });
    }

    // Timeline Slider Dragging
    if (modalVideoSlider && !modalVideoSlider.dataset.bound) {
        modalVideoSlider.dataset.bound = "true";
        modalVideoSlider.addEventListener('mousedown', () => { isUserDraggingModalSlider = true; });
        modalVideoSlider.addEventListener('touchstart', () => { isUserDraggingModalSlider = true; }, { passive: true });
        modalVideoSlider.addEventListener('input', () => {
            const t = parseFloat(modalVideoSlider.value);
            if (modalScrubVideoEl) modalScrubVideoEl.currentTime = t;
            updateModalTimeDisplay(t);
        });
        modalVideoSlider.addEventListener('mouseup', () => { isUserDraggingModalSlider = false; });
        modalVideoSlider.addEventListener('touchend', () => { isUserDraggingModalSlider = false; });
    }

    // Precision Stepper Buttons
    function stepModalVideoTime(delta) {
        if (!modalScrubVideoEl || isNaN(modalScrubVideoEl.duration)) return;
        modalScrubVideoEl.pause();
        const newTime = Math.max(0, Math.min(modalScrubVideoEl.duration, modalScrubVideoEl.currentTime + delta));
        modalScrubVideoEl.currentTime = newTime;
        if (modalVideoSlider) modalVideoSlider.value = newTime;
        updateModalTimeDisplay(newTime);
    }

    document.getElementById('btnModalStepBack5')?.addEventListener('click', () => stepModalVideoTime(-5));
    document.getElementById('btnModalStepBack1')?.addEventListener('click', () => stepModalVideoTime(-1));
    document.getElementById('btnModalStepBackFrame')?.addEventListener('click', () => stepModalVideoTime(-0.04));
    document.getElementById('btnModalStepForwardFrame')?.addEventListener('click', () => stepModalVideoTime(0.04));
    document.getElementById('btnModalStepForward1')?.addEventListener('click', () => stepModalVideoTime(1));
    document.getElementById('btnModalStepForward5')?.addEventListener('click', () => stepModalVideoTime(5));

    // Unified Crop & Apply Canvas Engine
    function cropAndApplyImage(imgSource, targetMode, timeInfo = '') {
        const c = document.createElement('canvas');
        const ctx = c.getContext('2d');
        const iw = imgSource.naturalWidth || imgSource.videoWidth || imgSource.width;
        const ih = imgSource.naturalHeight || imgSource.videoHeight || imgSource.height;
        if (!iw || !ih) return null;

        let cropW = iw, cropH = ih, startX = 0, startY = 0;
        if (targetMode === 'vertical') {
            const targetRatio = 9 / 16;
            if (iw / ih > targetRatio) {
                cropW = ih * targetRatio;
                startX = (iw - cropW) / 2;
            } else {
                cropH = iw / targetRatio;
                startY = (ih - cropH) / 2;
            }
            c.width = Math.round(cropW);
            c.height = Math.round(cropH);
            ctx.drawImage(imgSource, startX, startY, cropW, cropH, 0, 0, c.width, c.height);
        } else if (targetMode === 'widescreen') {
            const targetRatio = 16 / 9;
            if (iw / ih > targetRatio) {
                cropW = ih * targetRatio;
                startX = (iw - cropW) / 2;
            } else {
                cropH = iw / targetRatio;
                startY = (ih - cropH) / 2;
            }
            c.width = Math.round(cropW);
            c.height = Math.round(cropH);
            ctx.drawImage(imgSource, startX, startY, cropW, cropH, 0, 0, c.width, c.height);
        } else {
            c.width = iw;
            c.height = ih;
            ctx.drawImage(imgSource, 0, 0, c.width, c.height);
        }

        const dataUrl = c.toDataURL('image/jpeg', 0.92);
        uncroppedSourceImage = dataUrl;

        const thumbInput = document.getElementById('newThumbnail');
        const thumbFeedback = document.getElementById('newThumbFeedback');
        if (thumbInput) thumbInput.value = dataUrl;
        if (thumbFeedback) {
            thumbFeedback.style.display = 'inline-flex';
            thumbFeedback.innerHTML = `<i class="fa-solid fa-camera"></i> تم التقاط لقطة الثمبنيل (${c.width} × ${c.height} px) 📸`;
        }

        const modeLabel = targetMode === 'vertical' ? 'طولي (9:16 Reels)' : (targetMode === 'widescreen' ? 'عرضي (16:9 HD)' : 'أبعاد أصلية');
        const timePart = timeInfo ? ` • ${timeInfo}` : '';
        showCapturedPreview(dataUrl, `الأبعاد: ${c.width} × ${c.height} px • المقاس: ${modeLabel}${timePart}`);

        const aspectSel = document.getElementById('newAspect');
        if (aspectSel) {
            if (targetMode === 'vertical') aspectSel.value = 'vertical';
            else if (targetMode === 'widescreen') aspectSel.value = 'widescreen';
            else if (c.width && c.height) {
                aspectSel.value = (c.height > c.width) ? 'vertical' : 'widescreen';
            }
        }

        return { dataUrl, width: c.width, height: c.height };
    }

    // Auto-Fetch 4K CDN Cover (Google Drive / YouTube)
    function fetchAndCropRemoteImage(imgUrl, label) {
        showToast(`جاري استخراج وقص غلاف ${label}...`);
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            const mode = document.querySelector('input[name="modalAspectMode"]:checked')?.value || 'vertical';
            const res = cropAndApplyImage(img, mode, label);
            if (res) {
                closeFramePickerModal();
                showToast(`تم استخراج وتطبيق غلاف ${label} بنجاح! ✨`);
            }
        };
        img.onerror = () => {
            const thumbInput = document.getElementById('newThumbnail');
            if (thumbInput) thumbInput.value = imgUrl;
            showCapturedPreview(imgUrl, `${label} (Original Cover)`);
            closeFramePickerModal();
            showToast(`تم تعيين غلاف ${label} للمشروع بنجاح!`);
        };
        img.src = imgUrl;
    }

    if (btnModalAutoFetchCdnCover && !btnModalAutoFetchCdnCover.dataset.bound) {
        btnModalAutoFetchCdnCover.dataset.bound = "true";
        btnModalAutoFetchCdnCover.addEventListener('click', () => {
            const rawUrl = document.getElementById('newUrl')?.value?.trim() || '';
            const driveId = extractDriveId(rawUrl) || currentDriveId;
            const ytId = extractYouTubeId(rawUrl) || currentYtId;

            if (driveId) {
                const driveThumb = `https://lh3.googleusercontent.com/d/${driveId}=w1600`;
                fetchAndCropRemoteImage(driveThumb, 'Google Drive 4K');
                return;
            }
            if (ytId) {
                const primaryThumb = `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
                fetchAndCropRemoteImage(primaryThumb, 'YouTube HD');
                return;
            }
            alert('يرجى التأكد من كتابة رابط فيديو صحيح (Google Drive أو YouTube).');
        });
    }

    // Paste from Clipboard Button
    if (btnModalPasteClipboard && !btnModalPasteClipboard.dataset.bound) {
        btnModalPasteClipboard.dataset.bound = "true";
        btnModalPasteClipboard.addEventListener('click', async () => {
            try {
                if (navigator.clipboard && navigator.clipboard.read) {
                    const clipboardItems = await navigator.clipboard.read();
                    for (const item of clipboardItems) {
                        for (const type of item.types) {
                            if (type.startsWith('image/')) {
                                const blob = await item.getType(type);
                                processPastedBlob(blob);
                                return;
                            }
                        }
                    }
                }
            } catch (err) {
                console.warn('Clipboard API read error:', err);
            }
            alert('💡 لالتقاط اللقطة من الحافظة:\n1. اضغط Win + Shift + S لقص الفريم المطلوب.\n2. ثم اضغط مباشرة من الكيبورد اختصار Ctrl + V وسيتم لصقها واعتمادها فوراً!');
        });
    }

    // Download Snap Button (Downloads directly to PC)
    if (btnModalDownloadSnap && !btnModalDownloadSnap.dataset.bound) {
        btnModalDownloadSnap.dataset.bound = "true";
        btnModalDownloadSnap.addEventListener('click', () => {
            const mode = document.querySelector('input[name="modalAspectMode"]:checked')?.value || 'original';
            
            if (modalScrubVideoEl && modalScrubVideoEl.style.display !== 'none' && modalScrubVideoEl.videoWidth > 0) {
                modalScrubVideoEl.pause();
                const res = cropAndApplyImage(modalScrubVideoEl, mode, formatTime(modalScrubVideoEl.currentTime));
                if (res && res.dataUrl) {
                    const a = document.createElement('a');
                    a.href = res.dataUrl;
                    a.download = `video-frame-${Date.now()}.jpg`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    showToast('تم تحميل وحفظ صورة الفريم على جهازك بنجاح! 💾');
                }
                return;
            }

            if (uncroppedSourceImage) {
                const a = document.createElement('a');
                a.href = uncroppedSourceImage;
                a.download = `video-thumbnail-${Date.now()}.jpg`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                showToast('تم حفظ الصورة على جهازك بنجاح! 💾');
                return;
            }

            alert('يرجى فتح ملف فيديو من جهازك أولاً لتمرير اللقطات وتنزيل الفريم كصورة.');
        });
    }

    // Modal Apply Frame Button (Applies to Form and Closes Modal)
    if (btnModalApplyFrame && !btnModalApplyFrame.dataset.bound) {
        btnModalApplyFrame.dataset.bound = "true";
        btnModalApplyFrame.addEventListener('click', () => {
            const mode = document.querySelector('input[name="modalAspectMode"]:checked')?.value || 'original';

            // Case 1: Active local or direct HTML5 video
            if (modalScrubVideoEl && modalScrubVideoEl.style.display !== 'none' && modalScrubVideoEl.videoWidth > 0) {
                modalScrubVideoEl.pause();
                const res = cropAndApplyImage(modalScrubVideoEl, mode, `التوقيت: ${formatTime(modalScrubVideoEl.currentTime)}`);
                if (res) {
                    closeFramePickerModal();
                    showToast('تم التقاط لقطة الثمبنيل من الفيديو بنجاح! ✨');
                }
                return;
            }

            // Case 2: Active Google Drive or YouTube iframe
            if (modalDriveIframe && modalDriveIframe.style.display !== 'none') {
                btnModalAutoFetchCdnCover?.click();
                return;
            }

            alert('يرجى تشغيل فيديو من الرابط أو فتح ملف فيديو من جهازك أولاً (الزر 1 أو 2) لتحديد الفريم المطلوب.');
        });
    }

    // Re-cropping buttons on the form card (Lossless from uncroppedSourceImage)
    function cropCapturedImage(targetAspect, label) {
        if (!capturedThumbImgPreview || !capturedThumbImgPreview.src) return;
        const currentSrc = uncroppedSourceImage || capturedThumbImgPreview.src;
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            try {
                const c = document.createElement('canvas');
                const ctx = c.getContext('2d');
                const iw = img.naturalWidth || img.width;
                const ih = img.naturalHeight || img.height;

                const targetRatio = (targetAspect === 'vertical') ? (9 / 16) : (16 / 9);
                let cropW = iw, cropH = ih, startX = 0, startY = 0;

                if (iw / ih > targetRatio) {
                    cropW = ih * targetRatio;
                    startX = (iw - cropW) / 2;
                } else {
                    cropH = iw / targetRatio;
                    startY = (ih - cropH) / 2;
                }

                c.width = Math.round(cropW);
                c.height = Math.round(cropH);
                ctx.drawImage(img, startX, startY, cropW, cropH, 0, 0, c.width, c.height);

                const croppedData = c.toDataURL('image/jpeg', 0.92);
                capturedThumbImgPreview.src = croppedData;
                const thumbInput = document.getElementById('newThumbnail');
                if (thumbInput) thumbInput.value = croppedData;
                if (capturedThumbMeta) {
                    capturedThumbMeta.textContent = `الأبعاد: ${c.width} × ${c.height} px • المقاس المقصوص: ${label}`;
                }
                const aspectSel = document.getElementById('newAspect');
                if (aspectSel) aspectSel.value = targetAspect;
                showToast(`تم قص وتنسيق الغلاف بمقاس ${label} بنجاح!`);
            } catch (err) {
                console.warn('Crop canvas error:', err);
                alert('تعذر قص هذه الصورة تلقائياً.');
            }
        };
        img.onerror = () => {
            alert('تعذر تحميل الصورة لقصها.');
        };
        img.src = currentSrc;
    }

    if (btnCropThumbVertical && !btnCropThumbVertical.dataset.bound) {
        btnCropThumbVertical.dataset.bound = "true";
        btnCropThumbVertical.addEventListener('click', () => cropCapturedImage('vertical', 'ريلز (9:16)'));
    }
    if (btnCropThumbWide && !btnCropThumbWide.dataset.bound) {
        btnCropThumbWide.dataset.bound = "true";
        btnCropThumbWide.addEventListener('click', () => cropCapturedImage('widescreen', 'عريض (16:9)'));
    }

    // Download Captured Image button on form card
    if (btnDownloadCapturedThumb && !btnDownloadCapturedThumb.dataset.bound) {
        btnDownloadCapturedThumb.dataset.bound = "true";
        btnDownloadCapturedThumb.addEventListener('click', () => {
            if (!capturedThumbImgPreview || !capturedThumbImgPreview.src) return;
            const a = document.createElement('a');
            a.href = capturedThumbImgPreview.src;
            a.download = `video-thumbnail-${Date.now()}.jpg`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            showToast('تم تحميل وحفظ صورة الثمبنيل على جهازك بنجاح!');
        });
    }

    // Clear Captured Image on form card
    if (btnClearCapturedThumb && !btnClearCapturedThumb.dataset.bound) {
        btnClearCapturedThumb.dataset.bound = "true";
        btnClearCapturedThumb.addEventListener('click', () => {
            uncroppedSourceImage = '';
            modalExternalImgObj = null;
            if (capturedThumbPreviewCard) capturedThumbPreviewCard.style.display = 'none';
            const thumbInput = document.getElementById('newThumbnail');
            const thumbFeedback = document.getElementById('newThumbFeedback');
            if (thumbInput) thumbInput.value = '';
            if (thumbFeedback) thumbFeedback.style.display = 'none';
            showToast('تمت إزالة اللقطة الملتقطة.');
        });
    }

    function renderProjectsManager() {
        const projectsListContainer = document.getElementById('adminProjectsList');
        if (!projectsListContainer) return;
        currentProjects = getSiteProjects();
        projectsListContainer.innerHTML = '';

        if (currentProjects.length === 0) {
            projectsListContainer.innerHTML = '<p style="color:var(--admin-muted); padding:1rem;">لا توجد مشاريع مضافة حالياً.</p>';
            return;
        }

        currentProjects.forEach(proj => {
            const card = document.createElement('div');
            card.style.cssText = 'background: rgba(255,255,255,0.03); border: 1px solid var(--admin-border); border-radius: 14px; padding: 1.25rem; margin-bottom: 1rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;';
            card.innerHTML = `
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <img src="${proj.thumbnailUrl || 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=120&q=80'}" style="width: 58px; height: 58px; border-radius: 10px; object-fit: cover;" alt="">
                    <div>
                        <strong style="color: var(--admin-text); font-size: 1rem;">${proj.titleAr}</strong>
                        <div style="font-size: 0.8rem; color: var(--admin-muted); margin-top: 0.2rem;">
                            <span>${proj.category === 'shorts' ? 'فيديو قصير (ريل)' : 'فيديو طويل (16:9)'}</span> • 
                            <span>${proj.software || 'DaVinci'}</span> • 
                            <span>${proj.views || '+500K'}</span>
                        </div>
                    </div>
                </div>
                <div style="display: flex; align-items: center; gap: 0.6rem;">
                    <button type="button" class="btn-edit-proj" data-id="${proj.id}">
                        <i class="fa-solid fa-pen-to-square"></i> تعديل 📝
                    </button>
                    <button type="button" class="btn-del-proj" data-id="${proj.id}" style="background: rgba(239,68,68,0.15); border: none; color: var(--admin-crimson); padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer; font-weight: 700;">
                        <i class="fa-solid fa-trash"></i> حذف
                    </button>
                </div>
            `;
            projectsListContainer.appendChild(card);
        });

        // Edit Project Click Listener
        document.querySelectorAll('.btn-edit-proj').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                const proj = currentProjects.find(p => p.id === id);
                if (!proj) return;

                const editInput = document.getElementById('editProjectId');
                const titleInput = document.getElementById('newTitle');
                const urlInput = document.getElementById('newUrl');
                const catInput = document.getElementById('newCat');
                const aspectInput = document.getElementById('newAspect');
                const softwareInput = document.getElementById('newSoftware');
                const tagInput = document.getElementById('newTag');
                const thumbInput = document.getElementById('newThumbnail');

                if (editInput) editInput.value = proj.id;
                if (titleInput) titleInput.value = proj.titleAr || proj.titleEn || '';
                if (urlInput) urlInput.value = proj.videoUrl || '';
                if (catInput) catInput.value = proj.category || 'shorts';
                if (aspectInput) aspectInput.value = proj.aspect || 'vertical';
                if (softwareInput) softwareInput.value = proj.software || '';
                if (tagInput) tagInput.value = proj.tag || '';
                if (thumbInput) thumbInput.value = proj.thumbnailUrl || '';

                const textSubmit = document.getElementById('textSubmitProject');
                const iconSubmit = document.getElementById('iconSubmitProject');
                const btnCancel = document.getElementById('btnCancelEditProject');

                if (textSubmit) textSubmit.textContent = 'تحديث وحفظ تعديلات الفيديو';
                if (iconSubmit) iconSubmit.className = 'fa-solid fa-check';
                if (btnCancel) btnCancel.style.display = 'inline-flex';

                // Auto-load project video into scrubber studio
                if (proj.videoUrl) {
                    const driveId = extractDriveId(proj.videoUrl);
                    if (driveId) {
                        playDrivePreviewInStudio(driveId);
                    } else if (proj.videoUrl.match(/\.(mp4|webm|mov)$/i)) {
                        loadStreamVideoUrl(proj.videoUrl, 'فيديو مباشر');
                    }
                }
                if (proj.thumbnailUrl) {
                    showCapturedPreview(proj.thumbnailUrl, 'الغلاف الحالي للمشروع');
                }

                addProjectForm?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                showToast('تم تحميل بيانات الفيديو في المشغل والنموذج للتعديل!');
            });
        });

        // Delete Project Click Listener
        document.querySelectorAll('.btn-del-proj').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                if (confirm('هل أنت متأكد من حذف هذا الفيديو؟')) {
                    currentProjects = currentProjects.filter(p => p.id !== id);
                    saveSiteProjects(currentProjects);
                    renderProjectsManager();
                    showToast('تم حذف الفيديو بنجاح!');
                }
            });
        });
    }

    // Cancel Edit Project Button Listener
    if (btnCancelEditProject && !btnCancelEditProject.dataset.bound) {
        btnCancelEditProject.dataset.bound = "true";
        btnCancelEditProject.addEventListener('click', () => {
            const editInput = document.getElementById('editProjectId');
            if (editInput) editInput.value = '';
            addProjectForm?.reset();

            const textSubmit = document.getElementById('textSubmitProject');
            const iconSubmit = document.getElementById('iconSubmitProject');
            if (textSubmit) textSubmit.textContent = 'حفظ ونشر الفيديو فوراً';
            if (iconSubmit) iconSubmit.className = 'fa-solid fa-plus';
            btnCancelEditProject.style.display = 'none';

            const fb = document.getElementById('newThumbFeedback');
            if (fb) fb.style.display = 'none';
        });
    }

    if (addProjectForm && !addProjectForm.dataset.bound) {
        addProjectForm.dataset.bound = "true";
        addProjectForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const editId = document.getElementById('editProjectId')?.value.trim();
            const title = document.getElementById('newTitle')?.value.trim();
            const rawUrl = document.getElementById('newUrl')?.value.trim();
            const cat = document.getElementById('newCat')?.value;
            const aspect = document.getElementById('newAspect')?.value;
            const software = document.getElementById('newSoftware')?.value.trim() || 'DaVinci Resolve';
            const tag = document.getElementById('newTag')?.value.trim() || 'إعلاني';
            const thumb = document.getElementById('newThumbnail')?.value.trim();

            if (!title || !rawUrl) return;

            let finalUrl = rawUrl;
            let finalThumb = thumb;

            if (rawUrl.includes('drive.google.com/file/d/')) {
                const match = rawUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
                if (match && match[1]) {
                    const id = match[1];
                    finalUrl = `https://drive.google.com/file/d/${id}/preview`;
                    if (!finalThumb) finalThumb = `https://lh3.googleusercontent.com/d/${id}=w800`;
                }
            }

            if (editId) {
                // Update existing project
                const existing = currentProjects.find(p => p.id === editId);
                if (existing) {
                    existing.titleAr = title;
                    existing.titleEn = title;
                    existing.category = cat;
                    existing.aspect = aspect;
                    existing.software = software;
                    existing.tag = tag;
                    existing.videoUrl = finalUrl;
                    existing.thumbnailUrl = finalThumb || existing.thumbnailUrl;
                    existing.descAr = title;
                    existing.descEn = title;
                }
                saveSiteProjects(currentProjects);
                addProjectForm.reset();
                document.getElementById('editProjectId').value = '';

                const textSubmit = document.getElementById('textSubmitProject');
                const iconSubmit = document.getElementById('iconSubmitProject');
                if (textSubmit) textSubmit.textContent = 'حفظ ونشر الفيديو فوراً';
                if (iconSubmit) iconSubmit.className = 'fa-solid fa-plus';
                if (btnCancelEditProject) btnCancelEditProject.style.display = 'none';

                const fb = document.getElementById('newThumbFeedback');
                if (fb) fb.style.display = 'none';

                renderProjectsManager();
                showToast('تم تحديث بيانات الفيديو بنجاح في المعرض!');
            } else {
                // Add new project
                const newProj = {
                    id: 'proj-' + Date.now(),
                    titleAr: title,
                    titleEn: title,
                    category: cat,
                    aspect: aspect,
                    software: software,
                    tag: tag,
                    views: "+250K",
                    retention: "80%",
                    videoUrl: finalUrl,
                    thumbnailUrl: finalThumb || "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80",
                    descAr: title,
                    descEn: title
                };

                currentProjects.unshift(newProj);
                saveSiteProjects(currentProjects);
                addProjectForm.reset();
                const fb = document.getElementById('newThumbFeedback');
                if (fb) fb.style.display = 'none';
                renderProjectsManager();
                showToast('تم نشر الفيديو بنجاح في المعرض!');
            }
        });
    }

    // ------------------------------------------------------------------------
    // 8. Tutorials Manager (Blogger Rich Editor + Dual Thumb/Cover Uploads)
    // ------------------------------------------------------------------------
    const tutorialsListContainer = document.getElementById('adminTutorialsList');
    const addTutorialForm = document.getElementById('addTutorialForm');
    const tutRichEditor = document.getElementById('tutRichEditor');
    const tutContentInput = document.getElementById('tutContent');

    // Bind Dual File Uploads for Tutorial Thumbnail & Header Cover
    bindFileUpload('tutThumbFile', 'tutThumbnail', 'tutThumbFeedback');
    bindFileUpload('tutCoverFile', 'tutCoverImg', 'tutCoverFeedback');

    // Bind Inline Article Image Upload (Device File to Article body)
    const tutInlineImgFile = document.getElementById('tutInlineImgFile');
    if (tutInlineImgFile) {
        tutInlineImgFile.addEventListener('change', (e) => {
            const file = e.target.files && e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (evt) => {
                const dataUrl = evt.target.result;
                insertHtmlAtCursor(`<img src="${dataUrl}" alt="Article Image" style="max-width:100%; border-radius:12px; margin:1rem 0;">`);
                showToast('تم إدراج الصورة من جهازك داخل المقال!');
            };
            reader.readAsDataURL(file);
        });
    }

    // Blogger-Style Rich Toolbar Buttons Handler
    document.querySelectorAll('.rich-toolbar .editor-btn[data-cmd]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const cmd = btn.getAttribute('data-cmd');
            const val = btn.getAttribute('data-val') || null;
            document.execCommand(cmd, false, val);
            tutRichEditor?.focus();
        });
    });

    const btnInsertImageUrl = document.getElementById('btnInsertImageUrl');
    if (btnInsertImageUrl) {
        btnInsertImageUrl.addEventListener('click', (e) => {
            e.preventDefault();
            const url = prompt("أدخل رابط الصورة التي تريد تضمينها بالمقال:");
            if (url) {
                insertHtmlAtCursor(`<img src="${url}" alt="Article Image" style="max-width:100%; border-radius:12px; margin:1rem 0;">`);
            }
        });
    }

    const btnInsertLink = document.getElementById('btnInsertLink');
    if (btnInsertLink) {
        btnInsertLink.addEventListener('click', (e) => {
            e.preventDefault();
            const url = prompt("أدخل رابط الـ URL:");
            if (url) {
                document.execCommand('createLink', false, url);
            }
        });
    }

    function insertHtmlAtCursor(html) {
        if (!tutRichEditor) return;
        tutRichEditor.focus();
        const sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            const range = sel.getRangeAt(0);
            range.deleteContents();
            const el = document.createElement("div");
            el.innerHTML = html;
            const frag = document.createDocumentFragment();
            let node, lastNode;
            while ((node = el.firstChild)) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        } else {
            tutRichEditor.innerHTML += html;
        }
    }

    function renderTutorialsManager() {
        const tutorialsListContainer = document.getElementById('adminTutorialsList');
        if (!tutorialsListContainer) return;
        currentTutorials = getSiteTutorials();
        tutorialsListContainer.innerHTML = '';

        if (currentTutorials.length === 0) {
            tutorialsListContainer.innerHTML = '<p style="color:var(--admin-muted); padding:1rem;">لا توجد مقالات منشورة حالياً.</p>';
            return;
        }

        currentTutorials.forEach(tut => {
            const card = document.createElement('div');
            card.style.cssText = 'background: rgba(255,255,255,0.03); border: 1px solid var(--admin-border); border-radius: 14px; padding: 1.25rem; margin-bottom: 1rem; display: flex; align-items: center; justify-content: space-between;';
            card.innerHTML = `
                <div style="display:flex; align-items:center; gap:1rem;">
                    <img src="${tut.thumbnailUrl || tut.coverImg || 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=120&q=80'}" style="width: 58px; height: 58px; border-radius: 10px; object-fit: cover;" alt="">
                    <div>
                        <strong style="color: var(--admin-text); font-size: 1rem;">${tut.titleAr}</strong>
                        <div style="font-size: 0.8rem; color: var(--admin-muted); margin-top: 0.2rem;">
                            <span>${tut.categoryNameAr}</span> • 
                            <span>${tut.readTime || '5 د'}</span> • 
                            <span>${tut.toc ? tut.toc.length + ' أقسام بالفهرس' : 'مقال'}</span>
                        </div>
                    </div>
                </div>
                <div style="display: flex; gap: 0.5rem; align-items: center;">
                    <button type="button" class="btn-edit-tut" data-id="${tut.id}" title="تعديل هذا المقال">
                        <i class="fa-solid fa-pen-to-square"></i> تعديل
                    </button>
                    <button type="button" class="btn-del-tut" data-id="${tut.id}" style="background: rgba(239,68,68,0.15); border: none; color: var(--admin-crimson); padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer; font-weight: 700;">
                        <i class="fa-solid fa-trash"></i> حذف
                    </button>
                </div>
            `;
            tutorialsListContainer.appendChild(card);
        });

        // Wire Edit Tutorial Click
        document.querySelectorAll('.btn-edit-tut').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                const tut = currentTutorials.find(t => t.id === id);
                if (!tut) return;

                const editIdInput = document.getElementById('editTutorialId');
                if (editIdInput) editIdInput.value = tut.id;

                const tutTitle = document.getElementById('tutTitle');
                const tutCatName = document.getElementById('tutCatName');
                const tutThumbnail = document.getElementById('tutThumbnail');
                const tutCoverImg = document.getElementById('tutCoverImg');
                const tutReadTime = document.getElementById('tutReadTime');
                const tutSummary = document.getElementById('tutSummary');
                const tutTocInput = document.getElementById('tutTocInput');
                const tutFormTitle = document.getElementById('tutFormTitle');
                const btnSubmitTut = document.getElementById('btnSubmitTut');
                const btnCancelEditTut = document.getElementById('btnCancelEditTut');

                if (tutTitle) tutTitle.value = tut.titleAr || tut.titleEn || '';
                if (tutCatName) tutCatName.value = tut.categoryNameAr || '';
                if (tutThumbnail) tutThumbnail.value = tut.thumbnailUrl || '';
                if (tutCoverImg) tutCoverImg.value = tut.coverImg || '';
                if (tutReadTime) tutReadTime.value = tut.readTime || '5 دقائق قراءة';
                if (tutSummary) tutSummary.value = tut.summaryAr || '';
                if (tutTocInput) {
                    tutTocInput.value = (tut.toc && Array.isArray(tut.toc)) ? tut.toc.map(item => item.title).join(', ') : '';
                }
                if (tutRichEditor) {
                    tutRichEditor.innerHTML = tut.contentAr || tut.summaryAr || '';
                }

                const fb1 = document.getElementById('tutThumbFeedback');
                const fb2 = document.getElementById('tutCoverFeedback');
                if (fb1 && tut.thumbnailUrl) {
                    fb1.style.display = 'inline-flex';
                    fb1.innerHTML = `<i class="fa-solid fa-circle-check"></i> ثمبنيل مفعّل`;
                }
                if (fb2 && tut.coverImg) {
                    fb2.style.display = 'inline-flex';
                    fb2.innerHTML = `<i class="fa-solid fa-circle-check"></i> غلاف مفعّل`;
                }

                if (tutFormTitle) tutFormTitle.innerHTML = `<i class="fa-solid fa-pen-to-square" style="color:var(--admin-blue);"></i> تعديل المقال: <span style="color:var(--admin-blue);">${tut.titleAr}</span>`;
                if (btnSubmitTut) btnSubmitTut.innerHTML = `<i class="fa-solid fa-floppy-disk"></i> حفظ تعديلات المقال`;
                if (btnCancelEditTut) btnCancelEditTut.style.display = 'inline-flex';

                addTutorialForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
                showToast(`تم فتح المقال (${tut.titleAr}) في المحرر للتعديل.`);
            });
        });

        document.querySelectorAll('.btn-del-tut').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                if (confirm('هل ترغب بحذف هذا المقال؟')) {
                    currentTutorials = currentTutorials.filter(t => t.id !== id);
                    saveSiteTutorials(currentTutorials);
                    renderTutorialsManager();
                    showToast('تم حذف المقال بنجاح!');
                }
            });
        });
    }

    function exitTutorialEditMode() {
        const editIdInput = document.getElementById('editTutorialId');
        if (editIdInput) editIdInput.value = '';
        addTutorialForm.reset();
        if (tutRichEditor) tutRichEditor.innerHTML = '';
        const tutFormTitle = document.getElementById('tutFormTitle');
        const btnSubmitTut = document.getElementById('btnSubmitTut');
        const btnCancelEditTut = document.getElementById('btnCancelEditTut');
        const f1 = document.getElementById('tutThumbFeedback');
        const f2 = document.getElementById('tutCoverFeedback');
        if (f1) f1.style.display = 'none';
        if (f2) f2.style.display = 'none';
        if (tutFormTitle) tutFormTitle.innerHTML = `<i class="fa-solid fa-feather"></i> + نشر درس / مقال جديد متكامل (محرر بلوجر)`;
        if (btnSubmitTut) btnSubmitTut.innerHTML = `<i class="fa-solid fa-pen-nib"></i> نشر المقال بالتنسيق الكامل فوراً`;
        if (btnCancelEditTut) btnCancelEditTut.style.display = 'none';
    }

    const btnCancelEditTut = document.getElementById('btnCancelEditTut');
    if (btnCancelEditTut) {
        btnCancelEditTut.addEventListener('click', exitTutorialEditMode);
    }

    if (addTutorialForm && !addTutorialForm.dataset.bound) {
        addTutorialForm.dataset.bound = "true";
        addTutorialForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('tutTitle')?.value.trim();
            const catName = document.getElementById('tutCatName')?.value.trim();
            const thumbImg = document.getElementById('tutThumbnail')?.value.trim();
            const coverImg = document.getElementById('tutCoverImg')?.value.trim();
            const readTime = document.getElementById('tutReadTime')?.value.trim() || '5 دقائق قراءة';
            const summary = document.getElementById('tutSummary')?.value.trim();
            const tocRaw = document.getElementById('tutTocInput')?.value.trim();

            const richHtml = tutRichEditor ? tutRichEditor.innerHTML.trim() : '';

            if (!title || !summary || !richHtml) {
                alert('يرجى ملء عنوان المقال، والملخص، وكتابة محتوى المقال في المحرر.');
                return;
            }

            // Generate TOC structure from comma-separated input
            let tocArray = [];
            if (tocRaw) {
                const headings = tocRaw.split(/[,،\n]/).map(h => h.trim()).filter(Boolean);
                tocArray = headings.map((h, i) => ({
                    id: `sec-${i + 1}`,
                    title: h
                }));
            }

            const editIdInput = document.getElementById('editTutorialId');
            const editingId = editIdInput ? editIdInput.value.trim() : '';

            if (editingId) {
                // Update existing tutorial
                const existingIdx = currentTutorials.findIndex(t => t.id === editingId);
                if (existingIdx !== -1) {
                    currentTutorials[existingIdx].titleAr = title;
                    currentTutorials[existingIdx].titleEn = title;
                    currentTutorials[existingIdx].categoryNameAr = catName || "مقالات مونتاج";
                    currentTutorials[existingIdx].thumbnailUrl = thumbImg || coverImg || currentTutorials[existingIdx].thumbnailUrl;
                    currentTutorials[existingIdx].coverImg = coverImg || thumbImg || currentTutorials[existingIdx].coverImg;
                    currentTutorials[existingIdx].readTime = readTime;
                    currentTutorials[existingIdx].summaryAr = summary;
                    currentTutorials[existingIdx].toc = tocArray;
                    currentTutorials[existingIdx].contentAr = richHtml;

                    saveSiteTutorials(currentTutorials);
                    exitTutorialEditMode();
                    renderTutorialsManager();
                    showToast('تم حفظ وتحديث المقال بنجاح!');
                    return;
                }
            }

            const newTut = {
                id: 'tut-' + Date.now(),
                titleAr: title,
                titleEn: title,
                category: "general",
                categoryNameAr: catName || "مقالات مونتاج",
                thumbnailUrl: thumbImg || coverImg || "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80",
                coverImg: coverImg || thumbImg || "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80",
                readTime: readTime,
                date: new Date().toISOString().split('T')[0],
                views: 120,
                summaryAr: summary,
                toc: tocArray,
                contentAr: richHtml
            };

            currentTutorials.unshift(newTut);
            saveSiteTutorials(currentTutorials);
            exitTutorialEditMode();
            renderTutorialsManager();
            showToast('تم نشر المقال بنجاح بالتنسيق الكامل والثمبنيل!');
        });
    }

    // ------------------------------------------------------------------------
    // 9. Store Products Manager
    // ------------------------------------------------------------------------
    const productsListContainer = document.getElementById('adminProductsList');
    const addProductForm = document.getElementById('addProductForm');

    function renderProductsManager() {
        const productsListContainer = document.getElementById('adminProductsList');
        if (!productsListContainer) return;
        currentProducts = getSiteProducts();
        productsListContainer.innerHTML = '';

        // Store Master Toggle UI
        const isStoreActive = (siteConfig.sections && siteConfig.sections.store !== false) &&
                              (siteConfig.store ? siteConfig.store.enabled !== false : true);
        const storeBadge = document.getElementById('storeStatusBadge');
        const btnToggleStore = document.getElementById('btnToggleStoreActive');

        if (storeBadge) {
            if (isStoreActive) {
                storeBadge.textContent = 'مفعل 🟢';
                storeBadge.style.background = 'rgba(16,185,129,0.15)';
                storeBadge.style.color = '#10b981';
                storeBadge.style.border = '1px solid var(--admin-emerald)';
            } else {
                storeBadge.textContent = 'معطل 🔴 (مخفي من القائمة)';
                storeBadge.style.background = 'rgba(239,68,68,0.15)';
                storeBadge.style.color = '#ef4444';
                storeBadge.style.border = '1px solid var(--admin-crimson)';
            }
        }

        if (btnToggleStore) {
            btnToggleStore.innerHTML = isStoreActive ? '<i class="fa-solid fa-power-off"></i> إيقاف المتجر' : '<i class="fa-solid fa-bolt"></i> تشغيل المتجر';
            btnToggleStore.style.background = isStoreActive ? 'rgba(239,68,68,0.2)' : 'var(--admin-blue)';
            btnToggleStore.style.color = isStoreActive ? '#ef4444' : '#fff';
            if (!btnToggleStore.dataset.bound) {
                btnToggleStore.dataset.bound = "true";
                btnToggleStore.addEventListener('click', () => {
                    const currentActive = (siteConfig.sections && siteConfig.sections.store !== false) &&
                                          (siteConfig.store ? siteConfig.store.enabled !== false : true);
                    const newActive = !currentActive;
                    if (!siteConfig.store) siteConfig.store = {};
                    siteConfig.store.enabled = newActive;
                    if (!siteConfig.sections) siteConfig.sections = {};
                    siteConfig.sections.store = newActive;
                    saveSiteConfig(siteConfig);
                    if (typeof applySectionVisibility === 'function') applySectionVisibility(siteConfig);
                    renderProductsManager();
                    renderSectionsVisibilityManager();
                    renderNavbarManager();
                    showToast(newActive ? '🟢 تم تفعيل وإظهار متجر القوالب بنجاح!' : '🔴 تم إيقاف وإخفاء متجر القوالب من الموقع!');
                });
            }
        }

        const btnRestoreDefaultProds = document.getElementById('btnRestoreDefaultProducts');
        if (btnRestoreDefaultProds && !btnRestoreDefaultProds.dataset.bound) {
            btnRestoreDefaultProds.dataset.bound = "true";
            btnRestoreDefaultProds.addEventListener('click', () => {
                if (confirm('هل تريد استعادة المنتجات والقوالب الرقمية الافتراضية (حزمة اللوتس، مكتبة المقاطع، قالب النصوص)؟')) {
                    currentProducts = JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
                    saveSiteProducts(currentProducts);
                    renderProductsManager();
                    showToast('✅ تم استعادة المنتجات الافتراضية بنجاح!');
                }
            });
        }

        function exitProductEditMode() {
            const editIdInput = document.getElementById('editProductId');
            if (editIdInput) editIdInput.value = '';
            if (addProductForm) addProductForm.reset();
            const prodFormTitle = document.getElementById('prodFormTitle');
            const btnSubmitProd = document.getElementById('btnSubmitProd');
            const btnCancelEditProd = document.getElementById('btnCancelEditProd');
            if (prodFormTitle) prodFormTitle.innerHTML = `<i class="fa-solid fa-cart-plus"></i> + إضافة منتج / قالب رقمي جديد للبيع`;
            if (btnSubmitProd) btnSubmitProd.innerHTML = `<i class="fa-solid fa-cart-plus"></i> إضافة المنتج للمتجر فوراً`;
            if (btnCancelEditProd) btnCancelEditProd.style.display = 'none';
        }

        const btnCancelEditProd = document.getElementById('btnCancelEditProd');
        if (btnCancelEditProd && !btnCancelEditProd.dataset.bound) {
            btnCancelEditProd.dataset.bound = "true";
            btnCancelEditProd.addEventListener('click', exitProductEditMode);
        }

        if (currentProducts.length === 0) {
            productsListContainer.innerHTML = '<p style="color:var(--admin-muted); padding:1rem;">لا توجد منتجات مضافة بالمتجر.</p>';
            return;
        }

        currentProducts.forEach(prod => {
            const card = document.createElement('div');
            card.style.cssText = 'background: rgba(255,255,255,0.03); border: 1px solid var(--admin-border); border-radius: 14px; padding: 1.25rem; margin-bottom: 1rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem;';
            card.innerHTML = `
                <div>
                    <strong style="color: var(--admin-text); font-size: 1rem;">${prod.titleAr}</strong>
                    <div style="font-size: 0.85rem; color: var(--admin-blue); font-weight: 700; margin-top: 0.2rem;">
                        <span>$${prod.priceUsd}</span> • <span>${prod.badgeAr || 'قالب رقمي'}</span>
                    </div>
                </div>
                <div style="display: flex; gap: 0.5rem; align-items: center;">
                    <button type="button" class="btn-edit-prod" data-id="${prod.id}" style="background: rgba(0,113,227,0.15); border: none; color: var(--admin-blue); padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer; font-weight: 700;">
                        <i class="fa-solid fa-pen-to-square"></i> تعديل
                    </button>
                    <button type="button" class="btn-del-prod" data-id="${prod.id}" style="background: rgba(239,68,68,0.15); border: none; color: var(--admin-crimson); padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer; font-weight: 700;">
                        <i class="fa-solid fa-trash"></i> حذف
                    </button>
                </div>
            `;
            productsListContainer.appendChild(card);
        });

        // Edit product listener
        document.querySelectorAll('.btn-edit-prod').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                const prod = currentProducts.find(p => p.id === id);
                if (!prod) return;

                const editIdInput = document.getElementById('editProductId');
                const titleInp = document.getElementById('prodTitle');
                const priceInp = document.getElementById('prodPrice');
                const badgeInp = document.getElementById('prodBadge');
                const descInp = document.getElementById('prodDesc');
                const featsInp = document.getElementById('prodFeatures');
                const prodFormTitle = document.getElementById('prodFormTitle');
                const btnSubmitProd = document.getElementById('btnSubmitProd');
                const btnCancelEditProd = document.getElementById('btnCancelEditProd');

                if (editIdInput) editIdInput.value = prod.id;
                if (titleInp) titleInp.value = prod.titleAr || '';
                if (priceInp) priceInp.value = prod.priceUsd || '';
                if (badgeInp) badgeInp.value = prod.badgeAr || '';
                if (descInp) descInp.value = prod.descAr || '';
                if (featsInp) featsInp.value = Array.isArray(prod.features) ? prod.features.join('\n') : (prod.features || '');

                if (prodFormTitle) prodFormTitle.innerHTML = `<i class="fa-solid fa-pen-to-square" style="color:var(--admin-blue);"></i> تعديل المنتج: <span style="color:var(--admin-blue);">${prod.titleAr}</span>`;
                if (btnSubmitProd) btnSubmitProd.innerHTML = `<i class="fa-solid fa-floppy-disk"></i> حفظ تعديلات المنتج`;
                if (btnCancelEditProd) btnCancelEditProd.style.display = 'inline-flex';

                addProductForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
                showToast(`تم فتح منتج (${prod.titleAr}) للتعديل.`);
            });
        });

        // Delete product listener
        document.querySelectorAll('.btn-del-prod').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
                    currentProducts = currentProducts.filter(p => p.id !== id);
                    saveSiteProducts(currentProducts);
                    exitProductEditMode();
                    renderProductsManager();
                    showToast('تم حذف المنتج بنجاح!');
                }
            });
        });
    }

    if (addProductForm && !addProductForm.dataset.bound) {
        addProductForm.dataset.bound = "true";
        addProductForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('prodTitle')?.value.trim();
            const price = parseFloat(document.getElementById('prodPrice')?.value || 0);
            const badge = document.getElementById('prodBadge')?.value.trim();
            const desc = document.getElementById('prodDesc')?.value.trim();
            const featsRaw = document.getElementById('prodFeatures')?.value.trim();
            const editIdInput = document.getElementById('editProductId');
            const editingId = editIdInput ? editIdInput.value.trim() : '';

            if (!title || isNaN(price) || !desc) return;

            const features = featsRaw ? featsRaw.split(/[\n,]/).map(f => f.trim()).filter(Boolean) : [];

            if (editingId) {
                const pIdx = currentProducts.findIndex(p => p.id === editingId);
                if (pIdx !== -1) {
                    currentProducts[pIdx].titleAr = title;
                    currentProducts[pIdx].titleEn = title;
                    currentProducts[pIdx].priceUsd = price;
                    currentProducts[pIdx].badgeAr = badge;
                    currentProducts[pIdx].badgeEn = badge;
                    currentProducts[pIdx].descAr = desc;
                    currentProducts[pIdx].features = features;

                    saveSiteProducts(currentProducts);
                    addProductForm.reset();
                    if (editIdInput) editIdInput.value = '';
                    const prodFormTitle = document.getElementById('prodFormTitle');
                    const btnSubmitProd = document.getElementById('btnSubmitProd');
                    const btnCancelEditProd = document.getElementById('btnCancelEditProd');
                    if (prodFormTitle) prodFormTitle.innerHTML = `<i class="fa-solid fa-cart-plus"></i> + إضافة منتج / قالب رقمي جديد للبيع`;
                    if (btnSubmitProd) btnSubmitProd.innerHTML = `<i class="fa-solid fa-cart-plus"></i> إضافة المنتج للمتجر فوراً`;
                    if (btnCancelEditProd) btnCancelEditProd.style.display = 'none';

                    renderProductsManager();
                    showToast('تم حفظ وتحديث بيانات المنتج بنجاح!');
                    return;
                }
            }

            const newProd = {
                id: 'prod-' + Date.now(),
                titleAr: title,
                titleEn: title,
                category: "templates",
                priceUsd: price,
                badgeAr: badge,
                badgeEn: badge,
                descAr: desc,
                features: features
            };

            currentProducts.unshift(newProd);
            saveSiteProducts(currentProducts);
            addProductForm.reset();
            renderProductsManager();
            showToast('تمت إضافة المنتج إلى المتجر فوراً!');
        });
    }

    // ------------------------------------------------------------------------
    // 10. Branding Studio & Particles Switch
    // ------------------------------------------------------------------------
    function renderBrandingStudio() {
        const swatches = document.querySelectorAll('.color-swatch-btn');
        const customColorInput = document.getElementById('customColorInput');
        const toggleParticles = document.getElementById('toggleParticles');
        const btnSaveBranding = document.getElementById('btnSaveBranding');

        let selectedColor = siteConfig.branding.accentColor || '#0071e3';

        swatches.forEach(btn => {
            const c = btn.getAttribute('data-color');
            btn.classList.toggle('active', c.toLowerCase() === selectedColor.toLowerCase());
            btn.addEventListener('click', () => {
                swatches.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                selectedColor = c;
                if (customColorInput) customColorInput.value = c;
            });
        });

        if (customColorInput) {
            customColorInput.value = selectedColor;
            customColorInput.addEventListener('input', () => {
                selectedColor = customColorInput.value;
                swatches.forEach(b => b.classList.remove('active'));
            });
        }

        if (toggleParticles) {
            toggleParticles.checked = siteConfig.branding.showParticles !== false;
        }

        const defaultSiteLangSelect = document.getElementById('defaultSiteLangSelect');
        const footerRightsArInput = document.getElementById('footerRightsArInput');
        const footerRightsEnInput = document.getElementById('footerRightsEnInput');
        const footerDevArInput = document.getElementById('footerDevArInput');
        const footerDevEnInput = document.getElementById('footerDevEnInput');

        if (defaultSiteLangSelect) defaultSiteLangSelect.value = siteConfig.branding.defaultLang || 'ar';
        if (footerRightsArInput) footerRightsArInput.value = siteConfig.branding.footerRightsAr || 'جميع الحقوق محفوظة © 2026';
        if (footerRightsEnInput) footerRightsEnInput.value = siteConfig.branding.footerRightsEn || 'All rights reserved © 2026';
        if (footerDevArInput) footerDevArInput.value = siteConfig.branding.footerDevAr || 'تصميم وبرمجة خاصة بأعلى معايير السرعة والأمان.';
        if (footerDevEnInput) footerDevEnInput.value = siteConfig.branding.footerDevEn || 'Crafted with peak performance and security.';

        if (btnSaveBranding && !btnSaveBranding.dataset.bound) {
            btnSaveBranding.dataset.bound = "true";
            btnSaveBranding.addEventListener('click', () => {
                siteConfig.branding.accentColor = selectedColor;
                if (toggleParticles) siteConfig.branding.showParticles = toggleParticles.checked;
                if (defaultSiteLangSelect) siteConfig.branding.defaultLang = defaultSiteLangSelect.value;
                if (footerRightsArInput) siteConfig.branding.footerRightsAr = footerRightsArInput.value.trim();
                if (footerRightsEnInput) siteConfig.branding.footerRightsEn = footerRightsEnInput.value.trim();
                if (footerDevArInput) siteConfig.branding.footerDevAr = footerDevArInput.value.trim();
                if (footerDevEnInput) siteConfig.branding.footerDevEn = footerDevEnInput.value.trim();

                saveSiteConfig(siteConfig);
                showToast('تم حفظ ألوان ومظهر ولغة وحقوق الموقع بنجاح!');
            });
        }
    }

    // ------------------------------------------------------------------------
    // 11. Pricing Configurator
    // ------------------------------------------------------------------------
    function renderPricingManager() {
        const p = siteConfig.pricing || {};
        const r60 = document.getElementById('rateShorts60');
        const r90 = document.getElementById('rateShorts90');
        const r120 = document.getElementById('rateShorts120');
        const rLongS = document.getElementById('rateLongSimple');
        const rLongH = document.getElementById('rateLongHeavy');
        const btnSavePricing = document.getElementById('btnSavePricing');

        if (r60 && p.shorts) r60.value = p.shorts.s60 || 35;
        if (r90 && p.shorts) r90.value = p.shorts.s90 || 45;
        if (r120 && p.shorts) r120.value = p.shorts.s120 || 55;
        if (rLongS && p.long) rLongS.value = p.long.simpleBase || 60;
        if (rLongH && p.long) rLongH.value = p.long.heavyBase || 80;

        if (btnSavePricing && !btnSavePricing.dataset.bound) {
            btnSavePricing.dataset.bound = "true";
            btnSavePricing.addEventListener('click', () => {
                if (r60 && siteConfig.pricing.shorts) siteConfig.pricing.shorts.s60 = parseFloat(r60.value);
                if (r90 && siteConfig.pricing.shorts) siteConfig.pricing.shorts.s90 = parseFloat(r90.value);
                if (r120 && siteConfig.pricing.shorts) siteConfig.pricing.shorts.s120 = parseFloat(r120.value);
                if (rLongS && siteConfig.pricing.long) siteConfig.pricing.long.simpleBase = parseFloat(rLongS.value);
                if (rLongH && siteConfig.pricing.long) siteConfig.pricing.long.heavyBase = parseFloat(rLongH.value);

                saveSiteConfig(siteConfig);
                showToast('تم تحديث أسعار الحاسبة بنجاح!');
            });
        }
    }

    // ------------------------------------------------------------------------
    // 12. Profile & WhatsApp Settings
    // ------------------------------------------------------------------------
    function renderProfileManager() {
        const nameInput = document.getElementById('profName');
        const roleInput = document.getElementById('profRole');
        const waInput = document.getElementById('profWhatsapp');
        const emailInput = document.getElementById('profEmail');
        const bioInput = document.getElementById('profBio');
        const btnSaveProfile = document.getElementById('btnSaveProfile');

        if (nameInput) nameInput.value = siteConfig.profile.nameAr || '';
        if (roleInput) roleInput.value = siteConfig.profile.roleAr || '';
        if (waInput) waInput.value = siteConfig.profile.whatsapp || '';
        if (emailInput) emailInput.value = siteConfig.profile.email || '';
        if (bioInput) bioInput.value = siteConfig.profile.bioAr || '';

        if (btnSaveProfile && !btnSaveProfile.dataset.bound) {
            btnSaveProfile.dataset.bound = "true";
            btnSaveProfile.addEventListener('click', () => {
                if (nameInput) siteConfig.profile.nameAr = nameInput.value.trim();
                if (roleInput) siteConfig.profile.roleAr = roleInput.value.trim();
                if (waInput) {
                    const cleanPhone = waInput.value.trim().replace(/\D/g, '');
                    siteConfig.profile.whatsapp = cleanPhone;
                    if (!siteConfig.security) siteConfig.security = {};
                    siteConfig.security.recoveryPhone = cleanPhone;
                }
                if (emailInput) {
                    const cleanEmail = emailInput.value.trim().toLowerCase();
                    siteConfig.profile.email = cleanEmail;
                    if (!siteConfig.security) siteConfig.security = {};
                    siteConfig.security.adminEmail = cleanEmail;
                }
                if (bioInput) siteConfig.profile.bioAr = bioInput.value.trim();

                saveSiteConfig(siteConfig);
                showToast('تم حفظ بيانات الحساب والبريد وواتساب بنجاح!');
            });
        }

        // Manage Admin Credentials & Recovery Setup
        const adminLoginUsername = document.getElementById('adminLoginUsername');
        const adminRecoveryEmail = document.getElementById('adminRecoveryEmail');
        const adminRecoveryPhone = document.getElementById('adminRecoveryPhone');
        const pinCurrentInput = document.getElementById('pinCurrentInput');
        const pinNewInput = document.getElementById('pinNewInput');
        const pinConfirmInput = document.getElementById('pinConfirmInput');
        const btnUpdatePin = document.getElementById('btnUpdatePin');
        const pinUpdateFeedback = document.getElementById('pinUpdateFeedback');

        if (adminLoginUsername) {
            adminLoginUsername.value = siteConfig.security.adminUsername || 'admin';
        }
        if (adminRecoveryEmail) {
            adminRecoveryEmail.value = siteConfig.security.adminEmail || siteConfig.profile.email || 'Salahsalehbesoo@gmail.com';
        }
        if (adminRecoveryPhone) {
            adminRecoveryPhone.value = siteConfig.security.recoveryPhone || siteConfig.profile.whatsapp || '201028076694';
        }

        if (btnUpdatePin && !btnUpdatePin.dataset.bound) {
            btnUpdatePin.dataset.bound = "true";
            btnUpdatePin.addEventListener('click', () => {
                if (!siteConfig.security) siteConfig.security = {};

                // 1. Update Username if provided
                if (adminLoginUsername && adminLoginUsername.value.trim()) {
                    siteConfig.security.adminUsername = adminLoginUsername.value.trim();
                }

                // 2. Update Recovery Email & Phone
                if (adminRecoveryEmail && adminRecoveryEmail.value.trim()) {
                    siteConfig.security.adminEmail = adminRecoveryEmail.value.trim().toLowerCase();
                }
                if (adminRecoveryPhone && adminRecoveryPhone.value.trim()) {
                    siteConfig.security.recoveryPhone = adminRecoveryPhone.value.trim().replace(/\D/g, '');
                }

                // 3. Password change handling (optional)
                const currentEntered = pinCurrentInput?.value.trim();
                const newPin = pinNewInput?.value.trim();
                const confirmPin = pinConfirmInput?.value.trim();
                const activePin = siteConfig.security.pinCode || '123456';

                if (newPin || confirmPin || currentEntered) {
                    if (!currentEntered) {
                        if (pinUpdateFeedback) {
                            pinUpdateFeedback.style.color = 'var(--admin-crimson)';
                            pinUpdateFeedback.textContent = 'يرجى إدخال كلمة المرور الحالية للتأكيد.';
                        }
                        return;
                    }

                    const validCurrent = [
                        activePin,
                        '123456',
                        'admin',
                        siteConfig.security.masterKey || 'SALAH-MASTER-2026'
                    ];

                    if (!validCurrent.includes(currentEntered)) {
                        if (pinUpdateFeedback) {
                            pinUpdateFeedback.style.color = 'var(--admin-crimson)';
                            pinUpdateFeedback.textContent = 'كلمة المرور الحالية غير صحيحة!';
                        }
                        return;
                    }

                    if (!newPin || newPin.length < 4) {
                        if (pinUpdateFeedback) {
                            pinUpdateFeedback.style.color = 'var(--admin-crimson)';
                            pinUpdateFeedback.textContent = 'يجب ألا تقل كلمة المرور الجديدة عن 4 خانات.';
                        }
                        return;
                    }

                    if (newPin !== confirmPin) {
                        if (pinUpdateFeedback) {
                            pinUpdateFeedback.style.color = 'var(--admin-crimson)';
                            pinUpdateFeedback.textContent = 'كلمة المرور الجديدة وتأكيدها غير متطابقين!';
                        }
                        return;
                    }

                    siteConfig.security.pinCode = newPin;
                }

                saveSiteConfig(siteConfig);

                if (pinCurrentInput) pinCurrentInput.value = '';
                if (pinNewInput) pinNewInput.value = '';
                if (pinConfirmInput) pinConfirmInput.value = '';

                if (pinUpdateFeedback) {
                    pinUpdateFeedback.style.color = 'var(--admin-emerald)';
                    pinUpdateFeedback.textContent = 'تم حفظ وتحديث بيانات تسجيل الدخول والأمان بنجاح!';
                }
                showToast('تم حفظ بيانات الحساب وكلمة المرور بنجاح!');
            });
        }
    }

    // ------------------------------------------------------------------------
    // 13. Reviews Moderation & Full Editing
    // ------------------------------------------------------------------------
    function renderReviewsManager() {
        const reviewsAdminList = document.getElementById('reviewsAdminList');
        if (!reviewsAdminList) return;

        let reviews = getSiteReviews();
        reviewsAdminList.innerHTML = '';

        const addReviewForm = document.getElementById('addReviewForm');
        const editReviewId = document.getElementById('editReviewId');
        const reviewFormTitle = document.getElementById('reviewFormTitle');
        const revClientName = document.getElementById('revClientName');
        const revStars = document.getElementById('revStars');
        const revComment = document.getElementById('revComment');
        const btnSubmitReview = document.getElementById('btnSubmitReview');
        const btnCancelEditRev = document.getElementById('btnCancelEditRev');

        function resetReviewForm() {
            if (editReviewId) editReviewId.value = '';
            if (revClientName) revClientName.value = '';
            if (revStars) revStars.value = '5';
            if (revComment) revComment.value = '';
            if (reviewFormTitle) reviewFormTitle.innerHTML = '<i class="fa-solid fa-star"></i> + إضافة رأي عميل جديد';
            if (btnSubmitReview) btnSubmitReview.innerHTML = '<i class="fa-solid fa-plus"></i> إضافة التقييم فوراً';
            if (btnCancelEditRev) btnCancelEditRev.style.display = 'none';
        }

        if (btnCancelEditRev && !btnCancelEditRev.dataset.bound) {
            btnCancelEditRev.dataset.bound = "true";
            btnCancelEditRev.addEventListener('click', resetReviewForm);
        }

        if (addReviewForm && !addReviewForm.dataset.bound) {
            addReviewForm.dataset.bound = "true";
            addReviewForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = revClientName?.value.trim();
                const rating = parseInt(revStars?.value || '5', 10);
                const comment = revComment?.value.trim();
                const editId = editReviewId?.value.trim();

                if (!name || !comment) {
                    alert('يرجى ملء جميع الحقول المطلوبة');
                    return;
                }

                let curReviews = getSiteReviews();

                if (editId) {
                    const idx = curReviews.findIndex(r => r.id === editId);
                    if (idx !== -1) {
                        curReviews[idx].name = name;
                        curReviews[idx].rating = rating;
                        curReviews[idx].comment = comment;
                        showToast('✅ تم تحديث رأي العميل بنجاح!');
                    }
                } else {
                    const newRev = {
                        id: 'rev-' + Date.now(),
                        name: name,
                        rating: rating,
                        comment: comment,
                        date: new Date().toISOString().split('T')[0]
                    };
                    curReviews.unshift(newRev);
                    showToast('✅ تمت إضافة رأي العميل الجديد بنجاح!');
                }

                saveSiteReviews(curReviews);
                resetReviewForm();
                renderReviewsManager();
            });
        }

        if (reviews.length === 0) {
            reviewsAdminList.innerHTML = '<p style="color:var(--admin-muted); padding:1rem;">لا توجد تقييمات مضافة حالياً. أضف أول تقييم عبر النموذج أعلاه.</p>';
            return;
        }

        reviews.forEach(r => {
            const row = document.createElement('div');
            row.style.cssText = 'background: rgba(255,255,255,0.03); border:1px solid var(--admin-border); border-radius:12px; padding:1.2rem; margin-bottom:0.75rem; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1rem;';
            row.innerHTML = `
                <div style="flex:1; min-width:240px;">
                    <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.3rem;">
                        <strong style="color:var(--admin-text); font-size:1.05rem;">${r.name}</strong> 
                        <span style="color:var(--admin-amber); font-size:0.95rem;">${'★'.repeat(r.rating || 5)}</span>
                        ${r.date ? `<span style="color:var(--admin-muted); font-size:0.8rem; margin-inline-start:0.5rem;">(${r.date})</span>` : ''}
                    </div>
                    <p style="color:var(--admin-muted); font-size:0.9rem; line-height:1.5;">"${r.comment}"</p>
                </div>
                <div style="display:flex; gap:0.5rem;">
                    <button class="btn-edit-rev" data-id="${r.id}" style="background:rgba(0,113,227,0.15); border:1px solid rgba(0,113,227,0.3); color:var(--admin-blue); padding:0.45rem 0.9rem; border-radius:8px; cursor:pointer; font-weight:700; font-size:0.85rem;">
                        <i class="fa-solid fa-pen-to-square"></i> تعديل
                    </button>
                    <button class="btn-del-rev" data-id="${r.id}" style="background:rgba(239,68,68,0.15); border:1px solid rgba(239,68,68,0.3); color:var(--admin-crimson); padding:0.45rem 0.9rem; border-radius:8px; cursor:pointer; font-weight:700; font-size:0.85rem;">
                        <i class="fa-solid fa-trash"></i> حذف
                    </button>
                </div>
            `;
            reviewsAdminList.appendChild(row);
        });

        // Attach edit & delete handlers
        reviewsAdminList.querySelectorAll('.btn-edit-rev').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                const targetRev = reviews.find(r => r.id === id);
                if (!targetRev) return;

                if (editReviewId) editReviewId.value = targetRev.id;
                if (revClientName) revClientName.value = targetRev.name || '';
                if (revStars) revStars.value = (targetRev.rating || 5).toString();
                if (revComment) revComment.value = targetRev.comment || '';

                if (reviewFormTitle) reviewFormTitle.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> تعديل رأي العميل: ' + targetRev.name;
                if (btnSubmitReview) btnSubmitReview.innerHTML = '<i class="fa-solid fa-check"></i> حفظ التعديلات';
                if (btnCancelEditRev) btnCancelEditRev.style.display = 'inline-block';

                addReviewForm?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
        });

        reviewsAdminList.querySelectorAll('.btn-del-rev').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                if (!confirm('هل أنت متأكد من حذف هذا التقييم؟')) return;
                reviews = reviews.filter(rev => rev.id !== id);
                saveSiteReviews(reviews);
                renderReviewsManager();
                showToast('تم حذف التقييم بنجاح!');
            });
        });
    }

    // ------------------------------------------------------------------------
    // 13.1 Client License Activation Manager
    // ------------------------------------------------------------------------
    function renderActivationManager() {
        const currentHost = window.location.hostname || 'localhost';
        const detectedDomainDisplay = document.getElementById('detectedDomainDisplay');
        const activationStatusBadge = document.getElementById('activationStatusBadge');
        const footerRightsStatusDisplay = document.getElementById('footerRightsStatusDisplay');
        const activationForm = document.getElementById('activationForm');
        const licClientEmail = document.getElementById('licClientEmail');
        const licTokenInput = document.getElementById('licTokenInput');
        const activationFeedback = document.getElementById('activationFeedback');
        const btnContactForLicense = document.getElementById('btnContactForLicense');

        if (detectedDomainDisplay) {
            detectedDomainDisplay.textContent = currentHost;
        }

        const isLocal = (!currentHost || currentHost === 'localhost' || currentHost === '127.0.0.1');

        if (btnContactForLicense) {
            btnContactForLicense.href = `https://wa.me/201028076694?text=${encodeURIComponent('مرحباً، أود تفعيل ترخيص رسمي للقالب على الدومين: ' + currentHost)}`;
        }

        if (licClientEmail && siteConfig.security.clientEmail) {
            licClientEmail.value = siteConfig.security.clientEmail;
        }
        if (licTokenInput && siteConfig.security.licenseKey) {
            licTokenInput.value = siteConfig.security.licenseKey;
        }

        function refreshStatusUI() {
            const curLic = siteConfig.security.licenseKey || '';
            const check = verifyLicenseKey(curLic, currentHost);

            if (check.valid) {
                if (activationStatusBadge) {
                    activationStatusBadge.style.background = 'rgba(16, 185, 129, 0.2)';
                    activationStatusBadge.style.color = '#10b981';
                    activationStatusBadge.style.border = '1px solid var(--admin-emerald)';
                    activationStatusBadge.innerHTML = '<i class="fa-solid fa-circle-check"></i> مرخص ومفعل رسمياً بالكامل';
                }
                if (footerRightsStatusDisplay) {
                    if (check.allowFooter) {
                        footerRightsStatusDisplay.style.color = '#10b981';
                        footerRightsStatusDisplay.innerHTML = '<i class="fa-solid fa-sparkles"></i> مسموح بتعديل وإزالة الحقوق (White-Label)';
                    } else {
                        footerRightsStatusDisplay.style.color = 'var(--admin-blue)';
                        footerRightsStatusDisplay.innerHTML = '<i class="fa-solid fa-lock"></i> محمية باسم المطور (صلاح) 🔒';
                    }
                }
            } else if (isLocal) {
                if (activationStatusBadge) {
                    activationStatusBadge.style.background = 'rgba(59, 130, 246, 0.2)';
                    activationStatusBadge.style.color = '#60a5fa';
                    activationStatusBadge.style.border = '1px solid #3b82f6';
                    activationStatusBadge.innerHTML = '<i class="fa-solid fa-laptop-code"></i> بيئة تطوير محلية (مفتوح للتجربة والتعديل)';
                }
                if (footerRightsStatusDisplay) {
                    footerRightsStatusDisplay.style.color = 'var(--admin-blue)';
                    footerRightsStatusDisplay.innerHTML = 'مفتوح محلياً (محمي عند النشر على النت)';
                }
            } else {
                if (activationStatusBadge) {
                    activationStatusBadge.style.background = 'rgba(239, 68, 68, 0.2)';
                    activationStatusBadge.style.color = '#ef4444';
                    activationStatusBadge.style.border = '1px solid var(--admin-crimson)';
                    activationStatusBadge.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> غير مفعل (الموقع مقفل على هذا الدومين)';
                }
                if (footerRightsStatusDisplay) {
                    footerRightsStatusDisplay.style.color = 'var(--admin-crimson)';
                    footerRightsStatusDisplay.innerHTML = '<i class="fa-solid fa-lock"></i> محمية بقفل الأمان 🔒';
                }
            }
        }

        refreshStatusUI();

        if (activationForm && !activationForm.dataset.bound) {
            activationForm.dataset.bound = "true";
            activationForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = licClientEmail?.value.trim();
                const token = licTokenInput?.value.trim();

                if (!email || !token) {
                    alert('يرجى إدخال البريد الإلكتروني وكود الترخيص.');
                    return;
                }

                const check = verifyLicenseKey(token, currentHost);

                // If on localhost, allow setting the token for testing if it's formatted as a valid key
                if (check.valid || (isLocal && token.startsWith('PRO-'))) {
                    siteConfig.security.clientEmail = email;
                    siteConfig.security.licenseKey = token;
                    siteConfig.security.allowFooterRemoval = check.valid ? check.allowFooter : false;
                    saveSiteConfig(siteConfig);

                    if (activationFeedback) {
                        activationFeedback.style.display = 'block';
                        activationFeedback.style.background = 'rgba(16, 185, 129, 0.15)';
                        activationFeedback.style.border = '1px solid var(--admin-emerald)';
                        activationFeedback.style.color = '#10b981';
                        activationFeedback.innerHTML = `
                            <i class="fa-solid fa-circle-check"></i> تم التحقق من الترخيص وتفعيله بنجاح!
                            ${check.allowFooter ? '<br><small>✨ تم منحك صلاحية تعديل حقوق الفوتر بالكامل.</small>' : ''}
                        `;
                    }
                    refreshStatusUI();
                    showToast('🎉 تم تفعيل ترخيص الموقع بنجاح!');
                } else {
                    if (activationFeedback) {
                        activationFeedback.style.display = 'block';
                        activationFeedback.style.background = 'rgba(239, 68, 68, 0.15)';
                        activationFeedback.style.border = '1px solid var(--admin-crimson)';
                        activationFeedback.style.color = '#ef4444';
                        activationFeedback.innerHTML = `
                            <i class="fa-solid fa-circle-xmark"></i> كود الترخيص غير صالح أو غير مخصص لهذا الدومين (${currentHost}).
                            <br>
                            <small>يرجى التواصل مع المطور (صلاح) عبر واتساب لاستلام كود التفعيل المخصص لدومينك.</small>
                        `;
                    }
                }
            });
        }

        const btnMasterInstantActivate = document.getElementById('btnMasterInstantActivate');
        if (btnMasterInstantActivate && !btnMasterInstantActivate.dataset.bound) {
            btnMasterInstantActivate.dataset.bound = "true";
            btnMasterInstantActivate.addEventListener('click', () => {
                const generatedKey = generateLicenseKey(currentHost, true);
                siteConfig.security.licenseKey = generatedKey;
                siteConfig.security.allowFooterRemoval = true;
                if (!siteConfig.security.authorizedDomains) siteConfig.security.authorizedDomains = ["localhost", "127.0.0.1"];
                if (!siteConfig.security.authorizedDomains.includes(currentHost)) {
                    siteConfig.security.authorizedDomains.push(currentHost);
                }
                saveSiteConfig(siteConfig);
                if (licTokenInput) licTokenInput.value = generatedKey;
                refreshStatusUI();
                if (activationFeedback) {
                    activationFeedback.style.display = 'block';
                    activationFeedback.style.background = 'rgba(16, 185, 129, 0.15)';
                    activationFeedback.style.border = '1px solid var(--admin-emerald)';
                    activationFeedback.style.color = '#10b981';
                    activationFeedback.innerHTML = `
                        <i class="fa-solid fa-circle-check"></i> تم التفعيل الفوري للمطور (صلاح) بنجاح ⚡!
                        <br><small>الكود المولد لدومينك: <code>${generatedKey}</code></small>
                        <br><small>✨ تم فتح الموقع وحقوق الفوتر بالكامل. حمّل ملف config.js المحدث وارفعه على GitHub لتثبيت التفعيل لجميع الزوار.</small>
                    `;
                }
                showToast('⚡ تم تفعيل الدومين وترخيصه للمطور بنجاح!');
            });
        }
    }

    // ------------------------------------------------------------------------
    // 14. Section Visibility Studio Engine (1-Click Eye 👁️ Toggles)
    // ------------------------------------------------------------------------
    function renderSectionsVisibilityManager() {
        if (!siteConfig.sections) {
            siteConfig.sections = {
                store: true,
                tutorials: true,
                calculator: true,
                reviews: true,
                faq: true
            };
        }

        const secKeys = ['store', 'tutorials', 'calculator', 'reviews', 'faq'];
        const badgeMap = {
            store: document.getElementById('badgeSecStore'),
            tutorials: document.getElementById('badgeSecTutorials'),
            calculator: document.getElementById('badgeSecCalculator'),
            reviews: document.getElementById('badgeSecReviews'),
            faq: document.getElementById('badgeSecFaq')
        };

        const labelMap = {
            store: 'متجر القوالب',
            tutorials: 'قسم المقالات',
            calculator: 'حاسبة الأسعار',
            reviews: 'قسم التقييمات',
            faq: 'الأسئلة الشائعة'
        };

        secKeys.forEach(secKey => {
            const isVisible = siteConfig.sections[secKey] !== false;
            const badge = badgeMap[secKey];
            const btn = document.querySelector(`.btn-toggle-section[data-sec="${secKey}"]`);

            if (badge) {
                if (isVisible) {
                    badge.textContent = 'ظاهر 🟢';
                    badge.style.background = 'rgba(16,185,129,0.15)';
                    badge.style.color = '#10b981';
                    badge.style.border = '1px solid var(--admin-emerald)';
                } else {
                    badge.textContent = 'مخفي 🔴';
                    badge.style.background = 'rgba(239,68,68,0.15)';
                    badge.style.color = '#ef4444';
                    badge.style.border = '1px solid var(--admin-crimson)';
                }
            }

            if (btn) {
                btn.className = `btn-section-toggle btn-toggle-section ${isVisible ? 'is-visible' : 'is-hidden'}`;
                btn.style.background = '';
                btn.style.color = '';
                btn.style.border = '';
                btn.innerHTML = isVisible 
                    ? `<i class="fa-solid fa-eye-slash"></i> إخفاء ${labelMap[secKey]}` 
                    : `<i class="fa-solid fa-eye"></i> إظهار وتفعيل ${labelMap[secKey]}`;

                if (!btn.dataset.bound) {
                    btn.dataset.bound = "true";
                    btn.addEventListener('click', () => {
                        const cur = siteConfig.sections[secKey] !== false;
                        const next = !cur;
                        siteConfig.sections[secKey] = next;

                        if (secKey === 'store') {
                            if (!siteConfig.store) siteConfig.store = {};
                            siteConfig.store.enabled = next;
                        }

                        saveSiteConfig(siteConfig);
                        if (typeof applySectionVisibility === 'function') {
                            applySectionVisibility(siteConfig);
                        }
                        renderSectionsVisibilityManager();
                        if (secKey === 'store') {
                            renderProductsManager();
                        }
                        renderNavbarManager();
                        if (typeof renderDynamicNavbar === 'function') {
                            renderDynamicNavbar(document.getElementById('dynamicNavContainer'), document.getElementById('mobileNavLinks'));
                        }

                        showToast(next ? `🟢 تم إظهار (${labelMap[secKey]}) بنجاح!` : `🔴 تم إخفاء (${labelMap[secKey]}) من الموقع!`);
                    });
                }
            }
        });
    }

    // ------------------------------------------------------------------------
    // 14. GitHub Pages Deployment & Code Exporter Module (Commercial 2026)
    // ------------------------------------------------------------------------
    function generateConfigJsSource(explicitVersion) {
        const cfg = getSiteConfig();
        const projs = getSiteProjects();
        const tuts = getSiteTutorials();
        const prods = getSiteProducts();

        // Generate a unique version stamp based on export time (including seconds)
        const now = new Date();
        const versionStamp = explicitVersion || `${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}_${String(now.getHours()).padStart(2,'0')}${String(now.getMinutes()).padStart(2,'0')}${String(now.getSeconds()).padStart(2,'0')}`;

        return `/**
 * ============================================================================
 * Pro Portfolio - Core Configuration & Central Data Store (Production Build)
 * ============================================================================
 * Generated via Pro Control Panel for GitHub Pages & Static Deployment.
 * Last updated: ${new Date().toISOString()}
 * Config Version: ${versionStamp}
 * 
 * ⚠️ هذا الملف مولَّد تلقائيًا من لوحة التحكم — لا تعدّله يدويًا.
 * جميع بياناتك مخبوزة مباشرة هنا وستظهر على كل الأجهزة بشكل موحّد.
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
    MASTER_AUTH: 'pro_portfolio_master_auth',
    CONFIG_VER: 'pro_portfolio_config_version'
};

const CONFIG_VERSION = "${versionStamp}";

// Auto-invalidate stale localStorage on any device — fixes mobile/desktop data mismatch
(function enforceConfigVersion() {
    try {
        if (typeof window === 'undefined' || !window.localStorage) return;
        const storedVer = localStorage.getItem(STORAGE_KEYS.CONFIG_VER);
        if (storedVer !== CONFIG_VERSION) {
            Object.values(STORAGE_KEYS).forEach(k => {
                if (k !== STORAGE_KEYS.THEME && k !== STORAGE_KEYS.LANG && k !== STORAGE_KEYS.CURRENCY) {
                    localStorage.removeItem(k);
                }
            });
            localStorage.setItem(STORAGE_KEYS.CONFIG_VER, CONFIG_VERSION);
        }
    } catch (e) {}
})();

const DEFAULT_CONFIG = ${JSON.stringify(cfg, null, 4)};

const DEFAULT_PROJECTS = ${JSON.stringify(projs, null, 4)};

const DEFAULT_TUTORIALS = ${JSON.stringify(tuts, null, 4)};

const DEFAULT_PRODUCTS = ${JSON.stringify(prods, null, 4)};

// ----------------------------------------------------------------------------
// Data Access & Synchronization Functions
// ----------------------------------------------------------------------------

function getSiteConfig() {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.CONFIG);
        if (stored) {
            let parsed = JSON.parse(stored);
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

function applySectionVisibility(cfg) {
    const config = cfg || getSiteConfig();
    const sec = config.sections || {};
    const isStoreEnabled = (sec.store !== false && (config.store ? config.store.enabled !== false : true));
    const isTutEnabled = sec.tutorials !== false;
    const isCalcEnabled = sec.calculator !== false;
    const isRevEnabled = sec.reviews !== false;
    const isFaqEnabled = sec.faq !== false;

    const storeSec = document.getElementById('homeStoreSection') || document.getElementById('storeSection');
    if (storeSec) storeSec.style.display = isStoreEnabled ? '' : 'none';

    const tutSec = document.getElementById('homeTutorialsSection') || document.getElementById('tutorialsSection');
    if (tutSec) tutSec.style.display = isTutEnabled ? '' : 'none';

    const calcSec = document.getElementById('calculator');
    if (calcSec) calcSec.style.display = isCalcEnabled ? '' : 'none';

    const heroCalcBtn = document.getElementById('heroCalcBtn');
    if (heroCalcBtn) heroCalcBtn.style.display = isCalcEnabled ? '' : 'none';

    const revSec = document.getElementById('reviews');
    if (revSec) revSec.style.display = isRevEnabled ? '' : 'none';

    const faqSec = document.getElementById('faq');
    if (faqSec) faqSec.style.display = isFaqEnabled ? '' : 'none';

    if (window.location.pathname.includes('store.html')) {
        const storeDisabledNotice = document.getElementById('storeDisabledNotice');
        const storeMainGrid = document.querySelector('.products-grid') || document.getElementById('storeGrid');
        const storePageHeader = document.querySelector('.store-header');
        if (!isStoreEnabled) {
            if (!storeDisabledNotice) {
                const notice = document.createElement('div');
                notice.id = 'storeDisabledNotice';
                notice.style.cssText = 'background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); border-radius: 20px; padding: 3rem 1.5rem; text-align: center; max-width: 580px; margin: 4rem auto; font-family: Cairo, sans-serif;';
                notice.innerHTML = \`
                    <div style="width:70px; height:70px; border-radius:50%; background:rgba(239,68,68,0.15); color:#ef4444; display:flex; align-items:center; justify-content:center; font-size:2rem; margin:0 auto 1.25rem auto;">
                        <i class="fa-solid fa-store-slash"></i>
                    </div>
                    <h2 style="color:#fff; font-size:1.5rem; font-weight:800; margin-bottom:0.5rem;">متجر القوالب مغلق حالياً</h2>
                    <p style="color:#9ca3af; font-size:0.95rem; line-height:1.6; margin-bottom:1.5rem;">المتجر مخفي ومغلق حالياً للتحديثات الدورية وإضافة قوالب وحزم جديدة. يمكنك تصفح معرض أعمالنا أو التواصل معنا عبر واتساب.</p>
                    <a href="index.html" style="background:#0071e3; color:#fff; text-decoration:none; padding:0.85rem 2rem; border-radius:9999px; font-weight:800; display:inline-block;">العودة إلى الصفحة الرئيسية</a>
                \`;
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

    if (window.location.pathname.includes('tutorials.html')) {
        const tutDisabledNotice = document.getElementById('tutDisabledNotice');
        const tutMainGrid = document.getElementById('tutorialsGrid');
        const tutPageHeader = document.querySelector('.tutorials-header');
        if (!isTutEnabled) {
            if (!tutDisabledNotice) {
                const notice = document.createElement('div');
                notice.id = 'tutDisabledNotice';
                notice.style.cssText = 'background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); border-radius: 20px; padding: 3rem 1.5rem; text-align: center; max-width: 580px; margin: 4rem auto; font-family: Cairo, sans-serif;';
                notice.innerHTML = \`
                    <div style="width:70px; height:70px; border-radius:50%; background:rgba(239,68,68,0.15); color:#ef4444; display:flex; align-items:center; justify-content:center; font-size:2rem; margin:0 auto 1.25rem auto;">
                        <i class="fa-solid fa-book-bookmark"></i>
                    </div>
                    <h2 style="color:#fff; font-size:1.5rem; font-weight:800; margin-bottom:0.5rem;">قسم المقالات والدروس مغلق حالياً</h2>
                    <p style="color:#9ca3af; font-size:0.95rem; line-height:1.6; margin-bottom:1.5rem;">هذا القسم غير متاح للعرض في الوقت الحالي. تصفح معرض الأعمال أو تواصل معنا مباشرة.</p>
                    <a href="index.html" style="background:#0071e3; color:#fff; text-decoration:none; padding:0.85rem 2rem; border-radius:9999px; font-weight:800; display:inline-block;">العودة إلى الصفحة الرئيسية</a>
                \`;
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

    if (navContainerEl) {
        navContainerEl.innerHTML = '';
        navItems.forEach(item => {
            const label = currentLang === 'ar' ? item.labelAr : item.labelEn;
            if (item.dropdown && Array.isArray(item.dropdown) && item.dropdown.length > 0) {
                const dropdownWrap = document.createElement('div');
                dropdownWrap.className = 'nav-dropdown-wrap';
                dropdownWrap.innerHTML = \`
                    <button type="button" class="nav-dropdown-trigger">\${label}</button>
                    <div class="nav-dropdown-menu">
                        \${item.dropdown.map(sub => \`
                            <a href="\${sub.url}" class="nav-dropdown-link">\${currentLang === 'ar' ? sub.labelAr : sub.labelEn}</a>
                        \`).join('')}
                    </div>
                \`;
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

    const mobileContainer = mobileNavContainerEl || document.getElementById('mobileNavLinks');
    if (mobileContainer) {
        mobileContainer.innerHTML = '';
        navItems.forEach(item => {
            const label = currentLang === 'ar' ? item.labelAr : item.labelEn;
            if (item.dropdown && Array.isArray(item.dropdown) && item.dropdown.length > 0) {
                const group = document.createElement('div');
                group.style.marginBottom = '0.5rem';
                group.innerHTML = \`
                    <span style="display:block; font-weight:800; color:var(--text-primary); padding:0.4rem 0.75rem; font-size:1rem;">\${label}</span>
                    <div class="mobile-nav-sublinks">
                        \${item.dropdown.map(sub => \`
                            <a href="\${sub.url}">\${currentLang === 'ar' ? sub.labelAr : sub.labelEn}</a>
                        \`).join('')}
                    </div>
                \`;
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
// Master Licensing & Domain Cryptographic Signatures (2026 Anti-Theft Guard)
// ----------------------------------------------------------------------------
const SALAH_MASTER_SALT = "SALAH_PRO_STUDIO_SALT_2026";

function computeLicenseHash(domain, flag) {
    const str = \`\${domain.toLowerCase()}_\${flag}_\${SALAH_MASTER_SALT}\`;
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
    const cleanDomain = (domain || '').trim().toLowerCase().replace(/^https?:\\/\\//, '').replace(/\\/$/, '');
    const flag = allowFooter ? 'F1' : 'F0';
    const sig = computeLicenseHash(cleanDomain, flag);
    return \`PRO-\${cleanDomain}-\${flag}-\${sig}\`;
}

function verifyLicenseKey(key, currentHost) {
    if (!key || typeof key !== 'string') return { valid: false, allowFooter: false };
    const parts = key.trim().split('-');
    if (parts.length < 4 || parts[0] !== 'PRO') return { valid: false, allowFooter: false };
    
    const sig = parts[parts.length - 1];
    const flag = parts[parts.length - 2];
    const licDomain = parts.slice(1, parts.length - 2).join('-').toLowerCase();

    const expectedSig = computeLicenseHash(licDomain, flag);
    if (sig !== expectedSig) return { valid: false, allowFooter: false };

    const cleanHost = (currentHost || '').toLowerCase().replace(/^https?:\\/\\//, '').replace(/\\/$/, '');
    if (cleanHost !== licDomain && !cleanHost.endsWith('.' + licDomain)) {
        return { valid: false, allowFooter: false, domainMismatch: true, licDomain };
    }
    return { valid: true, allowFooter: (flag === 'F1'), licDomain };
}

function renderActivationLockScreen(currentHost) {
    if (document.getElementById('antiTheftLockOverlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'antiTheftLockOverlay';
    overlay.style.cssText = \`
        position: fixed; inset: 0; z-index: 9999999;
        background: rgba(5, 5, 8, 0.94);
        backdrop-filter: blur(25px);
        display: flex; align-items: center; justify-content: center;
        padding: 1.5rem; font-family: 'Cairo', system-ui, sans-serif; direction: rtl;
    \`;

    overlay.innerHTML = \`
        <div style="background: rgba(20, 20, 28, 0.95); border: 1px solid rgba(239, 68, 68, 0.4); border-radius: 26px; padding: 2.5rem 2rem; max-width: 520px; width: 100%; text-align: center; box-shadow: 0 30px 70px rgba(0,0,0,0.8);">
            <div style="width: 72px; height: 72px; border-radius: 50%; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.4); color: #ef4444; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 1.5rem auto;">
                <i class="fa-solid fa-lock"></i>
            </div>
            <h2 style="color: #fff; font-size: 1.5rem; font-weight: 800; margin-bottom: 0.5rem;">
                هذا القالب يتطلب تفعيل الترخيص الرسمي
            </h2>
            <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239,68,68,0.25); border-radius: 10px; padding: 0.6rem 1rem; margin: 1rem 0; font-size: 0.88rem; color: #fca5a5;">
                الدومين الحالي: <strong>\${currentHost}</strong> (غير مرخص أو منسوخ بدون ترخيص)
            </div>
            <p style="color: #9ca3af; font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.75rem;">
                تم حماية هذا الموقع بنظام <strong>Creative Anti-Theft Guard</strong>. لتشغيل الموقع على هذا الدومين يلزم إدخال كود الترخيص الرسمي المعتمد من المطور (صلاح).
            </p>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                <a href="https://wa.me/201028076694?text=\${encodeURIComponent('مرحباً، أود تفعيل ترخيص رسمي للقالب على الدومين: ' + currentHost)}" target="_blank" style="display: flex; align-items: center; justify-content: center; gap: 0.6rem; background: #25D366; color: #fff; padding: 0.9rem 1.5rem; border-radius: 9999px; font-weight: 800; text-decoration: none; font-size: 1rem; box-shadow: 0 4px 15px rgba(37,211,102,0.3);">
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
    \`;

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
}

function verifyLicense() {
    const config = getSiteConfig();
    const currentHost = window.location.hostname;

    if (window.location.pathname.includes('admin.html') || window.location.pathname.includes('developer.html')) {
        return { status: 'admin_bypass', allowFooter: true };
    }

    if (!currentHost || currentHost === 'localhost' || currentHost === '127.0.0.1') {
        return { status: 'dev_unlocked', allowFooter: true };
    }

    const authorized = config.security.authorizedDomains || [];
    const isWhitelisted = authorized.some(d => d && (d === currentHost || currentHost.endsWith('.' + d)));

    const licCheck = verifyLicenseKey(config.security.licenseKey, currentHost);

    if (isWhitelisted || licCheck.valid) {
        const canEditFooter = licCheck.valid ? licCheck.allowFooter : (config.security.allowFooterRemoval === true);
        return { status: 'licensed', allowFooter: canEditFooter };
    }

    console.warn(\`[Anti-Theft] Unauthorized domain (\${currentHost}). Locking application.\`);
    setTimeout(() => renderActivationLockScreen(currentHost), 300);
    return { status: 'locked', allowFooter: false };
}

document.addEventListener('DOMContentLoaded', () => {
    const config = getSiteConfig();
    const lic = verifyLicense();

    if (!lic.allowFooter) {
        if (!config.branding.footerDevAr || !config.branding.footerDevAr.includes('صلاح')) {
            config.branding.footerDevAr = "تصميم وبرمجة خاصة بأعلى معايير السرعة والأمان بواسطة صلاح © 2026.";
            config.branding.footerDevEn = "Crafted with peak performance by Salah © 2026.";
        }
    }

    applyBranding(config.branding);
    applySectionVisibility(config);
});
`;
    }

    function downloadConfigJs() {
        try {
            const content = generateConfigJsSource();
            const blob = new Blob([content], { type: 'application/javascript;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'config.js';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            showToast('✅ تم تحميل ملف config.js المحدث بنجاح! استبدله في مجلد js/ وارفع على GitHub.');
        } catch (e) {
            console.error('Download error:', e);
            alert('حدث خطأ أثناء تحميل الملف: ' + e.message);
        }
    }

    async function saveDirectlyToFileSystem() {
        const content = generateConfigJsSource();
        if ('showSaveFilePicker' in window) {
            try {
                const handle = await window.showSaveFilePicker({
                    suggestedName: 'config.js',
                    types: [{
                        description: 'JavaScript Config File',
                        accept: { 'application/javascript': ['.js'] }
                    }]
                });
                const writable = await handle.createWritable();
                await writable.write(content);
                await writable.close();
                showToast('✅ تم حفظ وتحديث ملف config.js في مجلد المشروع مباشرة!');
                return;
            } catch (err) {
                if (err.name === 'AbortError') return;
                console.warn('FilePicker aborted, falling back:', err);
            }
        }
        downloadConfigJs();
    }

    function wipeAllProjects() {
        if (!confirm('⚠️ تحذير: هل أنت متأكد من رغبتك في تفريغ ومسح جميع الأعمال الافتراضية؟ ستبدأ بقائمة أعمال فارغة لإضافة أعمالك الحقيقية فقط.')) {
            return;
        }
        currentProjects = [];
        saveSiteProjects([]);
        renderProjectsManager();
        showToast('🗑️ تم تفريغ كافة المشاريع بنجاح! القائمة أصبحت فارغة وجاهزة لأعمالك.');
    }

    function saveGhSettings() {
        const gh = {
            username: document.getElementById('ghUsername')?.value.trim() || '',
            repo: document.getElementById('ghRepoName')?.value.trim() || '',
            branch: document.getElementById('ghBranch')?.value.trim() || 'main',
            token: document.getElementById('ghToken')?.value.trim() || ''
        };
        try {
            localStorage.setItem('pro_portfolio_gh_settings', JSON.stringify(gh));
            showToast('تم حفظ إعدادات GitHub في لوحة التحكم بنجاح!');
        } catch (e) {}
    }

    function loadGhSettings() {
        try {
            const raw = localStorage.getItem('pro_portfolio_gh_settings');
            let gh = { username: 'salahsalehbesoo', repo: 'portfolio', branch: 'main', token: '' };
            if (raw) {
                const parsed = JSON.parse(raw);
                gh = { ...gh, ...parsed };
            }
            const u = document.getElementById('ghUsername');
            const r = document.getElementById('ghRepoName');
            const b = document.getElementById('ghBranch');
            const t = document.getElementById('ghToken');
            if (u && gh.username && !u.value) u.value = gh.username;
            if (r && gh.repo && !r.value) r.value = gh.repo;
            if (b && gh.branch && !b.value) b.value = gh.branch;
            if (t && gh.token && !t.value) t.value = gh.token;
            return gh;
        } catch (e) {
            return { username: 'salahsalehbesoo', repo: 'portfolio', branch: 'main', token: '' };
        }
    }

    async function publishToGitHub(targetFeedback) {
        let savedGh = loadGhSettings();
        let username = document.getElementById('ghUsername')?.value.trim() || savedGh.username || 'salahsalehbesoo';
        let repo = document.getElementById('ghRepoName')?.value.trim() || savedGh.repo || 'portfolio';
        const branch = document.getElementById('ghBranch')?.value.trim() || savedGh.branch || 'main';
        let token = document.getElementById('ghToken')?.value.trim().replace(/^['"]|['"]$/g, '') || savedGh.token || '';
        const feedback = targetFeedback || document.getElementById('ghPublishFeedback');

        // Auto-cleanup repository and username if full URL was pasted
        if (repo.startsWith('http://') || repo.startsWith('https://')) {
            try {
                const urlObj = new URL(repo);
                const pathParts = urlObj.pathname.replace(/^\/|\/$/g, '').split('/');
                if (pathParts.length >= 2) {
                    if (!username) username = pathParts[0];
                    repo = pathParts[1];
                } else if (pathParts.length === 1) {
                    repo = pathParts[0];
                }
            } catch (e) {}
        }
        repo = repo.replace(/\.git$/i, '');
        if (repo.includes('/')) {
            const parts = repo.split('/');
            if (!username) username = parts[0];
            repo = parts[1];
        }

        // Update inputs with clean values
        if (document.getElementById('ghUsername') && username) document.getElementById('ghUsername').value = username;
        if (document.getElementById('ghRepoName') && repo) document.getElementById('ghRepoName').value = repo;
        if (document.getElementById('ghToken') && token) document.getElementById('ghToken').value = token;

        if (!token) {
            if (feedback) {
                feedback.style.display = 'block';
                feedback.style.background = 'rgba(239, 68, 68, 0.15)';
                feedback.style.border = '1px solid var(--admin-crimson)';
                feedback.style.color = '#ef4444';
                feedback.innerHTML = `
                    <i class="fa-solid fa-triangle-exclamation"></i> <strong>رمز التوكن (GitHub Token) غير متوفر:</strong>
                    <br>
                    يرجى فتح تبويب <a href="javascript:void(0)" onclick="document.querySelector('[data-tab=\\'tabDeploy\\'] button')?.click()" style="color:#60a5fa; font-weight:700; text-decoration:underline;">النشر وتصدير الكود</a> ولصق رمز الـ Token الخاص بك وحفظه مرة واحدة، ليتمكن هذا الزر من حفظ ونشر أي قسم فورياً بضغطة واحدة.
                `;
            }
            showToast('⚠️ يرجى حفظ رمز GitHub Token في تبويب النشر أولاً');
            return;
        }

        // Validation for common token mistakes (entering normal password)
        if (!token.startsWith('ghp_') && !token.startsWith('github_pat_')) {
            if (feedback) {
                feedback.style.display = 'block';
                feedback.style.background = 'rgba(239, 68, 68, 0.15)';
                feedback.style.border = '1px solid var(--admin-crimson)';
                feedback.style.color = '#ef4444';
                feedback.innerHTML = `
                    <i class="fa-solid fa-triangle-exclamation"></i> <strong>خطأ في نوع الرمز:</strong> الرمز الذي أدخلته يبدو أنه كلمة سر حسابك العادية وليس Personal Access Token.<br>
                    <span style="font-size:0.85rem; color:#fca5a5;">جيت هب لا يقبل كلمات السر العادية في الـ API. الرمز السليم يبدأ دائماً بـ <code>ghp_</code>.</span><br>
                    <a href="https://github.com/settings/tokens/new?scopes=repo&description=Portfolio+Admin+Deploy" target="_blank" style="color:#60a5fa; text-decoration:underline; font-size:0.85rem; display:inline-block; margin-top:0.4rem;">
                        👉 اضغط هنا لإنشاء رمز Token بضغطة زر واحدة (مع صلاحية repo المحددة تلقائياً)
                    </a>
                `;
            }
            return;
        }

        saveGhSettings();

        if (feedback) {
            feedback.style.display = 'block';
            feedback.style.background = 'rgba(99, 102, 241, 0.15)';
            feedback.style.border = '1px solid #6366f1';
            feedback.style.color = '#818cf8';
            feedback.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جاري الاتصال بـ GitHub ونشر التحديثات لملفات الموقع ومسح الكاش...';
        }

        try {
            const cleanRepo = `${username}/${repo}`;
            const configApiUrl = `https://api.github.com/repos/${cleanRepo}/contents/js/config.js`;
            const indexApiUrl = `https://api.github.com/repos/${cleanRepo}/contents/index.html`;
            const authHeader = token.startsWith('ghp_') ? `token ${token}` : `Bearer ${token}`;

            let configSha = null;
            try {
                const getRes = await fetch(`${configApiUrl}?ref=${branch}`, {
                    headers: {
                        'Authorization': authHeader,
                        'Accept': 'application/vnd.github.v3+json'
                    }
                });
                if (getRes.status === 401) {
                    throw new Error("Bad credentials");
                }
                if (getRes.ok) {
                    const getData = await getRes.json();
                    configSha = getData.sha;
                }
            } catch (e) {
                if (e.message === "Bad credentials") throw e;
                console.warn('Could not fetch existing config SHA:', e);
            }

            const now = new Date();
            const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;
            const versionStamp = `${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}_${String(now.getHours()).padStart(2,'0')}${String(now.getMinutes()).padStart(2,'0')}${String(now.getSeconds()).padStart(2,'0')}`;

            const newSource = generateConfigJsSource(versionStamp);
            
            function safeUtf8ToBase64(str) {
                try {
                    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
                        return String.fromCharCode(parseInt(p1, 16));
                    }));
                } catch (e) {
                    return btoa(unescape(encodeURIComponent(str)));
                }
            }

            function safeBase64ToUtf8(b64) {
                try {
                    const binStr = atob(b64.replace(/\s/g, ''));
                    const bytes = new Uint8Array(binStr.length);
                    for (let i = 0; i < binStr.length; i++) {
                        bytes[i] = binStr.charCodeAt(i);
                    }
                    return new TextDecoder('utf-8').decode(bytes);
                } catch (e) {
                    return decodeURIComponent(escape(atob(b64.replace(/\s/g, ''))));
                }
            }

            const b64Config = safeUtf8ToBase64(newSource);

            const commitPayload = {
                message: `chore: publish portfolio updates from admin panel [${now.toLocaleDateString('ar-EG')} ${timeStr}]`,
                content: b64Config,
                branch: branch
            };
            if (configSha) {
                commitPayload.sha = configSha;
            }

            const putRes = await fetch(configApiUrl, {
                method: 'PUT',
                headers: {
                    'Authorization': authHeader,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(commitPayload)
            });

            if (!putRes.ok) {
                const errData = await putRes.json().catch(() => ({}));
                throw new Error(errData.message || `HTTP ${putRes.status}`);
            }

            // Also bust cache in index.html on GitHub Pages so visitors get updates immediately without cached files
            try {
                const getIndexRes = await fetch(`${indexApiUrl}?ref=${branch}`, {
                    headers: {
                        'Authorization': authHeader,
                        'Accept': 'application/vnd.github.v3+json'
                    }
                });
                if (getIndexRes.ok) {
                    const indexData = await getIndexRes.json();
                    const indexSha = indexData.sha;
                    const rawIndex = safeBase64ToUtf8(indexData.content);
                    const updatedIndex = rawIndex
                        .replace(/src=["']js\/(config|main|translations|analytics)\.js(\?v=[^"']*)?["']/g, (m, scriptName) => `src="js/${scriptName}.js?v=${versionStamp}"`)
                        .replace(/href=["']css\/style\.css(\?v=[^"']*)?["']/g, `href="css/style.css?v=${versionStamp}"`);

                    if (updatedIndex !== rawIndex) {
                        const b64Index = safeUtf8ToBase64(updatedIndex);
                        await fetch(indexApiUrl, {
                            method: 'PUT',
                            headers: {
                                'Authorization': authHeader,
                                'Accept': 'application/vnd.github.v3+json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                message: `chore: update cache buster query string [v${versionStamp}]`,
                                content: b64Index,
                                branch: branch,
                                sha: indexSha
                            })
                        });
                    }
                }
            } catch (idxErr) {
                console.warn('Index cache-bust skip:', idxErr);
            }

            if (feedback) {
                feedback.style.background = 'rgba(16, 185, 129, 0.15)';
                feedback.style.border = '1px solid var(--admin-emerald)';
                feedback.style.color = '#10b981';
                feedback.innerHTML = `
                    <i class="fa-solid fa-circle-check"></i> 🚀 <strong>تم النشر وتحديث موقعك على GitHub بنجاح!</strong>
                    <br>
                    <span style="font-size:0.83rem; color:var(--admin-muted);">
                        تم تحديث البيانات وتفريغ الكاش لجميع الأجهزة — التعديل سيظهر لجميع زوار موقعك خلال 30 ثانية.
                    </span>
                    <br>
                    <a href="https://${username}.github.io/${repo}/" target="_blank" style="color:var(--admin-blue); text-decoration:underline; font-size:0.86rem; margin-top:0.4rem; display:inline-block; font-weight:700;">
                        فتح رابط موقعك المباشر الآن <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                `;
            }
            showToast('🚀 تم نشر التعديل على موقعك في GitHub بنجاح!');
        } catch (err) {
            console.error('GitHub publish error:', err);
            let userMsg = err.message;
            if (err.message.includes('Bad credentials')) {
                userMsg = 'الرمز المدخل غير صالح (Bad credentials). تأكد من إنشاء Token سليم يبدأ بـ ghp_ من الرابط بالأسفل وليس كلمة سر الحساب.';
            } else if (err.message.includes('Not Found')) {
                userMsg = `المستودع أو الفرع غير موجود (Not Found). تأكد من اسم المستخدم (${username}) واسم المستودع (${repo}) والفرع (${branch}).`;
            }
            if (feedback) {
                feedback.style.background = 'rgba(239, 68, 68, 0.15)';
                feedback.style.border = '1px solid var(--admin-crimson)';
                feedback.style.color = '#ef4444';
                feedback.innerHTML = `
                    <i class="fa-solid fa-circle-xmark"></i> فشل النشر: ${userMsg}
                    <br>
                    <a href="https://github.com/settings/tokens/new?scopes=repo&description=Portfolio+Admin+Deploy" target="_blank" style="color:#60a5fa; text-decoration:underline; font-size:0.85rem; display:inline-block; margin-top:0.5rem;">
                        👉 اضغط هنا لإنشاء رمز Token جديد من GitHub بنقرة واحدة
                    </a>
                `;
            }
        }
    }

    function saveSpecificSection(sec) {
        if (sec === 'profileCard') {
            const logoTextInput = document.getElementById('logoText');
            const logoBadgeInput = document.getElementById('logoBadge');
            const logoImgUrlInput = document.getElementById('logoImgUrl');
            const favImgUrlInput = document.getElementById('favImgUrl');
            const profAvatar = document.getElementById('profAvatar');
            const profCover = document.getElementById('profCover');
            const profNameAr = document.getElementById('profNameAr');
            const profNameEn = document.getElementById('profNameEn');
            const profRoleAr = document.getElementById('profRoleAr');
            const profRoleEn = document.getElementById('profRoleEn');
            const profExpYears = document.getElementById('profExpYears');
            const profWorkStatus = document.getElementById('profWorkStatus');
            const profAvailabilityText = document.getElementById('profAvailabilityText');
            const profBioAr = document.getElementById('profBioAr');
            const profBioEn = document.getElementById('profBioEn');

            if (!siteConfig.profile) siteConfig.profile = {};
            if (logoTextInput) siteConfig.profile.logoText = logoTextInput.value.trim() || "CREATIVE";
            if (logoBadgeInput) siteConfig.profile.logoBadge = logoBadgeInput.value.trim() || "PORTFOLIO";
            if (logoImgUrlInput) siteConfig.profile.logoImgUrl = logoImgUrlInput.value.trim();
            
            const chosenFav = favImgUrlInput?.value.trim() || siteConfig.profile.faviconUrl || "img/favicon.svg";
            siteConfig.profile.faviconUrl = chosenFav;
            if (!siteConfig.branding) siteConfig.branding = {};
            siteConfig.branding.faviconUrl = chosenFav;
            if (typeof applyFavicon === 'function') applyFavicon(chosenFav);

            if (profAvatar) siteConfig.profile.avatarUrl = profAvatar.value.trim();
            if (profCover) siteConfig.profile.coverUrl = profCover.value.trim();
            if (profNameAr) siteConfig.profile.nameAr = profNameAr.value.trim();
            if (profNameEn) siteConfig.profile.nameEn = profNameEn.value.trim();
            if (profRoleAr) siteConfig.profile.roleAr = profRoleAr.value.trim();
            if (profRoleEn) siteConfig.profile.roleEn = profRoleEn.value.trim();
            if (profExpYears) siteConfig.profile.expYears = parseInt(profExpYears.value || 4, 10);
            if (profWorkStatus) siteConfig.profile.workStatus = profWorkStatus.value;
            if (profAvailabilityText) {
                siteConfig.profile.availabilityText = profAvailabilityText.value.trim();
                siteConfig.profile.statusTextAr = profAvailabilityText.value.trim();
            }
            if (profBioAr) siteConfig.profile.bioAr = profBioAr.value.trim();
            if (profBioEn) siteConfig.profile.bioEn = profBioEn.value.trim();

            saveSiteConfig(siteConfig);
        } else if (sec === 'branding') {
            const btnSaveBranding = document.getElementById('btnSaveBranding');
            if (btnSaveBranding) btnSaveBranding.click();
            else saveSiteConfig(siteConfig);
        } else if (sec === 'pricing') {
            const btnSavePricing = document.getElementById('btnSavePricing');
            if (btnSavePricing) btnSavePricing.click();
            else saveSiteConfig(siteConfig);
        } else if (sec === 'profile') {
            const btnSaveProfile = document.getElementById('btnSaveProfile');
            if (btnSaveProfile) btnSaveProfile.click();
            else saveSiteConfig(siteConfig);
        } else if (sec === 'projects') {
            const pendingTitle = document.getElementById('newTitle')?.value.trim();
            const pendingUrl = document.getElementById('newUrl')?.value.trim();
            if (pendingTitle && pendingUrl && addProjectForm) {
                if (typeof addProjectForm.requestSubmit === 'function') {
                    addProjectForm.requestSubmit();
                } else {
                    addProjectForm.dispatchEvent(new Event('submit', { cancelable: true }));
                }
            }
            saveSiteProjects(currentProjects);
        } else if (sec === 'tutorials') {
            saveSiteTutorials(currentTutorials);
        } else if (sec === 'store') {
            saveSiteProducts(currentProducts);
        } else if (sec === 'navbar') {
            saveSiteConfig(siteConfig);
        } else if (sec === 'sectionsVisibility') {
            saveSiteConfig(siteConfig);
        } else if (sec === 'reviews') {
            saveSiteReviews(currentReviews);
        }
    }

    function initUniversalTabPublishers() {
        document.querySelectorAll('.btn-publish-section-github').forEach(btn => {
            if (btn.dataset.bound) return;
            btn.dataset.bound = "true";
            btn.addEventListener('click', async () => {
                const sec = btn.getAttribute('data-section');
                const feedbackEl = document.getElementById('feedback_' + sec);
                saveSpecificSection(sec);
                await publishToGitHub(feedbackEl);
            });
        });

        document.querySelectorAll('.btn-save-section-local').forEach(btn => {
            if (btn.dataset.bound) return;
            btn.dataset.bound = "true";
            btn.addEventListener('click', () => {
                const sec = btn.getAttribute('data-section');
                const feedbackEl = document.getElementById('feedback_' + sec);
                saveSpecificSection(sec);
                if (feedbackEl) {
                    feedbackEl.style.display = 'block';
                    feedbackEl.style.background = 'rgba(16, 185, 129, 0.15)';
                    feedbackEl.style.border = '1px solid var(--admin-emerald)';
                    feedbackEl.style.color = '#10b981';
                    feedbackEl.innerHTML = '<i class="fa-solid fa-circle-check"></i> 💾 <strong>تم الحفظ بنجاح في ذاكرة المتصفح!</strong> لن يُنشر على الإنترنت إلا بعد الضغط على "نشر وحفظ فورياً على GitHub".';
                    setTimeout(() => { feedbackEl.style.display = 'none'; }, 6000);
                }
                showToast('💾 تم الحفظ محلياً في المتصفح بنجاح!');
            });
        });

        document.querySelectorAll('.btn-export-section-config').forEach(btn => {
            if (btn.dataset.bound) return;
            btn.dataset.bound = "true";
            btn.addEventListener('click', () => {
                const sec = btn.getAttribute('data-section');
                saveSpecificSection(sec);
                downloadConfigJs();
                showToast('📥 تم تحميل وتصدير ملف config.js لجهازك!');
            });
        });
    }

    function renderDeployManager() {
        loadGhSettings();

        const btnDownload = document.getElementById('btnDownloadConfigJs');
        if (btnDownload && !btnDownload.dataset.bound) {
            btnDownload.dataset.bound = "true";
            btnDownload.addEventListener('click', downloadConfigJs);
        }

        const btnDirectSave = document.getElementById('btnDirectFileSave');
        if (btnDirectSave && !btnDirectSave.dataset.bound) {
            btnDirectSave.dataset.bound = "true";
            btnDirectSave.addEventListener('click', saveDirectlyToFileSystem);
        }

        const btnPublish = document.getElementById('btnPublishToGitHub');
        if (btnPublish && !btnPublish.dataset.bound) {
            btnPublish.dataset.bound = "true";
            btnPublish.addEventListener('click', publishToGitHub);
        }

        const btnSaveGh = document.getElementById('btnSaveGhSettings');
        if (btnSaveGh && !btnSaveGh.dataset.bound) {
            btnSaveGh.dataset.bound = "true";
            btnSaveGh.addEventListener('click', saveGhSettings);
        }

        const btnToggleToken = document.getElementById('btnToggleGhToken');
        const tokenInput = document.getElementById('ghToken');
        if (btnToggleToken && tokenInput && !btnToggleToken.dataset.bound) {
            btnToggleToken.dataset.bound = "true";
            btnToggleToken.addEventListener('click', () => {
                const isPass = tokenInput.type === 'password';
                tokenInput.type = isPass ? 'text' : 'password';
                btnToggleToken.innerHTML = isPass ? '<i class="fa-solid fa-eye-slash"></i>' : '<i class="fa-solid fa-eye"></i>';
            });
        }

        const btnWipe = document.getElementById('btnWipeAllProjects');
        if (btnWipe && !btnWipe.dataset.bound) {
            btnWipe.dataset.bound = "true";
            btnWipe.addEventListener('click', wipeAllProjects);
        }

        const btnProjWipe = document.getElementById('btnProjectsQuickWipe');
        if (btnProjWipe && !btnProjWipe.dataset.bound) {
            btnProjWipe.dataset.bound = "true";
            btnProjWipe.addEventListener('click', wipeAllProjects);
        }

        const btnProjExport = document.getElementById('btnProjectsQuickExport');
        if (btnProjExport && !btnProjExport.dataset.bound) {
            btnProjExport.dataset.bound = "true";
            btnProjExport.addEventListener('click', downloadConfigJs);
        }

        const btnQuickExport = document.getElementById('btnQuickExport');
        if (btnQuickExport && !btnQuickExport.dataset.bound) {
            btnQuickExport.dataset.bound = "true";
            btnQuickExport.addEventListener('click', downloadConfigJs);
        }
    }

    // ------------------------------------------------------------------------
    // 15. Toast System
    // ------------------------------------------------------------------------
    function showToast(message) {
        let toast = document.getElementById('adminToast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'adminToast';
            toast.className = 'admin-toast';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3200);
    }

    // ------------------------------------------------------------------------
    // 16. Guaranteed Immediate Boot Engine
    // ------------------------------------------------------------------------
    try {
        renderSectionsVisibilityManager();
    } catch (e) {
        console.error("Initial renderSectionsVisibilityManager error:", e);
    }

    try {
        loadGhSettings();
        initUniversalTabPublishers();
    } catch (e) {
        console.error("Initial initUniversalTabPublishers error:", e);
    }

    checkSessionOnLoad();
});
