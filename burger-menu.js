document.addEventListener("DOMContentLoaded", function() {
    const burgerMenu = document.querySelector('.burger-menu');
    const navbar = document.querySelector('.navbar');
    const navbarList = navbar ? navbar.querySelector('ul') : null;
    
    if (burgerMenu && navbarList) {
        burgerMenu.replaceWith(burgerMenu.cloneNode(true));
        
        const newBurgerMenu = document.querySelector('.burger-menu');
        
        newBurgerMenu.addEventListener('click', function() {
            console.log('Burger menu clicked'); // pentru debugging
            this.classList.toggle('active');
            navbarList.classList.toggle('open');
        });
        
        // inchide meniul la click pe un link
        const navLinks = navbarList.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                newBurgerMenu.classList.remove('active');
                navbarList.classList.remove('open');
            });
        });
    } 
    // daca nu exista buton burger dar exista navbar cream butonul
    else if (navbar && !burgerMenu) {
        const newBurgerMenu = document.createElement('button');
        newBurgerMenu.classList.add('burger-menu');
        newBurgerMenu.innerHTML = '<span></span><span></span><span></span>';
        
        navbar.insertBefore(newBurgerMenu, navbar.firstChild);
        
        newBurgerMenu.addEventListener('click', function() {
            console.log('Burger menu clicked (created)'); // pentru debugging
            this.classList.toggle('active');
            if (navbarList) {
                navbarList.classList.toggle('open');
            }
        });
        
        // inchide meniul la click pe un link
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