var scrollStartPoint = 100;

document.addEventListener("DOMContentLoaded", function () {
    changeNavBehaviour();
    
    // Important: Asigură-te că nu interacționează cu comportamentul butonului burger
    // Adaugă această verificare
    const burgerMenu = document.querySelector('.burger-menu');
    if (burgerMenu) {
        // Păstrează eventListener-ul existent
        const existingListeners = burgerMenu.getAttribute('data-has-listeners');
        if (!existingListeners) {
            burgerMenu.setAttribute('data-has-listeners', 'true');
        }
    }
});

function changeNavBehaviour()
    {
        var prevScrollpos = window.scrollY;
        var nav = document.querySelector("nav ul");
        nav.style.background = "#070F2A";
        window.onscroll = function() 
        {
            var currentScrollPos = window.scrollY;
    
            if (currentScrollPos > scrollStartPoint) {
                if (prevScrollpos > currentScrollPos) {
                    nav.style.top = "0";
                } else {
                    nav.style.top = "-50px";
                }
            } else {
                nav.style.top = "0";
            }
            prevScrollpos = currentScrollPos;
        };
    }