// Animations optimisées pour le portfolio
document.addEventListener('DOMContentLoaded', function() {
    // --- Hamburger Menu ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.menu-navigation');
    const navLinks = document.querySelectorAll('.lien-nav');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // --- Typing Effect ---
    const textElement = document.querySelector('.typing-text');
    if (textElement) {
        const textToType = textElement.textContent;
        textElement.textContent = '';
        let charIndex = 0;

        function type() {
            if (charIndex < textToType.length) {
                textElement.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(type, 100);
            }
        }
        // Start typing after a small delay
        setTimeout(type, 500);
    }

    // --- Back to Top Button ---
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // --- Intersection Observer for Sections & Navbar ---
    const sections = document.querySelectorAll('.section');
    const navbar = document.querySelector('nav');
    const accueilSection = document.querySelector('#accueil');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Scrollspy ---
    const sectionsSpy = document.querySelectorAll('section');
    const navLinksSpy = document.querySelectorAll('.menu-navigation .lien-nav');
    
    const observerSpy = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Active le lien correspondant
                const id = entry.target.getAttribute('id');
                navLinksSpy.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        rootMargin: "-50% 0px -50% 0px" // Ligne de détection au milieu de l'écran
    });

    sectionsSpy.forEach(section => observerSpy.observe(section));

    // --- Popup Close Logic ---
    document.querySelectorAll('.popup-close').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            const href = btn.getAttribute('href');
            if (href === '#') {
                e.preventDefault();
                history.replaceState(null, '', window.location.pathname + window.location.search);
            }
            
            const projects = document.getElementById('projets');
            if (projects) {
                if (!projects.hasAttribute('tabindex')) projects.setAttribute('tabindex', '-1');
                setTimeout(() => projects.focus({ preventScroll: true }), 10);
            }
        });
    });
});