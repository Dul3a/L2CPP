document.addEventListener("DOMContentLoaded", function() {
    // Selectează butonul burger și lista navbar
    const burgerMenu = document.querySelector('.burger-menu');
    const navbar = document.querySelector('.navbar');
    const navbarList = navbar ? navbar.querySelector('ul') : null;
    
    // Verifică dacă elementele necesare există
    if (burgerMenu && navbarList) {
        // Curăță orice event listeners existente pentru a evita duplicate
        burgerMenu.replaceWith(burgerMenu.cloneNode(true));
        
        // Selectează din nou butonul după clonare
        const newBurgerMenu = document.querySelector('.burger-menu');
        
        // Adaugă eveniment de click pentru butonul burger
        newBurgerMenu.addEventListener('click', function() {
            console.log('Burger menu clicked'); // Pentru debugging
            this.classList.toggle('active');
            navbarList.classList.toggle('open');
        });
        
        // Închide meniul la click pe un link
        const navLinks = navbarList.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                newBurgerMenu.classList.remove('active');
                navbarList.classList.remove('open');
            });
        });
    } 
    // Dacă nu există buton burger dar există navbar, creăm butonul
    else if (navbar && !burgerMenu) {
        // Creează butonul burger
        const newBurgerMenu = document.createElement('button');
        newBurgerMenu.classList.add('burger-menu');
        newBurgerMenu.innerHTML = '<span></span><span></span><span></span>';
        
        // Adaugă butonul în navbar
        navbar.insertBefore(newBurgerMenu, navbar.firstChild);
        
        // Adaugă eveniment de click pentru butonul burger
        newBurgerMenu.addEventListener('click', function() {
            console.log('Burger menu clicked (created)'); // Pentru debugging
            this.classList.toggle('active');
            if (navbarList) {
                navbarList.classList.toggle('open');
            }
        });
        
        // Închide meniul la click pe un link
        if (navbarList) {
            const navLinks = navbarList.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    newBurgerMenu.classList.remove('active');
                    navbarList.classList.remove('open');
                });
            });
        }
    }
}); 