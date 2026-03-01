/* script.js */

// Redirection automatique vers HTTPS (sauf en local)
if (window.location.protocol === 'http:' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    window.location.href = 'https://' + window.location.host + window.location.pathname + window.location.search + window.location.hash;
}

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Navigation ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const links = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Animate hamburger icon (optional toggle class)
        hamburger.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Close menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });


    // --- Sticky Navbar Background ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(18, 18, 18, 0.98)';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
        } else {
            navbar.style.background = 'rgba(18, 18, 18, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
        }
    });


    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                // revealObserver.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // --- Smooth Scroll pour les ancres ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;

            e.preventDefault();

            const navHeight = navbar.offsetHeight;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        });
    });

    // --- Mise à jour de l'onglet actif dans la navbar ---
    const sections = document.querySelectorAll('section[id]');
    const navLinksArray = Array.from(links);

    const setActiveNav = () => {
        const scrollPos = window.pageYOffset;
        const offset = navbar.offsetHeight + 50;

        let currentId = 'home';
        sections.forEach(section => {
            const top = section.offsetTop - offset;
            if (scrollPos >= top) {
                currentId = section.id;
            }
        });

        navLinksArray.forEach(link => {
            const href = link.getAttribute('href');
            if (!href) return;
            const linkId = href.replace('#', '');
            if (linkId === currentId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    window.addEventListener('scroll', setActiveNav);
    setActiveNav();

    // --- Formulaire newsletter ---
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterEmail = document.getElementById('newsletter-email');
    const newsletterMessage = document.getElementById('newsletter-message');

    if (newsletterForm && newsletterEmail && newsletterMessage) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailValue = newsletterEmail.value.trim();

            if (!emailValue || !emailValue.includes('@')) {
                newsletterMessage.textContent = 'Merci de renseigner une adresse email valide.';
                newsletterMessage.classList.remove('success');
                newsletterMessage.classList.add('error');
                return;
            }

            // Simple feedback côté client
            newsletterMessage.textContent = 'Merci ! Vous êtes maintenant inscrit(e) à notre newsletter.';
            newsletterMessage.classList.remove('error');
            newsletterMessage.classList.add('success');
            newsletterForm.reset();
        });
    }

    // --- Formulaire de réservation ---
    const reservationForm = document.getElementById('reservation-form');
    const reservationMessage = document.getElementById('reservation-message');

    if (reservationForm && reservationMessage) {
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(reservationForm);
            const requiredFields = ['name', 'email', 'phone', 'people', 'date', 'time'];
            let hasError = false;

            requiredFields.forEach((field) => {
                const value = (formData.get(field) || '').toString().trim();
                if (!value) {
                    hasError = true;
                }
            });

            if (hasError) {
                reservationMessage.textContent = 'Merci de remplir tous les champs obligatoires marqués d’un *.';
                reservationMessage.classList.remove('success');
                reservationMessage.classList.add('error');
                return;
            }

            reservationMessage.textContent = 'Merci ! Votre demande de réservation a bien été envoyée. Nous vous confirmerons rapidement.';
            reservationMessage.classList.remove('error');
            reservationMessage.classList.add('success');
            reservationForm.reset();
        });
    }
});
