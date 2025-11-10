// Animations optimisées pour le portfolio
document.addEventListener('DOMContentLoaded', function() {
    // Animation des sections au défilement avec IntersectionObserver
    const sections = document.querySelectorAll('.section');
    const navbar = document.querySelector('nav');
    
    // Observer unique pour gérer apparition des sections et l'état de la navbar
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const el = entry.target;
            if (el.classList && el.classList.contains('section')) {
                if (entry.isIntersecting) el.classList.add('visible');
            }

            // navbar: si la section d'accueil n'est pas intersectée, ajouter scrolled
            if (el.id === 'accueil') {
                if (!entry.isIntersecting) navbar.classList.add('scrolled');
                else navbar.classList.remove('scrolled');
            }
        });
    }, { threshold: 0.1, rootMargin: "-100px 0px 0px 0px" });

    // Appliquer l'observer
    sections.forEach(section => observer.observe(section));

    // Scrollspy: mettre en surbrillance le lien correspondant à la section visible
    const navLinks = document.querySelectorAll('.menu-navigation a');
    const sectionMap = new Map();
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            const sec = document.querySelector(href);
            if (sec) sectionMap.set(sec, link);
        }
    });

    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const link = sectionMap.get(entry.target);
            if (!link) return;
            if (entry.isIntersecting) {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    }, { threshold: 0.45 });

    sectionMap.forEach((_, section) => spyObserver.observe(section));

    // Les hover des icônes sont gérés en CSS (.carte-competence:hover i)
    // Empêcher le lien de fermeture de popup (href="#") de scroller en haut de la page.
    // On retire le fragment de l'URL via history.replaceState pour fermer la popup sans défilement.
    document.querySelectorAll('.popup-close').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            const href = btn.getAttribute('href');
            // Si le href est exactement '#', on empêche le comportement par défaut et on supprime le hash
            if (href === '#') {
                e.preventDefault();
                history.replaceState(null, '', window.location.pathname + window.location.search);
            } else {
                // Sinon on laisse la navigation (ex: href="#projets") fermer la popup via :target
                // Mais on veut s'assurer que le focus va vers la section projets sans scroller de manière brusque.
                // On laisse le navigateur naviguer naturellement vers l'ancre.
            }

            // Pour l'accessibilité: tenter de déplacer le focus vers la section 'projets' (prévenir le scroll)
            const projects = document.getElementById('projets');
            if (projects) {
                if (!projects.hasAttribute('tabindex')) projects.setAttribute('tabindex', '-1');
                // focus différé pour laisser la navigation terminer
                setTimeout(() => projects.focus({ preventScroll: true }), 10);
            }
        });
    });
});