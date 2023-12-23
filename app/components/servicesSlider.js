// СЛАЙДЕР
const slider = document.querySelector('.basic-services .wrapper');
const items = document.querySelectorAll('.basic-services-card');
const dots = document.querySelectorAll('.dots-item');

let cardWidth = 240;
let spacing = 16;
let lengthItems = items.length - 1;
let active = 0;

let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;

if (screen.width <= 760) {
    slider.addEventListener('mousedown', dragStart);
    slider.addEventListener('touchstart', dragStart);
    slider.addEventListener('mouseup', dragEnd);
    slider.addEventListener('touchend', dragEnd);
    slider.addEventListener('mouseleave', dragEnd);
    slider.addEventListener('mousemove', drag);
    slider.addEventListener('touchmove', drag);
}

function dragStart(event) {
    if (event.type === 'touchstart') {
        startPos = event.touches[0].clientX;
    } else {
        startPos = event.clientX;
        slider.style.cursor = 'grabbing';
    }
    isDragging = true;
    animationID = requestAnimationFrame(animation);
}

function drag(event) {
    if (!isDragging) return;

    let currentPosition = event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
    let currentPosition2 = currentPosition - startPos;
    currentTranslate = prevTranslate + currentPosition2;

    if (!animationID) {
        animationID = requestAnimationFrame(animation);
    }
}

function reloadSlider() {
    let position = -(cardWidth + spacing) * active;
    slider.style.transform = `translateX(${position}px)`;

    let lastActiveDot = document.querySelector('.dots-item_active');
    if (lastActiveDot) {
        lastActiveDot.classList.remove('dots-item_active');
    }
    dots[active].classList.add('dots-item_active');
}


function dragEnd() {
    cancelAnimationFrame(animationID);
    isDragging = false;
    let movedBy = currentTranslate - prevTranslate;
    if (movedBy < -100 && active < lengthItems) {
        active++;
    } else if (movedBy > 100 && active > 0) {
        active--;
    }

    if (currentTranslate < -2290) {
        active = 0;
    }

    currentTranslate = -(cardWidth + spacing) * active;
    prevTranslate = currentTranslate;

    slider.style.cursor = 'grab';

    reloadSlider();
}

function animation() {
    slider.style.transform = `translateX(${currentTranslate}px)`;
    if (isDragging) {
        requestAnimationFrame(animation);
    }
}

window.onresize = debounce(function() {
    reloadSlider();
}, 250);

dots.forEach((li, key) => {
    li.addEventListener('click', ()=>{
        active = key;
        reloadSlider();
    })
})

window.onresize = function() {
    reloadSlider();
};

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};