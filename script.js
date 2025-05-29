document.addEventListener('DOMContentLoaded', function() {
    // Lógica para el Modal de Login
    const loginModal = document.getElementById('loginModal');
    const openLoginModalBtn = document.getElementById('openLoginModal');
    const closeLoginModalBtn = document.querySelector('.modal .close-button');

    if (openLoginModalBtn && loginModal) {
        openLoginModalBtn.addEventListener('click', function() {
            loginModal.style.display = 'block';
        });

        closeLoginModalBtn.addEventListener('click', function() {
            loginModal.style.display = 'none';
        });

        // Cerrar modal al hacer clic fuera de él
        window.addEventListener('click', function(event) {
            if (event.target == loginModal) {
                loginModal.style.display = 'none';
            }
        });
    }

    // Lógica para el menú hamburguesa (mobile toggle)
    const menuToggleBtn = document.getElementById('menuToggleBtn');
    const mainMenu = document.getElementById('main-menu');

    if (menuToggleBtn && mainMenu) {
        menuToggleBtn.addEventListener('click', function() {
            mainMenu.classList.toggle('active');
        });
    }

    // Lógica para los desplegables del menú principal (en desktop y click en mobile)
    document.querySelectorAll('.dropdown > .nav-link.dropbtn').forEach(dropbtn => {
        dropbtn.addEventListener('click', function(e) {
            e.preventDefault(); // Evitar navegación si es un desplegable

            // Cerrar otros desplegables si están abiertos
            document.querySelectorAll('.dropdown.active').forEach(otherDropdown => {
                if (otherDropdown !== this.parentNode) {
                    otherDropdown.classList.remove('active');
                }
            });

            // Toggle del desplegable actual
            this.parentNode.classList.toggle('active');
        });
    });

    // Cerrar desplegables si se hace clic fuera
    window.addEventListener('click', function(event) {
        if (!event.target.matches('.dropbtn') && !event.target.closest('.dropdown-content')) {
            document.querySelectorAll('.dropdown.active').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

    // Lógica para el scroll suave de los enlaces del menú
    document.querySelectorAll('.main-nav a.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // No prevenir el default si es un menú desplegable (dropbtn)
            if (this.classList.contains('dropbtn')) {
                return;
            }
            
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });

                // Cierra el menú hamburguesa en móvil después de hacer clic en un enlace
                if (window.innerWidth <= 992) { // Define tu breakpoint para móvil
                    mainMenu.classList.remove('active');
                }
            }
        });
    });

    // Resaltar el enlace activo del menú al hacer scroll
    const sections = document.querySelectorAll('.content-section, #footer'); // Incluimos el footer para el enlace "Contacto"
    const navLinks = document.querySelectorAll('.main-nav a.nav-link:not(.dropbtn)'); // Excluir los botones de desplegable

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120; // Ajuste para el header fijo y el padding
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') && link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Asegurar que el scroll inicial vaya a la sección de inicio
    window.addEventListener('load', () => {
        if (window.location.hash) {
            document.querySelector(window.location.hash).scrollIntoView({ behavior: 'smooth' });
        } else {
            document.querySelector('#hero-section').scrollIntoView();
        }
    });
});