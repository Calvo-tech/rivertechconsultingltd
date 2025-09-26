const hero = document.querySelector('.hero');
        const images = ["house1.jpg", "house2.jpg", "debt.jpg"]; // picha zako
        let current = 0;
    
        function changeBackground() {
            hero.style.background = `url(${images[current]}) center/cover no-repeat`;
            current = (current + 1) % images.length;
        }
    
        // start slideshow
        changeBackground();
        setInterval(changeBackground, 5000);// change every 5 sec
        const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
    counter.innerText = '0';
    
    const updateCounter = () => {
        const target = +counter.getAttribute('data-target');
        const current = +counter.innerText;
        const increment = target / 200;

        if(current < target){
            counter.innerText = `${Math.ceil(current + increment)}`;
            setTimeout(updateCounter, 15);
        } else {
            counter.innerText = target + (target >= 50 ? '+' : '');
        }
    }


    updateCounter();
});
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    let countersStarted = false;

    function runCounters() {
        counters.forEach(counter => {
            counter.innerText = '0';
            const target = +counter.getAttribute('data-target');
            const increment = Math.ceil(target / 200);

            const updateCounter = () => {
                const current = +counter.innerText.replace('+','');
                if(current < target){
                    counter.innerText = current + increment;
                    setTimeout(updateCounter, 15);
                } else {
                    counter.innerText = target + (target >= 50 ? '+' : '');
                }
            }

            updateCounter();
        });
    }

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    window.addEventListener('scroll', () => {
        const statsSection = document.getElementById('stats');
        if(isInViewport(statsSection)) {
            runCounters();
        }
    });
});
let currentSlide = 0;
let slides = [];

function openLightbox(index, imgElement) {
    const card = imgElement.closest('.apartment-card');
    slides = Array.from(card.querySelectorAll('.apartment-images img'));
    currentSlide = index;

    document.getElementById('lightbox').style.display = "block";
    document.querySelector('.lightbox-img').src = slides[currentSlide].src;
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = "none";
}

function changeSlide(n) {
    currentSlide += n;
    if(currentSlide < 0) currentSlide = slides.length - 1;
    if(currentSlide >= slides.length) currentSlide = 0;
    document.querySelector('.lightbox-img').src = slides[currentSlide].src;
}
