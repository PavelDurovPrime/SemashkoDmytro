document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navbar Scroll Effect & Mobile Menu
    const navbar = document.getElementById('navbar');
    const burger = document.getElementById('burger');
    const navLinks = document.querySelector('.nav-links');

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    const navAnchors = navLinks.querySelectorAll('a');
    navAnchors.forEach(anchor => {
        anchor.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            entry.target.classList.add('active');
            
            // Trigger counter animation if it's a fact block
            const counter = entry.target.querySelector('.fact-num[data-target]');
            if (counter && !counter.classList.contains('counted')) {
                animateCounter(counter);
                counter.classList.add('counted');
            }
            
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 3. Counter Animation Logic
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const stepTime = Math.abs(Math.floor(duration / target));
        let current = 0;
        
        const timer = setInterval(() => {
            current += 1;
            el.innerText = current;
            if (current >= target) {
                clearInterval(timer);
                el.innerText = target;
            }
        }, stepTime);
    }

    // 4. Accordion Logic for Services
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isExpanded = header.getAttribute('aria-expanded') === 'true';
            
            // Close all others (optional - for auto-closing behavior)
            /*
            document.querySelectorAll('.accordion-header').forEach(other => {
                other.setAttribute('aria-expanded', 'false');
                other.nextElementSibling.style.maxHeight = null;
            });
            */
            
            if (isExpanded) {
                header.setAttribute('aria-expanded', 'false');
                content.style.maxHeight = null;
            } else {
                header.setAttribute('aria-expanded', 'true');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // 5. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Lightbox functions (global scope)
function openLightbox() {
    document.getElementById('lightbox').classList.add('active');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}
