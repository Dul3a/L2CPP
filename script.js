var scrollStartPoint = 100;

document.addEventListener("DOMContentLoaded", function () {
    const video = document.querySelector('.box');
    const animatedTextElements = document.querySelectorAll('.animated-text');

    function checkScroll() {
        const videoHeight = video.clientHeight;
        const scrollPosition = window.scrollY;
        if (scrollPosition >= videoHeight/4)
        {
            animatedTextElements.forEach(element => {
                element.classList.add('visible');
            });
        }
        else 
        {
            animatedTextElements.forEach(element => {
                element.classList.remove('visible');
            });
        }
    }

    window.addEventListener('scroll', checkScroll);

    changeNavBehaviour();

    // Adaugă funcționalitatea meniului burger
    const burgerMenu = document.querySelector('.burger-menu');
    const navbarList = document.querySelector('.navbar ul');
    
    if (burgerMenu && navbarList) {
        burgerMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            navbarList.classList.toggle('open');
        });
        
        // Închide meniul la click pe un link
        const navLinks = document.querySelectorAll('.navbar a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                burgerMenu.classList.remove('active');
                navbarList.classList.remove('open');
            });
        });
    }
    
    // Închide meniul la redimensionarea ferestrei
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            burgerMenu.classList.remove('active');
            navbarList.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
});
function changeNavBehaviour(){
    var prevScrollpos = window.scrollY;
    var videoElement = document.querySelector("video");
    var nav = document.querySelector("nav ul");
    var videoPosition = videoElement.offsetHeight; // Get the position of the video element

    window.onscroll = function() {
        var currentScrollPos = window.scrollY;

        if (currentScrollPos > videoPosition) {
            nav.style.background = "#070F2A";
        } else {
            nav.style.background = "transparent";
        }

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