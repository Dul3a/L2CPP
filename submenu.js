document.addEventListener("DOMContentLoaded", function() {
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    const submenuBtns = document.querySelectorAll('.submenu-btn');
    const sidebar = document.querySelector('.sidebar');

    // Detectează limba paginii bazată pe URL
    const isEnglishPage = window.location.pathname.includes('/pages/') || 
                          window.location.pathname.includes('eng.html');
    
    // Creează butonul pentru a deschide/închide submeniul
    const toggleSidebarBtn = document.createElement('button');
    toggleSidebarBtn.textContent = isEnglishPage ? 'Menu' : 'Meniu'; // Text în funcție de limbă
    toggleSidebarBtn.classList.add('toggle-sidebar-btn');
    
    // Adaugă butonul direct în body pentru poziționare mai bună
    document.body.appendChild(toggleSidebarBtn);
    
    // Funcție pentru actualizarea poziției butonului în mod responsive
    function updateButtonPosition() {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        
        // Stilizează butonul pentru a fi poziționat mai bine pe mobil
        toggleSidebarBtn.style.position = 'fixed';
        toggleSidebarBtn.style.top = (navbarHeight + 0.5) + 'rem';  // Puțin mai jos de navbar
        toggleSidebarBtn.style.left = '50%';  // Centrat orizontal
        toggleSidebarBtn.style.transform = 'translateX(-50%)';  // Ajustare pentru centrare perfectă
        toggleSidebarBtn.style.zIndex = '999'; // Asigură că este deasupra altor elemente
        toggleSidebarBtn.style.padding = '0.5rem 1rem'; // Dimensiuni responsive
        toggleSidebarBtn.style.fontSize = '0.9rem'; // Dimensiune text responsivă
        toggleSidebarBtn.style.borderRadius = '0.25rem'; // Colțuri rotunjite responsive
        toggleSidebarBtn.style.opacity = '0.9'; // Ușor transparent
        toggleSidebarBtn.style.boxShadow = '0 0.125rem 0.3rem rgba(0,0,0,0.2)'; // Efect de umbră
        toggleSidebarBtn.style.cursor = 'pointer'; // Cursor pointer pentru mai bună utilizabilitate
        toggleSidebarBtn.style.background = '#070F2A'; // Culoare de fundal care se potrivește cu tema
        toggleSidebarBtn.style.color = 'white'; // Text alb pentru contrast
        toggleSidebarBtn.style.border = 'none'; // Elimină bordura implicită
    }
    
    // Apelează funcția la încărcare
    updateButtonPosition();
    
    // Recalculează poziția la redimensionarea ferestrei
    window.addEventListener('resize', updateButtonPosition);
    
    // Verifică dimensiunea ecranului
    function checkScreenSize() {
        if (window.innerWidth > 768) {
            sidebar.classList.add('show');
            toggleSidebarBtn.style.display = 'none';
        } else {
            sidebar.classList.remove('show');
            toggleSidebarBtn.style.display = 'block';
            // Actualizează poziția butonului când devine vizibil
            updateButtonPosition();
        }
    }
    
    // Rulează verificarea la încărcarea paginii
    checkScreenSize();
    
    // Toggle pentru submeniu când se apasă butonul
    toggleSidebarBtn.addEventListener('click', function() {
        sidebar.classList.toggle('show');
    });
    
function setActiveStates() {
    let currentUrl = window.location.pathname;
    segments = currentUrl.split('/');
    currentUrl = segments[segments.length - 1];

    let submenuFound = false;
    submenuBtns.forEach(btn => {
        let btnUrl = btn.parentNode.getAttribute('href');
        segments = btnUrl.split('/');
        btnUrl = segments[segments.length - 1];
        if (btnUrl === currentUrl) {
            btn.classList.add('active');
            btn.parentNode.classList.add('active');
            btn.closest('.panel').classList.add('show');
            btn.closest('.accordion').querySelector('.accordion-btn').classList.add('active');
            submenuFound = true;
        } else {
            btn.classList.remove('active');
            btn.parentNode.classList.remove('active');
        }
    });

    if (!submenuFound) {
        const firstAccordionBtn = accordionBtns[0];
        const firstPanel = firstAccordionBtn.nextElementSibling;
        const firstSubmenuBtn = firstPanel.querySelector('.submenu-btn');

        firstAccordionBtn.classList.add('active');
        firstPanel.classList.add('show');
        firstSubmenuBtn.classList.add('active');
    }
}

setActiveStates();

accordionBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const panel = this.nextElementSibling;

        panel.classList.toggle('show');

        this.classList.toggle('active');

        accordionBtns.forEach(otherBtn => {
            if (otherBtn !== btn) {
                otherBtn.classList.remove('active');
                otherBtn.nextElementSibling.classList.remove('show');
            }
        });
    });
});

submenuBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        submenuBtns.forEach(subBtn => subBtn.classList.remove('active'));

        this.classList.add('active');
    });
});
});
