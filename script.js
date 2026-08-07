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

    console.log("Muhammad Aqna Portfolio Script Active & Fully Optimized.");
});
