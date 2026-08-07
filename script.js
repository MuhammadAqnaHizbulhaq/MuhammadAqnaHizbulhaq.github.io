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
    } else {
        revealElements.forEach(el => el.classList.add('is-visible'));
    }

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
            nav_demo: 'Demo & Simulator',
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

            exp_1_company: '<i class="fas fa-building"></i> Direktorat Sumber Daya Manusia UNDIP (DSDM UNDIP)',
            exp_1_date: 'Maret 2025 — Juni 2025',
            exp_1_role: 'Human Resource Intern',
            exp_1_b1: '<strong>Standardisasi 31 SOP Pelayanan HR:</strong> Menyusun dan memformalkan 31 SOP pelayanan HR di 4 divisi inti DSDM UNDIP, meningkatkan konsistensi proses, kejelasan layanan, serta efisiensi operasional bagi seluruh pemangku kepentingan internal.',
            exp_1_b2: '<strong>Transformasi Digital HR & UX Portal:</strong> Mendukung modernisasi portal web DSDM UNDIP dan memfasilitasi migrasi alur kerja dari sistem pelayanan HR manual ke sistem digital yang lebih responsif.',
            exp_1_b3: '<strong>Operasional Presensi Upacara Besar (500–1.000+ Personel):</strong> Mengelola dan memverifikasi data presensi pada acara resmi dan upacara besar institusi, memfasilitasi otentikasi perangkat, serta menjaga akurasi data kehadiran pegawai.',
            exp_1_b4: '<strong>Publikasi Berita & Konten Portal Web:</strong> Menyusun dan menerbitkan artikel berita resmi pada portal web DSDM UNDIP untuk menyebarluaskan informasi kebijakan HR, kegiatan institusi, dan agenda pengembangan pegawai.',
            exp_1_b5: '<strong>Modul Pelatihan & SOP Visual Interaktif:</strong> Merancang modul materi pelatihan, panduan visual SOP interaktif, dan video instruksional untuk meningkatkan literasi digital serta mempercepat adopsi sistem HR digital.',
            exp_1_b6: '<strong>Dukungan Administrasi HR End-to-End:</strong> Mendukung Divisi Pengembangan Karir dalam proses rekrutmen, mutasi pegawai, penilaian Jabatan Fungsional (Jafung), dan pengarsipan dokumen resmi HR.',

            exp_2_company: '<i class="fas fa-users-cog"></i> Kind to Mind',
            exp_2_date: 'Oktober 2024 — Maret 2025',
            exp_2_role: 'Human Resources Training and Development Staff',
            exp_2_award: '<i class="fas fa-trophy"></i> Best Staff of the Month (Jan & Feb)',
            exp_2_b1: '<strong>Penerima Best Staff of the Month 2 Bulan Berturut-turut:</strong> Meraih penghargaan staf terbaik atas dedikasi luar biasa dalam pengembangan pembelajaran dan inisiatif talenta organisasi.',
            exp_2_b2: '<strong>Training Needs Analysis (TNA):</strong> Melakukan analisis kebutuhan pelatihan terstruktur untuk mengidentifikasi gap kapabilitas dan merumuskan program pembelajaran sesuai prioritas strategis organisasi.',
            exp_2_b3: '<strong>Kurikulum & Modul Upskilling Berbasis Kompetensi:</strong> Merancang kurikulum pelatihan serta modul upskilling di 6 divisi organisasi untuk memperkuat kapabilitas tenaga kerja dan mendukung continuous learning.',
            exp_2_b4: '<strong>Koordinasi Workshop & Guest Speakers:</strong> Mengelola koordinasi end-to-end dengan 6 pembicara ahli tamu, menyelenggarakan workshop spesialisasi yang menjangkau 100+ anggota aktif.',

            exp_3_company: '<i class="fas fa-coins"></i> KKNT-144 Universitas Diponegoro',
            exp_3_date: 'Juni 2025 — Agustus 2025',
            exp_3_role: 'Chief Treasurer (Bendahara Utama Proyek)',
            exp_3_b1: '<strong>30% Efisiensi Anggaran Proyek (Hemat Rp 1,517 Juta):</strong> Merancang dan mengelola anggaran proyek master (RAB) untuk 27+ program komunitas multidisiplin, menghasilkan efisiensi 30% (menghemat Rp 1.517.000 dari total anggaran Rp 4.988.000) melalui konsolidasi sumber daya tanpa mengurangi kualitas program.',
            exp_3_b2: '<strong>Prosedur Kontrol Finansial & Audit LPPM 100%:</strong> Menetapkan prosedur kontrol keuangan terstandar (pencairan tunai, verifikasi kuitansi, pengarsipan bukti pengeluaran), mencapai 100% kepatuhan audit LPPM Undip dengan 0% kesalahan/diskrepansi laporan.',
            exp_3_b3: '<strong>Kolaborasi Tim Multidisiplin:</strong> Bekerja sama dengan tim multidisiplin dan Dosen Pembimbing Lapangan (DPL) untuk menyeimbangkan kebutuhan operasional, kendala anggaran, dan prioritas proyek program.',

            exp_4_company: '<i class="fas fa-brain"></i> Program "Psychology Applied In Finance"',
            exp_4_date: '2024',
            exp_4_role: 'Training Program Developer and Facilitator',
            exp_4_b1: '<strong>Desain Program Pelatihan Berbasis Psikologi Perilaku:</strong> Merancang program pelatihan berbasis bukti ilmiah psikologi perilaku untuk membantu peserta mengenali trigger impulsif dan menekan perilaku belanja berlebihan.',
            exp_4_b2: '<strong>Fasilitasi Sesi Interaktif:</strong> Memandu diskusi kelompok dan sesi interaktif untuk membangun strategi koping praktis dan kebiasaan pengambilan keputusan finansial yang sehat.',
            exp_4_b3: '<strong>Evaluasi Dampak (87.5% Pemahaman Tertinggi):</strong> Mengukur efektivitas program melalui evaluasi pre-test dan post-test, menghasilkan 87.5% peserta mencapai tingkat pemahaman tertinggi (Level 4/4) dan 12.5% mencapai Level 3/4.',

            pill_art: 'REKAM DOKUMEN PORTOFOLIO',
            sec_art_title: 'Galeri Dokumen & Bukti Hasil Kerja',
            sec_art_sub: 'Kompilasi Pratinjau Tangkapan Layar: Dashboard Analytics, TOR Pelatihan & Modul, Formulir BNSP, & Instrumen Psikologi',

            tab_all: 'Semua Dokumen',
            tab_analytics: 'Dashboard & Analytics Data',
            tab_governance: 'Dokumen TOR, Modul & SOP',
            tab_bnsp: 'Dokumen Sertifikasi BNSP',
            tab_psychology: 'Instrumen Asesmen & Riset',

            art_1_tag: 'Dashboard & Data Analytics',
            art_1_title: 'Model Dashboards People Analytics (Power BI & R)',
            art_1_desc: 'Pemodelan regresi retensi karyawan di R dan visualisasi dashboard headcount & keanekaragaman kerja di Power BI.',
            art_1_status: '<i class="fas fa-check-double"></i> Terverifikasi & Terdokumentasi',

            art_2_tag: 'Dokumen TOR, Modul & SOP',
            art_2_title: 'Dokumen TOR, Modul Upskilling & SOP Visual',
            art_2_desc: 'Dokumen kerangka acuan kerja (TOR) analisis TNA, modul upskilling pembelajaran Kind to Mind, serta SOP visual DSDM UNDIP.',
            art_2_status: '<i class="fas fa-check-double"></i> Terverifikasi & Terdokumentasi',

            art_3_tag: 'Sertifikasi BNSP',
            art_3_title: 'Kalkulasi Payroll PPh 21 TER & BPJS TK/Kesehatan',
            art_3_desc: 'Spreadsheet audit resmi sertifikasi BNSP: formulasi PPh 21 TER PMK 168/2023, JHT, JKK, JKM, JP, dan JKP.',
            art_3_status: '<i class="fas fa-check-double"></i> Tersertifikasi BNSP RI 2025',

            art_4_tag: 'Asesmen & Riset',
            art_4_title: 'Instrumen Evaluasi Pre/Post-Test & Analytics Riset',
            art_4_desc: 'Desain alat ukur psikologi perilaku, skala work engagement, dan analisis data kuantitatif kecenderungan perilaku karyawan.',
            art_4_status: '<i class="fas fa-check-double"></i> Riset Terapan Undip',

            pill_bnsp_vault: 'SERTIFIKASI RESMI BNSP RI',
            sec_bnsp_vault_title: 'Kualifikasi Teknis Staff Human Capital',
            sec_bnsp_vault_sub: 'Penguasaan Unit Kompetensi Teknis Berdasarkan Sertifikasi Resmi BNSP RI (2025)',

            bnsp_card_1_title: 'Penyusunan Deskripsi Jabatan (Job Descriptions)',
            bnsp_card_1_desc: 'Menyusun deskripsi jabatan terstruktur sesuai standar SKKNI, memetakan analisis jabatan, kualifikasi minimum, serta indikator pencapaian kinerja utama (KPI) untuk kejelasan peran organisasi.',
            bnsp_card_1_h1: '<i class="fas fa-check"></i> Standar SKKNI BNSP',
            bnsp_card_1_h2: '<i class="fas fa-check"></i> Analisis Jabatan',

            bnsp_card_2_title: 'Pengelolaan Penggajian (Payroll & PPh 21 TER)',
            bnsp_card_2_desc: 'Memahami skema administrasi penggajian, formulasi lembur/UPJ, serta penyesuaian regulasi perpajakan PPh 21 TER PMK 168/2023 untuk akurasi data penggajian tanpa diskrepansi.',
            bnsp_card_2_h1: '<i class="fas fa-check"></i> PPh 21 TER PMK 168/2023',
            bnsp_card_2_h2: '<i class="fas fa-check"></i> Formulasi Payroll',

            bnsp_card_3_title: 'Pengelolaan Jaminan Sosial (BPJS TK & Kesehatan)',
            bnsp_card_3_desc: 'Menguasai skema dan kalkulasi BPJS Kesehatan serta BPJS Ketenagakerjaan (Jaminan Hari Tua/JHT, Jaminan Kecelakaan Kerja/JKK, JKM, Jaminan Pensiun/JP, dan JKP) untuk perlindungan tenaga kerja.',
            bnsp_card_3_h1: '<i class="fas fa-check"></i> BPJS Ketenagakerjaan',
            bnsp_card_3_h2: '<i class="fas fa-check"></i> BPJS Kesehatan',

            pill_od: 'DEMO APLIKASI INTERAKTIF',
            sec_od_title: 'Visual Demo OD: 9-Box Talent Matrix',
            sec_od_sub: 'Dikembangkan Berdasarkan Framework McKinsey & Co.',

            pill_sim: 'MODEL PREDIKTIF HR',
            sec_sim_title: 'Workforce Flight-Risk Predictor Simulator',
            sec_sim_sub: 'Model matematika interaktif untuk mengukur probabilitas risiko turnover karyawan dan analisis beban kerja (WLA).',
            sim_param_title: '<i class="fas fa-sliders-h"></i> Parameter Input Karyawan',
            sim_label_sat: 'Skor Kepuasan Kerja (1 - 10)',
            sim_label_workload: 'Beban Jam Kerja Mingguan (Jam)',
            sim_label_comp: 'Persentil Kompensasi Pasar (%)',
            sim_label_manager: 'Rating Hubungan Atasan (1 - 5)',
            sim_output_title: '<i class="fas fa-chart-bar"></i> Hasil Kalkulasi Analitik',
            sim_rec_title: '<i class="fas fa-lightbulb"></i> Rekomendasi Tindakan Strategis:',

            pill_skills: 'KUALIFIKASI TERSTRUKTUR',
            sec_skills_title: 'Matriks Kompetensi Teruji',
            sec_skills_sub: 'Penguasaan Framework, Alat Analitik, dan Hukum Ketenagakerjaan',

            skill_cat_1_title: '<i class="fas fa-brain"></i> HC Core Competencies',
            skill_hc_1: 'Analisis Jabatan & Pemodelan Kompetensi (Standar SKKNI BNSP)',
            skill_hc_2: 'Asesmen Psikologi & Pemetaan Potensi Kerja',
            skill_hc_3: 'Perilaku Kerja, Motivasi, & Alignment Budaya Organisasi',
            skill_hc_4: 'Intervensi Pengembangan Organisasi (OD) & TNA',
            skill_hc_5: 'Workload Analysis (WLA) & Stakeholder Management',

            skill_cat_2_title: '<i class="fas fa-database"></i> Data Analytics & Tech Tools',
            skill_data_1: 'Excel Advanced (Data Cleaning, Formula Logika, Pivot Table, & Kalkulasi Payroll)',
            skill_data_2: 'Power BI (Formulasi DAX, Data Modeling, & Dashboarding)',
            skill_data_3: 'Bahasa Pemrograman R & Pemodelan Statistik',
            skill_data_4: 'SPSS Statistical Analysis',

            skill_cat_3_title: '<i class="fas fa-gavel"></i> HR Governance & Compliance',
            skill_gov_1: 'Sertifikasi Resmi Staff HR (BNSP Republik Indonesia 2025)',
            skill_gov_2: 'SHRM HR Foundations & HRCI Recruiting Foundations (2026)',
            skill_gov_3: 'McKinsey.org Forward Program Alumnus (2026)',
            skill_gov_4: 'Regulasi Ketenagakerjaan (UU 13/2003, PP 35/2021)',
            skill_gov_5: 'Perhitungan PPh 21 TER PMK 168/2023 & BPJS TK/Kes (JHT, JKK, JKM, JP, JKP)',

            pill_contact: 'MARI BERDISKUSI',
            sec_contact_title: 'Mari Berdiskusi & Berkolaborasi',
            sec_contact_sub: 'Saya terbuka untuk diskusi profesional mengenai pengembangan organisasi, People Analytics, serta peluang kontribusi di perusahaan Anda.',
            btn_send_email: '<i class="fas fa-paper-plane"></i> Kirim Email Langsung',
            btn_copy_email: '<i class="fas fa-copy"></i> Salin Alamat Email',
            btn_linkedin: '<i class="fab fa-linkedin"></i> Profil LinkedIn Resmi'
        },
        en: {
            langBtnLabel: 'ID',
            nav_home: 'Home',
            nav_about: 'Philosophy',
            nav_exp: 'Experience',
            nav_artifacts: 'Work Portfolio',
            nav_demo: 'Demo & Simulators',
            nav_skills: 'Competencies',
            nav_contact: 'Contact',

            badge_bnsp: '<i class="fas fa-certificate"></i> Certified HR Staff BNSP RI',
            badge_mckinsey: '<i class="fas fa-award"></i> McKinsey Forward Alumnus',
            badge_undip: '<i class="fas fa-graduation-cap"></i> Undip Psychology (Cum Laude)',

            hero_subtitle: 'Human Resources & Organizational Development',
            hero_desc: 'Psychology Graduate from Diponegoro University (Cum Laude) with Official Certified HR Staff status (BNSP RI). Specializing in <strong>Industrial & Organizational (I/O) Psychology</strong>, <strong>People Analytics (Excel, Power BI, R, SPSS)</strong>, HR administrative governance, and labor law compliance.',
            hero_cta_exp: '<i class="fas fa-briefcase"></i> View Experience Track Record',
            hero_cta_art: '<i class="fas fa-folder-open"></i> View Work Portfolio & Deliverables',

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

            exp_1_company: '<i class="fas fa-building"></i> Directorate of Human Resources UNDIP (DSDM UNDIP)',
            exp_1_date: 'March 2025 — June 2025',
            exp_1_role: 'Human Resource Intern',
            exp_1_b1: '<strong>Standardization of 31 HR SOPs:</strong> Formulated and formalized 31 core HR SOPs across 4 key divisions at DSDM UNDIP, improving workflow consistency, service clarity, and operational efficiency.',
            exp_1_b2: '<strong>Digital HR Transformation & Portal UX:</strong> Supported DSDM UNDIP web portal modernization and facilitated workflow migration from manual HR processes to a responsive digital portal.',
            exp_1_b3: '<strong>Large-Scale Event Attendance Operations (500–1,000+ Personnel):</strong> Managed and verified attendance data during official ceremonies and major institutional events, ensuring device authentication and data accuracy.',
            exp_1_b4: '<strong>Web Portal News & Content Publishing:</strong> Authored and published official news articles on DSDM UNDIP portal to communicate HR policy updates, institutional events, and employee development news.',
            exp_1_b5: '<strong>Interactive L&D Modules & Visual SOPs:</strong> Designed training modules, interactive visual SOP guides, and instructional videos to accelerate digital HR adoption.',
            exp_1_b6: '<strong>End-to-End HR Administration Support:</strong> Supported Career Development Division in recruitment, staff transfers, Functional Position evaluations (Jafung), and official HR document archiving.',

            exp_2_company: '<i class="fas fa-users-cog"></i> Kind to Mind',
            exp_2_date: 'October 2024 — March 2025',
            exp_2_role: 'Human Resources Training and Development Staff',
            exp_2_award: '<i class="fas fa-trophy"></i> Best Staff of the Month (Jan & Feb)',
            exp_2_b1: '<strong>2x Consecutive Best Staff of the Month Awardee:</strong> Received top staff recognition for outstanding dedication in organizational learning development and talent initiatives.',
            exp_2_b2: '<strong>Training Needs Analysis (TNA):</strong> Conducted structured training needs analysis to identify capability gaps and design learning programs aligned with strategic priorities.',
            exp_2_b3: '<strong>Competency-Based Upskilling Curriculum & Modules:</strong> Designed training curricula and upskilling modules across 6 divisions to strengthen workforce capabilities and foster continuous learning.',
            exp_2_b4: '<strong>Workshop & Guest Speaker Coordination:</strong> Managed end-to-end coordination with 6 expert guest speakers, organizing specialized workshops engaging 100+ active members.',

            exp_3_company: '<i class="fas fa-coins"></i> KKNT-144 Diponegoro University',
            exp_3_date: 'June 2025 — August 2025',
            exp_3_role: 'Chief Treasurer (Project Master Budgeting)',
            exp_3_b1: '<strong>30% Project Budget Efficiency (Saved IDR 1.517M):</strong> Managed master budgeting (RAB) for 27+ multidisciplinary community programs, achieving a 30% budget savings through resource consolidation without compromising program quality.',
            exp_3_b2: '<strong>Financial Control Procedures & 100% Audit Compliance:</strong> Established standardized financial controls (cash disbursement, receipt verification, expenditure archiving), achieving 100% audit compliance with 0% report discrepancies.',
            exp_3_b3: '<strong>Multidisciplinary Team Collaboration:</strong> Collaborated with cross-functional teams and field supervisors to balance operational needs, budget constraints, and project priorities.',

            exp_4_company: '<i class="fas fa-brain"></i> Program "Psychology Applied In Finance"',
            exp_4_date: '2024',
            exp_4_role: 'Training Program Developer and Facilitator',
            exp_4_b1: '<strong>Behavioral Psychology Training Design:</strong> Designed behavioral psychology training programs to help participants recognize impulsive triggers and manage financial decision-making.',
            exp_4_b2: '<strong>Interactive Facilitation:</strong> Facilitated group discussions and interactive sessions to build practical coping strategies and healthy financial habits.',
            exp_4_b3: '<strong>Impact Assessment (87.5% Top Comprehension):</strong> Evaluated program effectiveness via pre/post-test assessments, achieving 87.5% top comprehension level among participants.',

            pill_art: 'WORK PORTFOLIO & DELIVERABLES',
            sec_art_title: 'Work Portfolio & HR Deliverables',
            sec_art_sub: 'Screenshots Compilation: Analytics Dashboards, L&D TORs & Modules, BNSP Forms, & Psychological Instruments.',

            tab_all: 'All Documents',
            tab_analytics: 'Dashboards & Analytics',
            tab_governance: 'TOR, Modules & SOPs',
            tab_bnsp: 'BNSP Certifications',
            tab_psychology: 'Assessment & Research',

            art_1_tag: 'Dashboards & Data Analytics',
            art_1_title: 'People Analytics Executive Dashboards (Power BI & R)',
            art_1_desc: 'Employee retention quantitative regression modeling in R and headcount analytics dashboard in Power BI.',
            art_1_status: '<i class="fas fa-check-double"></i> Verified & Documented',

            art_2_tag: 'TOR, L&D Modules & SOPs',
            art_2_title: 'Training TORs, Upskilling Modules & Visual SOPs',
            art_2_desc: 'Terms of Reference (TOR) documents based on TNA, upskilling learning modules for Kind to Mind, and visual SOPs for DSDM UNDIP.',
            art_2_status: '<i class="fas fa-check-double"></i> Verified & Documented',

            art_3_tag: 'BNSP Certifications',
            art_3_title: 'Payroll Calculation, PPh 21 TER & BPJS Tax Audit',
            art_3_desc: 'Official BNSP certification audit spreadsheet: PPh 21 TER (PMK 168/2023) tax formulas and BPJS social security calculations.',
            art_3_status: '<i class="fas fa-check-double"></i> BNSP RI Certified 2025',

            art_4_tag: 'Assessment & Research',
            art_4_title: 'Pre/Post-Test Evaluation Instruments & Research Analytics',
            art_4_desc: 'Behavioral psychology measurement tools, work engagement scale design, and quantitative employee behavioral analysis.',
            art_4_status: '<i class="fas fa-check-double"></i> Applied Undip Research',

            pill_bnsp_vault: 'OFFICIAL BNSP RI CERTIFICATION',
            sec_bnsp_vault_title: 'Human Capital Technical Qualifications',
            sec_bnsp_vault_sub: 'Mastery of Technical Competency Units Based on Official BNSP RI Certification (2025)',

            bnsp_card_1_title: 'Job Description Structure & Analysis',
            bnsp_card_1_desc: 'Structuring standardized job descriptions aligned with SKKNI benchmarks, mapping job analysis, minimum qualifications, and Key Performance Indicators (KPIs).',
            bnsp_card_1_h1: '<i class="fas fa-check"></i> SKKNI BNSP Standard',
            bnsp_card_1_h2: '<i class="fas fa-check"></i> Job Analysis',

            bnsp_card_2_title: 'Payroll Administration & Tax Compliance (PPh 21 TER)',
            bnsp_card_2_desc: 'Managing payroll administration, overtime calculations, and PPh 21 TER (PMK 168/2023) tax compliance with zero reporting discrepancies.',
            bnsp_card_2_h1: '<i class="fas fa-check"></i> PPh 21 TER PMK 168/2023',
            bnsp_card_2_h2: '<i class="fas fa-check"></i> Payroll Formulation',

            bnsp_card_3_title: 'Social Security Governance (BPJS Employment & Health)',
            bnsp_card_3_desc: 'Mastering calculation formulas and compliance governance for BPJS Health and BPJS Employment (JHT, JKK, JKM, JP, and JKP) for workforce social security.',
            bnsp_card_3_h1: '<i class="fas fa-check"></i> BPJS Employment',
            bnsp_card_3_h2: '<i class="fas fa-check"></i> BPJS Health',

            pill_od: 'INTERACTIVE DEMO',
            sec_od_title: 'Visual OD Demo: 9-Box Talent Matrix',
            sec_od_sub: 'Developed Based on McKinsey & Co. Framework.',

            pill_sim: 'PREDICTIVE HR MODEL',
            sec_sim_title: 'Workforce Flight-Risk Predictor Simulator',
            sec_sim_sub: 'Interactive mathematical model predicting turnover probability and Workload Analysis (WLA).',
            sim_param_title: '<i class="fas fa-sliders-h"></i> Employee Input Parameters',
            sim_label_sat: 'Job Satisfaction Score (1 - 10)',
            sim_label_workload: 'Weekly Work Hours (Hours)',
            sim_label_comp: 'Market Compensation Percentile (%)',
            sim_label_manager: 'Manager Relationship Rating (1 - 5)',
            sim_output_title: '<i class="fas fa-chart-bar"></i> Analytics Calculation Output',
            sim_rec_title: '<i class="fas fa-lightbulb"></i> Strategic Action Recommendation:',

            pill_skills: 'QUALIFICATIONS',
            sec_skills_title: 'Tested Competency Matrix',
            sec_skills_sub: 'Mastery of Frameworks, Analytical Tools, and Indonesian Labor Law',

            skill_cat_1_title: '<i class="fas fa-brain"></i> HC Core Competencies',
            skill_hc_1: 'Job Analysis & Competency Modeling (SKKNI BNSP Standard)',
            skill_hc_2: 'Psychometric Assessment & Talent Potential Mapping',
            skill_hc_3: 'Organizational Behavior, Work Motivation & Culture Alignment',
            skill_hc_4: 'Organizational Development (OD) & TNA Interventions',
            skill_hc_5: 'Workload Analysis (WLA) & Stakeholder Management',

            skill_cat_2_title: '<i class="fas fa-database"></i> Data Analytics & Tech Stack',
            skill_data_1: 'Advanced Excel (Data Cleaning, Logical Formulas, Pivot Tables & Payroll Calculation)',
            skill_data_2: 'Power BI (DAX Formulas, Data Modeling & Executive Dashboards)',
            skill_data_3: 'R Programming & Statistical Quantitative Modeling',
            skill_data_4: 'SPSS Statistical Analysis & Psychometric Auditing',

            skill_cat_3_title: '<i class="fas fa-gavel"></i> HR Governance & Legal Compliance',
            skill_gov_1: 'Official BNSP Certified HR Staff (BNSP RI 2025)',
            skill_gov_2: 'SHRM HR Foundations & HRCI Recruiting Foundations (2026)',
            skill_gov_3: 'McKinsey.org Forward Program Alumnus (2026)',
            skill_gov_4: 'Indonesian Labor Law & Regulations (UU 13/2003, PP 35/2021)',
            skill_gov_5: 'PPh 21 TER (PMK 168/2023) Tax Calculation & BPJS Health/Employment Governance',

            pill_contact: 'LET\'S CONNECT',
            sec_contact_title: 'Let\'s Connect & Collaborate',
            sec_contact_sub: 'Open for professional discussions regarding organizational development, People Analytics, and contribution opportunities.',
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
        langToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const nextLang = currentLang === 'id' ? 'en' : 'id';
            applyLanguage(nextLang);
        });
    }

    if (currentLang === 'en') {
        applyLanguage('en');
    }

    console.log("Muhammad Aqna Portfolio Script Active & Fully Optimized.");
});
