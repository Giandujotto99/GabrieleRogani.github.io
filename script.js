// ========== GALLERY FUNCTIONALITY ==========
document.addEventListener('DOMContentLoaded', function() {
    // Generic handler for all project galleries
    document.querySelectorAll('.project-gallery').forEach(gallery => {
        const mainImage = gallery.querySelector('.gallery-main img');
        const thumbs = gallery.querySelectorAll('.thumb');

        if (!mainImage || !thumbs.length) return;

        thumbs.forEach(thumb => {
            thumb.addEventListener('click', () => {
                mainImage.src = thumb.src;
                mainImage.alt = thumb.alt;
                thumbs.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            });
        });
    });

    // ========== SMOOTH SCROLL ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== NAVBAR SCROLL EFFECT ==========
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.9)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });

    // ========== MOBILE MENU ==========
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // ========== SCROLL ANIMATIONS ==========
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.project-showcase, .skill-category, .about-text, .about-image').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add animate-in styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // ========== SKILL BARS ANIMATION ==========
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fills = entry.target.querySelectorAll('.skill-fill');
                fills.forEach(fill => {
                    const width = fill.style.width;
                    fill.style.width = '0';
                    setTimeout(() => {
                        fill.style.width = width;
                    }, 100);
                });
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-category').forEach(cat => {
        skillObserver.observe(cat);
    });

    // ========== ACTIVE NAV LINK ==========
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === `#${current}`) {
                link.style.color = '#D4A84B';
            }
        });
    });

    // ========== IMAGE LIGHTBOX (Simple) ==========
    document.querySelectorAll('.gallery-item, .gallery-main img').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            const lightbox = document.createElement('div');
            lightbox.style.cssText = `
                position: fixed;
                inset: 0;
                background: rgba(0,0,0,0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                padding: 40px;
                cursor: pointer;
            `;
            
            const imgClone = document.createElement('img');
            imgClone.src = this.src;
            imgClone.style.cssText = `
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
                border: 2px solid #D4A84B;
                border-radius: 8px;
            `;
            
            lightbox.appendChild(imgClone);
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';
            
            lightbox.addEventListener('click', () => {
                lightbox.remove();
                document.body.style.overflow = '';
            });
        });
    });
});

// ========== CONSOLE EASTER EGG ==========
console.log('%c🎮 Looking for a Game Developer?', 'font-size: 24px; font-weight: bold; color: #D4A84B;');
console.log('%cContact: gabriele.rogani@gmail.com', 'font-size: 14px; color: #fff;');
