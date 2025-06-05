// Animations optimisées pour le portfolio
document.addEventListener('DOMContentLoaded', function() {
    // Animation des sections au défilement avec IntersectionObserver
    const sections = document.querySelectorAll('.section');
    const navbar = document.querySelector('nav');
    
    // Observer pour les sections - apparition progressive
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    // Observer pour la navbar - changement au scroll
    const navObserver = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { threshold: 0, rootMargin: "-100px 0px 0px 0px" });
    
    // Appliquer les observers
    const firstSection = document.querySelector('#accueil');
    if (firstSection) navObserver.observe(firstSection);
    sections.forEach(section => sectionObserver.observe(section));
    
    // Animation des icônes au survol - effet de rotation
    document.querySelectorAll('.carte-competence i').forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(5deg)';
        });
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0)';
        });
    });
});
