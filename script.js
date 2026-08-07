/* -------------------------------------------------------------
   MUHAMMAD AQNA - PORTFOLIO INTERACTIVE JAVASCRIPT
   Apple-Style Executive Standard, Visual 3x3 OD Board, & Artifact Carousel Slider
   ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

    // 1. MOBILE NAVIGATION HAMBURGER TOGGLE
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // 2. ARTIFACTS CAROUSEL SLIDER (LEFT/RIGHT NAVIGATION)
    const carouselBtns = document.querySelectorAll('.carousel-nav');
    if (carouselBtns.length > 0) {
        carouselBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const carouselId = btn.getAttribute('data-carousel');
                const carouselElem = document.getElementById(carouselId);
                if (!carouselElem) return;

                const slides = carouselElem.querySelectorAll('.carousel-slide');
                let activeIndex = -1;

                slides.forEach((slide, idx) => {
                    if (slide.classList.contains('active-slide')) {
                        activeIndex = idx;
                    }
                });

                if (activeIndex !== -1) {
                    slides[activeIndex].classList.remove('active-slide');
                    let nextIndex;
                    if (btn.classList.contains('carousel-next')) {
                        nextIndex = (activeIndex + 1) % slides.length;
                    } else {
                        nextIndex = (activeIndex - 1 + slides.length) % slides.length;
                    }
                    slides[nextIndex].classList.add('active-slide');
                }
            });
        });
    }

    // 3. ARTIFACTS & EVIDENCE VAULT TAB FILTERING
    const artifactTabBtns = document.querySelectorAll('.artifact-tab-btn');
    const artifactCards = document.querySelectorAll('.artifact-card');

    if (artifactTabBtns.length > 0) {
        artifactTabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const target = btn.getAttribute('data-target');

                artifactTabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                artifactCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (target === 'all' || category === target) {
                        card.classList.remove('hide-artifact');
                        card.style.display = 'flex';
                        card.style.opacity = '1';
                        card.style.transform = 'none';
                    } else {
                        card.classList.add('hide-artifact');
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // 4. UPGRADED VISUAL 3x3 OD SYSTEM DEMO & 9-BOX GRID
    const performanceSelect = document.getElementById('performanceSelect');
    const potentialSelect = document.getElementById('potentialSelect');
    const boxCategoryName = document.getElementById('boxCategoryName');
    const odActionTitle = document.getElementById('odActionTitle');
    const odActionDesc = document.getElementById('odActionDesc');
    const cells9Box = document.querySelectorAll('.grid-9box-cell');

    const odMatrix = {
        'high_high': {
            badge: "Star Candidate (Top Talent)",
            title: "Intervensi OD: Fast-Track & Strategic Succession",
            desc: "Karyawan merupakan aset utama kepemimpinan. Berikan penugasan khusus (stretch assignments), fasilitasi mentorship eksekutif, dan masukkan dalam jalur suksesi kepemimpinan utama (succession planning)."
        },
        'medium_high': {
            badge: "High Potential (Future Star)",
            title: "Intervensi OD: Skill Coaching & Role Alignment",
            desc: "Karyawan memiliki kapasitas tumbuh tinggi namun kinerja belum optimal. Berikan pelatihan teknis intensif, coaching 1-on-1, dan evaluasi kesesuaian peran (job alignment)."
        },
        'low_high': {
            badge: "Enigma (Misaligned Talent)",
            title: "Intervensi OD: Diagnosis Hambatan & Job Crafting",
            desc: "Terjadi ketidaksesuaian mendasar antara potensi tinggi karyawan dengan kinerjanya. Lakukan evaluasi Workload Analysis (WLA), audit hambatan lingkungan kerja, atau rotasi ke departemen yang lebih sesuai."
        },
        'high_medium': {
            badge: "High Performer (Core Contributor)",
            title: "Intervensi OD: Recognition & Skill Broadening",
            desc: "Karyawan secara konsisten melampaui target kinerja harian. Berikan penyesuaian insentif/penghargaan, pertahankan motivasi kerja, dan berikan pelatihan untuk memperluas jangkauan kompetensi."
        },
        'medium_medium': {
            badge: "Core Employee (Solid Performer)",
            title: "Intervensi OD: Continuous Feedback & Maintenance",
            desc: "Karyawan menopang operasional harian secara stabil. Berikan umpan balik kinerja secara berkala dan dorong partisipasi dalam program pengembangan keterampilan internal."
        },
        'low_medium': {
            badge: "Dilemma (Underperformer)",
            title: "Intervensi OD: Performance Improvement Plan (PIP)",
            desc: "Karyawan menunjukkan kinerja di bawah standar. Terapkan program perbaikan kinerja (PIP) yang terstruktur selama 30-90 hari dengan indikator keberhasilan (KPI) yang jelas."
        },
        'high_low': {
            badge: "Role Specialist (Expert Contributor)",
            title: "Intervensi OD: Knowledge Transfer & Retention",
            desc: "Karyawan sangat handal di posisi spesialisnya saat ini namun memiliki minat/kapasitas terbatas untuk naik ke jenjang manajemen. Maksimalkan perannya sebagai mentor teknis."
        },
        'medium_low': {
            badge: "Effective Contributor",
            title: "Intervensi OD: Process Standardisation",
            desc: "Karyawan menjalankan tugas administratif rutin dengan baik. Pertahankan stabilitas peran dan berikan pelatihan automasi workflow sederhana."
        },
        'low_low': {
            badge: "High Risk (Action Needed)",
            title: "Intervensi OD: Role Realignment / Outplacement",
            desc: "Karyawan tidak memenuhi standar kinerja maupun potensi pertumbuhan. Lakukan audit evaluasi mendalam, pertimbangkan reassignment ke tugas dasar, atau proses outplacement yang santun."
        }
    };

    function updateODSystem(perf, pot) {
        const key = `${perf}_${pot}`;
        const data = odMatrix[key] || odMatrix['high_high'];

        if (performanceSelect && performanceSelect.value !== perf) performanceSelect.value = perf;
        if (potentialSelect && potentialSelect.value !== pot) potentialSelect.value = pot;

        cells9Box.forEach(cell => {
            if (cell.getAttribute('data-perf') === perf && cell.getAttribute('data-pot') === pot) {
                cell.classList.add('active-cell');
            } else {
                cell.classList.remove('active-cell');
            }
        });

        if (boxCategoryName) boxCategoryName.textContent = data.badge;
        if (odActionTitle) odActionTitle.textContent = data.title;
        if (odActionDesc) odActionDesc.textContent = data.desc;
    }

    cells9Box.forEach(cell => {
        cell.addEventListener('click', () => {
            const perf = cell.getAttribute('data-perf');
            const pot = cell.getAttribute('data-pot');
            updateODSystem(perf, pot);
        });
    });

    if (performanceSelect && potentialSelect) {
        performanceSelect.addEventListener('change', () => {
            updateODSystem(performanceSelect.value, potentialSelect.value);
        });
        potentialSelect.addEventListener('change', () => {
            updateODSystem(performanceSelect.value, potentialSelect.value);
        });
        updateODSystem(performanceSelect.value, potentialSelect.value);
    }

    // 5. SLIDER INPUTS & LIVE FLIGHT-RISK CALCULATOR
    const satisfactionSlider = document.getElementById('satisfactionSlider');
    const workloadSlider = document.getElementById('workloadSlider');
    const compSlider = document.getElementById('compSlider');
    const managerSlider = document.getElementById('managerSlider');

    const satisfactionValue = document.getElementById('satisfactionValue');
    const workloadValue = document.getElementById('workloadValue');
    const compValue = document.getElementById('compValue');
    const managerValue = document.getElementById('managerValue');

    const riskScoreText = document.getElementById('riskScoreText');
    const recommendationText = document.getElementById('recommendationText');

    function calculateRisk() {
        if (!satisfactionSlider) return;

        const satisfaction = parseFloat(satisfactionSlider.value);
        const workload = parseInt(workloadSlider.value);
        const comp = parseInt(compSlider.value);
        const manager = parseFloat(managerSlider.value);

        if (satisfactionValue) satisfactionValue.textContent = satisfaction.toFixed(1);
        if (workloadValue) workloadValue.textContent = workload + ' Jam';
        if (compValue) compValue.textContent = comp + '%';
        if (managerValue) managerValue.textContent = manager.toFixed(1);

        let rawScore = ((10 - satisfaction) * 3) + ((workload - 35) * 1.2) + ((100 - comp) * 0.4) + ((5 - manager) * 5);
        let riskPercentage = Math.min(Math.max(Math.round((rawScore / 85) * 100), 5), 98);

        if (!riskScoreText || !recommendationText) return;

        if (riskPercentage < 35) {
            riskScoreText.style.color = '#16a34a';
            riskScoreText.textContent = `LOW RISK (${riskPercentage}%)`;
            recommendationText.textContent = 'Karyawan memiliki tingkat retensi tinggi. Fokus pada pengayaan peran (job enrichment) dan perencanaan jalur kepemimpinan jangka panjang.';
        } else if (riskPercentage < 65) {
            riskScoreText.style.color = '#d97706';
            riskScoreText.textContent = `MODERATE RISK (${riskPercentage}%)`;
            recommendationText.textContent = 'Terdeteksi potensi kejenuhan sedang. Disarankan untuk meninjau distribusi beban kerja harian dan memberikan sesi feedback 1-on-1.';
        } else {
            riskScoreText.style.color = '#dc2626';
            riskScoreText.textContent = `HIGH RISK (${riskPercentage}%)`;
            recommendationText.textContent = 'Tingkat risiko pengunduran diri kritis. Diperlukan intervensi penyesuaian kompensasi pasar, Workload Analysis (WLA), dan evaluasi hubungan manajerial.';
        }
    }

    if (satisfactionSlider) {
        [satisfactionSlider, workloadSlider, compSlider, managerSlider].forEach(slider => {
            if (slider) slider.addEventListener('input', calculateRisk);
        });
        calculateRisk();
    }

    // 6. SAFE SMOOTH SCROLLING NAV & ADDRESS BAR HASH UPDATE
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            
            try {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    if (navMenu) navMenu.classList.remove('active');
                    if (window.history && window.history.pushState) {
                        window.history.pushState(null, null, href);
                    }
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            } catch (err) {
                // Ignore invalid selectors
            }
        });
    });

    // 7. LIGHTBOX IMAGE FULLSCREEN ZOOM MODAL
    const lightboxModal = document.getElementById('imageLightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');

    if (lightboxModal && lightboxImg) {
        document.querySelectorAll('.artifact-preview-frame').forEach(frame => {
            frame.addEventListener('click', (e) => {
                const activeSlideImg = frame.querySelector('.carousel-slide.active-slide img');
                if (activeSlideImg && activeSlideImg.src) {
                    lightboxModal.style.display = 'flex';
                    lightboxImg.src = activeSlideImg.src;
                    lightboxCaption.textContent = activeSlideImg.alt || 'Pratinjau Dokumen High Resolution';
                }
            });
        });

        if (lightboxClose) {
            lightboxClose.addEventListener('click', () => {
                lightboxModal.style.display = 'none';
            });
        }

        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                lightboxModal.style.display = 'none';
            }
        });
    }

    // 8. COPY EMAIL TO CLIPBOARD WITH INTERACTIVE FEEDBACK & FALLBACK
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const emailText = 'aqnahizbulha.work@gmail.com';
            
            function showSuccessFeedback() {
                const originalHTML = copyEmailBtn.innerHTML;
                copyEmailBtn.innerHTML = '<i class="fas fa-check"></i> Email Tersalin!';
                copyEmailBtn.style.backgroundColor = '#16a34a';
                copyEmailBtn.style.color = '#ffffff';
                copyEmailBtn.style.borderColor = '#16a34a';
                
                setTimeout(() => {
                    copyEmailBtn.innerHTML = originalHTML;
                    copyEmailBtn.style.backgroundColor = '';
                    copyEmailBtn.style.color = '';
                    copyEmailBtn.style.borderColor = '';
                }, 2500);
            }

            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(emailText).then(showSuccessFeedback).catch(() => {
                    fallbackCopyEmail(emailText, showSuccessFeedback);
                });
            } else {
                fallbackCopyEmail(emailText, showSuccessFeedback);
            }
        });
    }

    function fallbackCopyEmail(text, successCb) {
        try {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.style.position = "fixed";
            textArea.style.top = "0";
            textArea.style.left = "0";
            textArea.style.opacity = "0";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);
            if (successful && successCb) {
                successCb();
            } else {
                alert('Email Aqna: ' + text);
            }
        } catch (err) {
            alert('Email Aqna: ' + text);
        }
    }

    // 9. DYNAMIC TOP SCROLL PROGRESS BAR
    const scrollProgressBar = document.getElementById('scrollProgressBar');
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (scrollHeight > 0) {
            const scrollPercentage = (scrollTop / scrollHeight) * 100;
            if (scrollProgressBar) {
                scrollProgressBar.style.width = scrollPercentage + '%';
            }
        }
    }, { passive: true });

    // 10. SMOOTH SCROLL REVEAL ANIMATIONS FOR CARDS & HEADERS
    const revealElements = document.querySelectorAll('.timeline-card, .about-card, .framework-card, .skill-category, .section-header');
    revealElements.forEach(el => el.classList.add('reveal-on-scroll'));

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.1,
            rootMargin: '0px 0px -30px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    // 11. BILINGUAL LANGUAGE TOGGLE SYSTEM (ID / EN)
    const langToggleBtn = document.getElementById('langToggleBtn');
    const langLabel = document.getElementById('langLabel');
    
    const i18n = {
        id: {
            langBtnLabel: 'EN',
            nav_home: 'Beranda',
            nav_about: 'Filosofi Kerja',
            nav_exp: 'Pengalaman',
            nav_artifacts: 'Dokumen & Hasil Kerja',
            nav_od: 'Demo OD',
            nav_sim: 'Analytics Simulator',
            nav_skills: 'Kompetensi',
            nav_contact: 'Hubungi',
            badge_bnsp: '<i class="fas fa-certificate"></i> Certified HR Staff BNSP RI',
            badge_mckinsey: '<i class="fas fa-award"></i> McKinsey Forward Alumnus',
            badge_undip: '<i class="fas fa-graduation-cap"></i> Undip Psychology (Cumlaude)',
            hero_subtitle: 'Human Resources & Organizational Development',
            hero_desc: 'Lulusan Sarjana Psikologi Universitas Diponegoro (Cumlaude) dengan Sertifikasi Resmi Staf HR BNSP RI. Memiliki ketertarikan dan keahlian dalam <strong>Psikologi Industri & Organisasi (I/O)</strong>, <strong>People Analytics (Excel, Power BI, R, SPSS)</strong>, serta pengawasan administrasi HR dan kepatuhan hukum ketenagakerjaan.',
            hero_cta_exp: '<i class="fas fa-briefcase"></i> Lihat Rekam Jejak Pengalaman',
            hero_cta_art: '<i class="fas fa-folder-open"></i> Lihat Dokumen & Hasil Kerja',
            metric_1_val: '31 SOP HR',
            metric_1_lbl: 'Disusun & Diformalkan di DSDM UNDIP',
            metric_2_val: '30% Efisiensi',
            metric_2_lbl: 'Penghematan Anggaran Program KKNT',
            metric_3_val: '2x Best Staff',
            metric_3_lbl: 'Staf Terbaik Kind to Mind (Jan & Feb)',
            photo_title: 'Human Resources & Organizational Development',
            photo_linkedin: 'LinkedIn Profile',
            photo_status: '<i class="fas fa-circle-check"></i> Terbuka untuk Peluang Karir & Kolaborasi',
            pill_philosophy: 'PRINSIP KERJA',
            sec_philosophy_title: 'Filosofi & Pendekatan Kerja',
            sec_philosophy_sub: 'Pendekatan pengelolaan SDM yang berorientasi pada manusia dan kinerja organisasi',
            pillar_1_title: '1. Empati Perilaku & Pengembangan Manusia',
            pillar_1_desc: 'Menghargai potensi autentik setiap individu. Menciptakan lingkungan kerja yang aman secara psikologis (<em>Psychological Safety</em>) agar talenta dapat bertumbuh secara mandiri dan memberikan kontribusi terbaiknya bagi organisasi.',
            pillar_2_title: '2. Presisi Data & Analytics Kuantitatif',
            pillar_2_desc: 'Keputusan talenta tanpa data adalah intuisi berisiko. Memanfaatkan analisis data & pemodelan kuantitatif (Excel, Power BI, R, SPSS) untuk mengubah data SDM menjadi wawasan prediktif yang memitigasi risiko turnover dan beban kerja (WLA).',
            pillar_3_title: '3. Pensejajaran Nilai Bisnis C-Level',
            pillar_3_desc: 'Fungsi HR adalah mitra pertumbuhan bisnis. Setiap program pengembangan SDM harus terukur dampaknya terhadap nilai bisnis (Operating Margin, Retention Cost, dan Return on Learning Investment).',
            pillar_4_title: '4. Integritas Tata Kelola & Legal Compliance',
            pillar_4_desc: 'Menjaga 100% kepatuhan terhadap hukum ketenagakerjaan (UU 13/2003, PP 35/2021) dan regulasi pajak PPh 21 TER PMK 168/2023 untuk membangun sistem organisasi yang transparan dan dipercaya.',
            pill_exp: 'REKAM JEJAK',
            sec_exp_title: 'Pengalaman Kerja & Inisiatif HR',
            sec_exp_sub: 'Pengalaman praktis dalam formulasi SOP, pengembangan L&D berbasis kompetensi, dan tata kelola anggaran.',
            pill_art: 'BUKTI FISIK',
            sec_art_title: 'Galeri Dokumen & Hasil Kerja',
            sec_art_sub: 'Dokumen kerja nyata, instrumen asesmen, dan formulasi spreadsheet yang pernah disusun.',
            tab_all: 'Semua Dokumen',
            tab_analytics: 'Dashboard & Analytics Data',
            tab_governance: 'Dokumen TOR, Modul & SOP',
            tab_bnsp: 'Dokumen Sertifikasi BNSP',
            tab_psychology: 'Instrumen Asesmen & Riset',
            pill_od: 'SIMULATOR INTERAKSI OD',
            sec_od_title: 'Visual Demo OD: 9-Box Talent Matrix',
            sec_od_sub: 'Visualisasi sistemik evaluasi kinerja dan potensi talenta berbasis model McKinsey & Co.',
            pill_sim: 'MODEL KUANTITATIF PREDIKTIF',
            sec_sim_title: 'Simulator Analytics: Prediksi Flight-Risk & Retensi Karyawan',
            sec_sim_sub: 'Model matematika interaktif untuk mengukur probabilitas risiko turnover karyawan.',
            pill_skills: 'KEAHLIAN & KOMPETENSI',
            sec_skills_title: 'Matriks Kompetensi HR & Tools',
            pill_contact: 'MARI BERDISKUSI',
            sec_contact_title: 'Mari Berdiskusi & Berkolaborasi',
            sec_contact_sub: 'Terbuka untuk posisi HR Generalist, Organizational Development, People Analytics, dan konsultasi HR.',
            btn_send_email: '<i class="fas fa-paper-plane"></i> Kirim Email Langsung',
            btn_copy_email: '<i class="fas fa-copy"></i> Salin Alamat Email',
            btn_linkedin: '<i class="fab fa-linkedin"></i> Profil LinkedIn Resmi'
        },
        en: {
            langBtnLabel: 'ID',
            nav_home: 'Home',
            nav_about: 'Philosophy',
            nav_exp: 'Experience',
            nav_artifacts: 'Artifacts Vault',
            nav_od: 'OD Demo',
            nav_sim: 'Analytics Simulator',
            nav_skills: 'Competencies',
            nav_contact: 'Contact',
            badge_bnsp: '<i class="fas fa-certificate"></i> Certified HR Staff BNSP RI',
            badge_mckinsey: '<i class="fas fa-award"></i> McKinsey Forward Alumnus',
            badge_undip: '<i class="fas fa-graduation-cap"></i> Undip Psychology (Cum Laude)',
            hero_subtitle: 'Human Resources & Organizational Development',
            hero_desc: 'Psychology Graduate from Diponegoro University (Cum Laude) with Official Certified HR Staff status (BNSP RI). Specializing in <strong>Industrial & Organizational (I/O) Psychology</strong>, <strong>People Analytics (Excel, Power BI, R, SPSS)</strong>, HR administrative governance, and labor law compliance.',
            hero_cta_exp: '<i class="fas fa-briefcase"></i> View Experience Track Record',
            hero_cta_art: '<i class="fas fa-folder-open"></i> View Artifacts & Evidence Vault',
            metric_1_val: '31 HR SOPs',
            metric_1_lbl: 'Formulated & Formalized at DSDM UNDIP',
            metric_2_val: '30% Efficiency',
            metric_2_lbl: 'Project Budget Savings (KKNT)',
            metric_3_val: '2x Best Staff',
            metric_3_lbl: 'Kind to Mind Staff of the Month (Jan & Feb)',
            photo_title: 'Human Resources & Organizational Development',
            photo_linkedin: 'Official LinkedIn Profile',
            photo_status: '<i class="fas fa-circle-check"></i> Open for HR Career Opportunities & Collaboration',
            pill_philosophy: 'WORK PRINCIPLES',
            sec_philosophy_title: 'Work Philosophy & Approach',
            sec_philosophy_sub: 'Human-centric HR management approach aligned with strategic organizational performance.',
            pillar_1_title: '1. Behavioral Empathy & Human Capital Development',
            pillar_1_desc: 'Valuing the authentic potential of every individual. Creating a psychologically safe work environment (<em>Psychological Safety</em>) to empower talent to grow autonomously and contribute at their peak performance.',
            pillar_2_title: '2. Data Precision & Quantitative Analytics',
            pillar_2_desc: 'Talent decisions without data are risky intuition. Leveraging data analysis and quantitative modeling (Excel, Power BI, R, SPSS) to convert HR data into predictive insights that mitigate turnover risk and workload burnout (WLA).',
            pillar_3_title: '3. C-Level Business Value Alignment',
            pillar_3_desc: 'The HR function is a strategic business growth partner. Every L&D and talent program must have measurable impacts on core business value (Operating Margin, Retention Cost, and Return on Learning Investment).',
            pillar_4_title: '4. Governance Integrity & Legal Compliance',
            pillar_4_desc: 'Maintaining 100% compliance with Indonesian Labor Law (UU 13/2003, PP 35/2021) and tax regulations (PPh 21 TER PMK 168/2023) to build transparent and trusted organizational systems.',
            pill_exp: 'TRACK RECORD',
            sec_exp_title: 'Work Experience & HR Initiatives',
            sec_exp_sub: 'Practical experience in SOP formulation, competency-based L&D development, and budget governance.',
            pill_art: 'PHYSICAL EVIDENCE',
            sec_art_title: 'Artifacts & Evidence Vault',
            sec_art_sub: 'Real work outputs, assessment instruments, and verified spreadsheet formulations.',
            tab_all: 'All Documents',
            tab_analytics: 'Dashboards & Analytics',
            tab_governance: 'TOR, Modules & SOPs',
            tab_bnsp: 'BNSP Certifications',
            tab_psychology: 'Assessment & Research',
            pill_od: 'OD INTERACTION SIMULATOR',
            sec_od_title: 'Visual OD Demo: 9-Box Talent Matrix',
            sec_od_sub: 'Interactive talent evaluation framework based on McKinsey & Co performance and potential model.',
            pill_sim: 'PREDICTIVE QUANTITATIVE MODEL',
            sec_sim_title: 'Analytics Simulator: Flight-Risk & Employee Retention Prediction',
            sec_sim_sub: 'Interactive mathematical model predicting turnover probability based on workload and compensation.',
            pill_skills: 'EXPERTISE & COMPETENCIES',
            sec_skills_title: 'HR Competency Matrix & Tech Stack',
            pill_contact: 'LET\'S CONNECT',
            sec_contact_title: 'Let\'s Connect & Collaborate',
            sec_contact_sub: 'Open for HR Generalist, Organizational Development, People Analytics roles, and HR consultancy.',
            btn_send_email: '<i class="fas fa-paper-plane"></i> Send Direct Email',
            btn_copy_email: '<i class="fas fa-copy"></i> Copy Email Address',
            btn_linkedin: '<i class="fab fa-linkedin"></i> Official LinkedIn Profile'
        }
    };

    let currentLang = localStorage.getItem('portfolio_lang') || 'id';

    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('portfolio_lang', lang);
        
        if (langLabel) langLabel.textContent = i18n[lang].langBtnLabel;

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (i18n[lang] && i18n[lang][key]) {
                el.innerHTML = i18n[lang][key];
            }
        });
    }

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            const nextLang = currentLang === 'id' ? 'en' : 'id';
            applyLanguage(nextLang);
        });
    }

    if (currentLang === 'en') {
        applyLanguage('en');
    }

    console.log("Muhammad Aqna Portfolio Script Active & Fully Optimized with Bilingual Support (ID/EN).");
});
