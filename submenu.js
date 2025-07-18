document.addEventListener("DOMContentLoaded", function() {
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    const submenuBtns = document.querySelectorAll('.submenu-btn');
    const sidebar = document.querySelector('.sidebar');

    const isEnglishPage = window.location.pathname.includes('/pages/') || 
                          window.location.pathname.includes('eng.html');
    
    const toggleSidebarBtn = document.createElement('button');
    toggleSidebarBtn.textContent = isEnglishPage ? 'Menu' : 'Meniu'; // text in functie de limba
    toggleSidebarBtn.classList.add('toggle-sidebar-btn');
    
    document.body.appendChild(toggleSidebarBtn);
    
    function updateButtonPosition() {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        
        // ajustam butonul pentru a fi pozitionat mai bine pe mobil
        toggleSidebarBtn.style.position = 'fixed';
        toggleSidebarBtn.style.top = (navbarHeight + 0.5) + 'rem';  
        toggleSidebarBtn.style.left = '50%'; 
        toggleSidebarBtn.style.transform = 'translateX(-50%)';  
        toggleSidebarBtn.style.zIndex = '999'; // ca sa fie deasupra mereu
        toggleSidebarBtn.style.padding = '0.5rem 1rem'; 
        toggleSidebarBtn.style.fontSize = '0.9rem'; 
        toggleSidebarBtn.style.borderRadius = '0.25rem'; 
        toggleSidebarBtn.style.opacity = '0.9'; 
        toggleSidebarBtn.style.boxShadow = '0 0.125rem 0.3rem rgba(0,0,0,0.2)'; 
        toggleSidebarBtn.style.cursor = 'pointer'; 
        toggleSidebarBtn.style.background = '#070F2A'; 
        toggleSidebarBtn.style.color = 'white'; 
        toggleSidebarBtn.style.border = 'none'; 
    }
    
    updateButtonPosition();
    
    window.addEventListener('resize', updateButtonPosition);
    
    // verificam dimensiunea ecranului
    function checkScreenSize() {
        if (window.innerWidth > 768) {
            sidebar.classList.add('show');
            toggleSidebarBtn.style.display = 'none';
        } else {
            sidebar.classList.remove('show');
            toggleSidebarBtn.style.display = 'block';
            updateButtonPosition();
        }
    }
    
    checkScreenSize();
    
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
