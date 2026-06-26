
document.addEventListener("DOMContentLoaded", () => {
    
    // --- Reveal Observer ---
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const el = entry.target;
                const delay = el.dataset.delay ? parseInt(el.dataset.delay) * 120 : 0;
                setTimeout(() => el.classList.add('visible'), delay);
                revealObserver.unobserve(el);
                
                if(el.classList.contains('proof-title') || el.classList.contains('vm-header')) {
                    el.classList.add('anim');
                }
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal-elem').forEach(el => revealObserver.observe(el));

    // --- Proof Section Animations ---
    const proofObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('anim');
                proofObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    document.querySelector('.proof-title').classList.add('anim');
    document.querySelectorAll('.pc-card').forEach(c => proofObs.observe(c));
    document.querySelector('.vm-header').classList.add('anim');
    document.querySelectorAll('.vm-card').forEach(c => proofObs.observe(c));
    document.querySelector('.trust-strip').classList.add('anim');

    // --- Audio Logic & Waveforms ---
    document.querySelectorAll('.vm-waveform').forEach(wf => {
        for(let i=0; i<30; i++) {
            let bar = document.createElement('div');
            bar.className = 'vm-bar';
            let h = Math.random() * 60 + 20;
            bar.style.height = h + '%';
            bar.style.animationDelay = (Math.random() * 0.5) + 's';
            wf.appendChild(bar);
        }
    });

    const pCarousel = document.getElementById('proof-carousel');
    const pDots = document.querySelectorAll('.pc-dot');
    if(pCarousel && pDots.length) {
        pCarousel.addEventListener('scroll', () => {
            const cards = pCarousel.querySelectorAll('.pc-card');
            let minDiff = Infinity;
            let activeIdx = 0;
            cards.forEach((c, i) => {
                const rect = c.getBoundingClientRect();
                const centerDiff = Math.abs(rect.left + rect.width/2 - window.innerWidth/2);
                if(centerDiff < minDiff) { minDiff = centerDiff; activeIdx = i; }
            });
            pDots.forEach((d, i) => d.classList.toggle('active', i === activeIdx));
        });
    }

    let currentAudio = null;
    let currentCard = null;
    document.querySelectorAll('.vm-card').forEach(card => {
        const file = card.getAttribute('data-audio');
        const audio = new Audio(file);
        
        audio.addEventListener('ended', () => card.classList.remove('playing'));

        card.addEventListener('click', () => {
            if (currentAudio && currentAudio !== audio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
                if(currentCard) currentCard.classList.remove('playing');
            }
            if (audio.paused) {
                audio.play();
                card.classList.add('playing');
                currentAudio = audio;
                currentCard = card;
            } else {
                audio.pause();
                card.classList.remove('playing');
            }
        });
    });

    // --- GAP SECTION ANIMATION ---
    const gapObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
                const el = entry.target;
                gapObserver.unobserve(el);
                
                setTimeout(() => el.querySelector('.cb-text1').classList.add('anim'), 100);
                setTimeout(() => el.querySelector('.cb-line').classList.add('anim'), 500);
                setTimeout(() => {
                    const text2 = el.querySelector('.cb-text2');
                    text2.classList.add('anim', 'shake');
                    setTimeout(() => text2.classList.remove('shake'), 200);
                }, 900);

                setTimeout(() => {
                    el.querySelector('.dt-line-fill').classList.add('anim');
                    const items = el.querySelectorAll('.dt-item');
                    const dots = el.querySelectorAll('.dt-dot');
                    setTimeout(() => { items[0].classList.add('anim'); dots[0].classList.add('anim'); }, 100);
                    setTimeout(() => { items[1].classList.add('anim'); dots[1].classList.add('anim'); }, 800);
                    setTimeout(() => { items[2].classList.add('anim'); dots[2].classList.add('anim'); }, 1900);
                }, 1300);

                setTimeout(() => {
                    const squares = el.querySelectorAll('.sq-icon');
                    squares.forEach((sq, i) => {
                        setTimeout(() => {
                            sq.classList.add('anim');
                            if(i < 9) sq.classList.add('dead');
                            else sq.classList.add('alive');
                        }, i * 150);
                    });
                    setTimeout(() => el.querySelector('.killer-stat-text').classList.add('anim'), 10 * 150 + 300);
                }, 3500);
            }
        });
    }, { threshold: 0.2 });
    const gapSec = document.getElementById('gap-section');
    if(gapSec) gapObserver.observe(gapSec);

    // --- STORY SECTION ANIMATION ---
    const storyObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
                const el = entry.target;
                storyObserver.unobserve(el);

                el.querySelector('.story-card').classList.add('anim');
                
                setTimeout(() => {
                    el.querySelector('.st-line-fill').classList.add('anim');
                    const items = el.querySelectorAll('.st-item');
                    items.forEach((item, i) => {
                        setTimeout(() => item.classList.add('anim'), i * 400);
                    });
                    
                    setTimeout(() => {
                        el.querySelector('.st-divider').classList.add('anim');
                        el.querySelector('.st-quote').classList.add('anim');
                        el.querySelector('.st-attr').classList.add('anim');
                    }, items.length * 400 + 300);
                }, 600);
            }
        });
    }, { threshold: 0.3 });
    const storySec = document.getElementById('story-section');
    if(storySec) storyObserver.observe(storySec);

    // --- INSIDE THE BOOK ANIMATION ---
    const ibObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
                ibObserver.unobserve(entry.target);
                
                const cards = entry.target.querySelectorAll('.ib-card');
                cards.forEach((card, i) => {
                    setTimeout(() => {
                        card.classList.add('anim');
                    }, i * 150);
                });

                const anchor = entry.target.querySelector('#ib-anchor');
                if(anchor) {
                    setTimeout(() => {
                        anchor.classList.add('anim');
                    }, cards.length * 150 + 500);
                }
            }
        });
    }, { threshold: 0.15 });
    const ibSec = document.getElementById('book');
    if(ibSec) ibObserver.observe(ibSec);

    // --- Custom Specific Animations ---
    const customObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                // S6 Receipt
                if(entry.target.id === 'receipt') {
                    const lines = entry.target.querySelectorAll('.r-line');
                    lines.forEach((l, i) => {
                        setTimeout(() => {
                            l.classList.add('visible');
                            l.querySelector('.receipt-val').classList.add('flash-green');
                        }, i * 300);
                    });
                    const total = entry.target.querySelector('.r-total');
                    setTimeout(() => {
                        total.classList.add('visible');
                        total.querySelector('.receipt-total').classList.add('flash-red');
                    }, lines.length * 300);
                    customObserver.unobserve(entry.target);
                }
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -10% 0px' });


    const receipt = document.getElementById('receipt');
    if(receipt) customObserver.observe(receipt);

    // Sticky CTA Logic
    const sticky = document.getElementById('sticky-cta');
    const storySection = document.getElementById('story');
    const quizModal = document.getElementById('quiz-modal');
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(!entry.isIntersecting && entry.boundingClientRect.top < 0 && !quizModal.classList.contains('active')) sticky.classList.add('visible');
            else sticky.classList.remove('visible');
        });
    }, { threshold: 0 });
    if(storySection) scrollObserver.observe(storySection);

    // --- FINALE ANIMATIONS ---
    const finObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
                const el = entry.target;
                
                if(el.id === 'fin-bridge') el.classList.add('anim');
                else if(el.id === 'fin-cta-1') el.querySelector('.fin-btn').classList.add('anim');
                else if(el.id === 'fin-guar') el.classList.add('anim');
                else if(el.id === 'fin-brand') el.classList.add('anim');
                else if(el.id === 'fin-urg') {
                    const bgShift = document.getElementById('bg-shift');
                    if(bgShift) bgShift.classList.add('active');
                    
                    const circles = el.querySelectorAll('.fin-circle');
                    circles.forEach((c, i) => {
                        setTimeout(() => { c.classList.add('show'); }, i * 100);
                    });
                    
                    setTimeout(() => {
                        el.querySelector('.fin-btn').classList.add('anim');
                    }, circles.length * 100 + 100);
                }

                finObserver.unobserve(el);
            }
        });
    }, { threshold: 0.2 });
    
    ['fin-bridge', 'fin-cta-1', 'fin-guar', 'fin-brand', 'fin-urg'].forEach(id => {
        const el = document.getElementById(id);
        if(el) finObserver.observe(el);
    });

    const screens = document.querySelectorAll('.quiz-screen');
    let qStartTracked = false;

    document.querySelectorAll('.cta-trigger').forEach(btn => {
        btn.addEventListener('click', () => {
            quizModal.style.display = 'flex';
            setTimeout(() => {
                quizModal.classList.add('active');
                
                // Trigger staggered animations for modal elements
                const pInd = document.querySelector('.prog-ind');
                const fCards = document.querySelectorAll('.form-card');
                const pSteps = document.querySelector('.post-submit-steps');
                
                if(pInd) setTimeout(() => pInd.classList.add('visible'), 100);
                if(fCards[0]) setTimeout(() => fCards[0].classList.add('visible'), 300);
                if(fCards[1]) setTimeout(() => fCards[1].classList.add('visible'), 500);
                if(pSteps) setTimeout(() => pSteps.classList.add('visible'), 700);

            }, 10);
            sticky.classList.remove('visible');
            if(!qStartTracked) { 
                if(typeof fbq === 'function') {
                    try { fbq('trackCustom', 'QuizStart'); } catch(e) {}
                }
                qStartTracked = true; 
            }
        });
    });

    document.getElementById('quiz-back').addEventListener('click', () => {
        quizModal.classList.remove('active');
        setTimeout(() => quizModal.style.display = 'none', 400);
        const storyRect = storySection.getBoundingClientRect();
        if(storyRect.bottom < 0) sticky.classList.add('visible');
    });

    // --- Form Logic ---
    let selectedField = "";
    const nameInput = document.getElementById('f-name');
    const phoneInput = document.getElementById('f-phone');
    const reasonInput = document.getElementById('f-reason');
    const problemInput = document.getElementById('f-problem');
    const submitBtn = document.getElementById('submit-contact');
    
    const ccReason = document.getElementById('cc-reason');
    const ccProblem = document.getElementById('cc-problem');

    let regTracked = false;
    let leadTracked = false;

    // Chip selection
    document.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', function() {
            const parent = this.parentElement;
            parent.querySelectorAll('.chip').forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            if(parent.id === 'f-field') selectedField = this.innerText;
            checkForm();
        });
    });

    // Character counters
    reasonInput.addEventListener('input', () => updateCounter(reasonInput, ccReason, 100, 80));
    problemInput.addEventListener('input', () => updateCounter(problemInput, ccProblem, 200, 160));

    function updateCounter(input, counterEl, max, warn) {
        let val = input.value;
        if(val.length > max) {
            input.value = val.substring(0, max);
            val = input.value;
        }
        counterEl.innerText = `${val.length}/${max}`;
        counterEl.classList.remove('amber', 'red');
        if(val.length >= max) counterEl.classList.add('red');
        else if(val.length >= warn) counterEl.classList.add('amber');
        checkForm();
    }

    // Validation on blur
    [nameInput, phoneInput, reasonInput, problemInput].forEach(inp => {
        inp.addEventListener('input', () => {
            inp.classList.remove('err');
            inp.closest('.fg').classList.remove('has-err');
            checkForm();
        });
        inp.addEventListener('blur', () => {
            let valid = false;
            if(inp === nameInput) valid = nameInput.value.trim().length >= 3;
            else if(inp === phoneInput) valid = /^(05|06|07|\+2135|\+2136|\+2137)\d{8}$/.test(phoneInput.value.replace(/\s/g, ''));
            else if(inp === reasonInput) valid = reasonInput.value.trim().length >= 2;
            else if(inp === problemInput) valid = problemInput.value.trim().length >= 2;

            if(!valid) {
                inp.classList.add('err');
                inp.closest('.fg').classList.add('has-err');
                const fg = inp.closest('.fg');
                fg.classList.remove('shake');
                void fg.offsetWidth; // trigger reflow
                fg.classList.add('shake');
            } else {
                inp.classList.remove('err');
                inp.closest('.fg').classList.remove('has-err');
                inp.classList.add('success');
                setTimeout(() => inp.classList.remove('success'), 300);
            }
        });
    });

    function checkForm() {
        const nameValid = nameInput.value.trim().length >= 3;
        const phoneRegex = /^(05|06|07|\+2135|\+2136|\+2137)\d{8}$/;
        const phoneValid = phoneRegex.test(phoneInput.value.replace(/\s/g, ''));
        const reasonValid = reasonInput.value.trim().length >= 2;
        const problemValid = problemInput.value.trim().length >= 2;
        submitBtn.disabled = !(nameValid && phoneValid && selectedField && reasonValid && problemValid);
    }

    submitBtn.addEventListener('click', () => {
        // Change button to loading state
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        submitBtn.innerHTML = '<div class="loader-icon"></div><span class="btn-text">جاري الإرسال...</span>';

        if("vibrate" in navigator) navigator.vibrate(50);
        
        if(!regTracked) {
            if(typeof fbq === 'function') {
                try { fbq('track', 'CompleteRegistration', { content_name: 'contact_card', business_field: selectedField, reason: reasonInput.value, problem: problemInput.value }); } catch(e) {}
            }
            regTracked = true;
        }

        const waUrl = `https://chat.whatsapp.com/DyslfUafv2AAYIZ9WmPUYo`;
        
        if(!leadTracked) {
            if(typeof fbq === 'function') {
                try { fbq('track', 'Lead', { content_name: 'whatsapp_book_request', score: '4/4', business_field: selectedField, value: 1, currency: 'USD' }); } catch(e) {}
            }
            leadTracked = true;
        }
        
        // 2 second fake loading state to build trust
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.classList.add('success');
            submitBtn.innerHTML = '<span class="btn-text">✅ تم! جاري تحويلك لواتساب...</span>';
            
            setTimeout(() => {
                window.location.href = waUrl;
            }, 500);
        }, 2000);
    });
});
