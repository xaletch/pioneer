const sliderDocuments = document.querySelector('.documents .wrapper');
const itemsDocuments = document.querySelectorAll('.documents .wrapper .card');
const dotsDocuments = document.querySelectorAll('.dots-item');

let cardWidthDocuments = 280;
let spacingDocuments = 16;
let lengthItemsDocuments = itemsDocuments.length - 1;
let activeDocuments = 0;

let isDraggingDocuments = false;
let startPosDocuments = 0;
let currentTranslateDocuments = 0;
let prevTranslateDocuments = 0;
let animationIDDocuments= 0;

if (screen.width <= 760) {
    sliderDocuments.addEventListener('mousedown', dragStart);
    sliderDocuments.addEventListener('touchstart', dragStart);
    sliderDocuments.addEventListener('mouseup', dragEnd);
    sliderDocuments.addEventListener('touchend', dragEnd);
    sliderDocuments.addEventListener('mouseleave', dragEnd);
    sliderDocuments.addEventListener('mousemove', drag);
    sliderDocuments.addEventListener('touchmove', drag);
}

function dragStart(event) {
    if (event.type === 'touchstart') {
        startPosDocuments = event.touches[0].clientX;
    } else {
        startPosDocuments = event.clientX;
        sliderDocuments.style.cursor = 'grabbing';
    }
    isDraggingDocuments = true;
    animationIDDocuments = requestAnimationFrame(animation);
}

function drag(event) {
    if (!isDraggingDocuments) return;

    let currentPosition = event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
    let currentPosition2 = currentPosition - startPosDocuments;
    currentTranslateDocuments = prevTranslateDocuments + currentPosition2;

    if (!animationIDDocuments) {
        animationIDDocuments = requestAnimationFrame(animation);
    }
}

function reloadSliderDocuments() {
    let position = -(cardWidthDocuments + spacingDocuments) * activeDocuments;
    sliderDocuments.style.transform = `translateX(${position}px)`;

    let lastActiveDot = document.querySelector('.dots-item_active');
    if (lastActiveDot) {
        lastActiveDot.classList.remove('dots-item_active');
    }
    dotsDocuments[activeDocuments].classList.add('dots-item_active');
}


function dragEnd() {
    cancelAnimationFrame(animationIDDocuments);
    isDraggingDocuments = false;
    let movedBy = currentTranslateDocuments - prevTranslateDocuments;
    if (movedBy < -100 && activeDocuments < lengthItemsDocuments) {
        activeDocuments++;
    } else if (movedBy > 100 && activeDocuments > 0) {
        activeDocuments--;
    }

    if (currentTranslateDocuments < -2290) {
        activeDocuments = 0;
    }

    currentTranslateDocuments = -(cardWidthDocuments + spacingDocuments) * activeDocuments;
    prevTranslateDocuments = currentTranslateDocuments;

    sliderDocuments.style.cursor = 'grab';

    reloadSliderDocuments();
}

function animation() {
    sliderDocuments.style.transform = `translateX(${currentTranslateDocuments}px)`;
    if (isDraggingDocuments) {
        requestAnimationFrame(animation);
    }
}

window.onresize = debounce(function() {
    reloadSliderDocuments();
}, 250);

dotsDocuments.forEach((li, key) => {
    li.addEventListener('click', ()=>{
        activeDocuments = key;
        reloadSliderDocuments();
    })
})

window.onresize = function() {
    reloadSliderDocuments();
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