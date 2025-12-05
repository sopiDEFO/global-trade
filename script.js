document.addEventListener('DOMContentLoaded', function() {
    
    // =======================================
    // --- 1. GESTION DE L'EN-TÊTE ET DE L'OVERLAY MOBILE ---
    // =======================================
    
    // --- Éléments du Menu Overlay Mobile ---
    const menuToggle = document.getElementById('menuToggle');
    const mobileOverlay = document.getElementById('mobileOverlay');
    
    // --- Éléments de Recherche Desktop ---
    const searchToggle = document.getElementById('searchToggle');
    const searchInputContainer = document.getElementById('searchInputContainer');
    const searchIconDesktop = document.getElementById('searchIcon'); 

    const body = document.body;

    // Fonction pour fermer la barre de recherche Desktop
    function closeDesktopSearchBar() {
        if (searchInputContainer) {
            searchInputContainer.classList.remove('open');
            // Assurez-vous que l'icône est la loupe
            searchIconDesktop.classList.remove('fa-xmark');
            searchIconDesktop.classList.add('fa-magnifying-glass');
        }
    }

    // Fonction pour fermer l'overlay mobile
    function closeMobileOverlay() {
        if (mobileOverlay && mobileOverlay.classList.contains('open')) {
            mobileOverlay.classList.remove('open');
            body.classList.remove('no-scroll'); // Réactive le défilement
            // Rétablit l'icône Menu
            if (menuToggle) {
                 menuToggle.innerHTML = '<i class="fa-solid fa-bars" id="menuIcon"></i> MENU';
            }
        }
    }

    // Logique du Menu Overlay (Mobile)
    if (menuToggle && mobileOverlay) {
        menuToggle.addEventListener('click', function() {
            
            // Basculer l'état ouvert/fermé
            mobileOverlay.classList.toggle('open');
            body.classList.toggle('no-scroll');

            // Changer l'icône entre bars et croix
            if (mobileOverlay.classList.contains('open')) {
                menuToggle.innerHTML = '<i class="fa-solid fa-xmark" id="menuIcon"></i> MENU'; 
            } else {
                menuToggle.innerHTML = '<i class="fa-solid fa-bars" id="menuIcon"></i> MENU';
            }
        });
    }

    // Logique de la Barre de Recherche (Desktop)
    if (searchToggle && searchInputContainer) {
        searchToggle.addEventListener('click', function() {
            
            // Basculer l'état ouvert du champ de recherche
            searchInputContainer.classList.toggle('open');
            
            // Changer l'icône entre loupe et croix
            if (searchInputContainer.classList.contains('open')) {
                searchIconDesktop.classList.remove('fa-magnifying-glass');
                searchIconDesktop.classList.add('fa-xmark');
            } else {
                searchIconDesktop.classList.remove('fa-xmark');
                searchIconDesktop.classList.add('fa-magnifying-glass');
            }
        });
    }
    
    // Gestion du Redimensionnement pour la cohérence
    window.addEventListener('resize', () => {
        const currentWidth = window.innerWidth;
        
        // Si on passe au mode Desktop (au-delà de 992px)
        if (currentWidth > 992) {
            closeMobileOverlay();
        } 
        
        // Si on passe au mode Mobile (sous 992px)
        if (currentWidth <= 992) {
            closeDesktopSearchBar();
        }
    });


    // =======================================
    // --- 2. LOGIQUE DU SLIDER AUTOMATIQUE ---
    // =======================================

    const sliderTrack = document.getElementById('sliderTrack');
    const sliderDots = document.getElementById('sliderDots');
    const slides = document.querySelectorAll('.slider-track .slide');
    const slideCount = slides.length;
    let currentSlide = 0;
    const slideIntervalTime = 5000; // 3 secondes comme demandé

    if (sliderTrack && slides.length > 0) {
        
        // --- Création des points de navigation (dots) ---
        for (let i = 0; i < slideCount; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.setAttribute('data-index', i);
            if (i === 0) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                showSlide(i);
                resetAutoSlide();
            });
            sliderDots.appendChild(dot);
        }

        const dots = document.querySelectorAll('.slider-dots .dot');

        // --- Fonction pour afficher une diapositive spécifique ---
        function showSlide(index) {
            if (index < 0) {
                index = slideCount - 1;
            } else if (index >= slideCount) {
                index = 0;
            }
            currentSlide = index;
            
            // Calcul du décalage horizontal
            const offset = -currentSlide * 100;
            sliderTrack.style.transform = `translateX(${offset}%)`;
            
            // Mise à jour des points
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }
        
        // --- Fonction pour passer à la diapositive suivante ---
        function nextSlide() {
            showSlide(currentSlide + 1);
        }
        
        // --- Auto-défilement ---
        let autoSlide = setInterval(nextSlide, slideIntervalTime);
        
        // --- Réinitialiser l'auto-défilement après une interaction manuelle (clic sur un point) ---
        function resetAutoSlide() {
            clearInterval(autoSlide);
            autoSlide = setInterval(nextSlide, slideIntervalTime);
        }

        // Afficher la première diapositive au chargement
        showSlide(currentSlide);
    }
});