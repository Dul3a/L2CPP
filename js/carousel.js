// pentru caruselul din landing page
document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.carousel-item');
    let currentItem = 0;

    function showItem(index) {
        items.forEach((item, idx) => {
            item.classList.remove('active');
            if (idx === index) {
                item.classList.add('active');
            }
        });
    }

    function nextItem() {
        currentItem = (currentItem + 1) % items.length; 
        showItem(currentItem);
    }

    setInterval(nextItem, 5000);
    showItem(currentItem);
});