let sliderReview = document.querySelector('.reviews .wrapper');
let itemsReview = document.querySelectorAll('.reviews-card');
let dotsReview = document.querySelectorAll('.reviews_dots-item');

let cardWidthReview = 422;
let spacingReview = 30;
let lengthItemsReview = itemsReview.length - 1;
let activeReview = 1;

let isDraggingReview = false;
let startPosReview = 2;
let currentTranslateReview = 0;
let prevTranslateReview = 0;

if (screen.width <= 760) {
    cardWidthReview = 350;
}

if (screen.width <= 480) {
    cardWidthReview = 340;
}

sliderReview.addEventListener('touchmove', drag, { passive: true });
sliderReview.addEventListener('mouseleave', dragEnd);

if (screen.width <= 1024) {
    sliderReview.addEventListener('mousedown', dragStart);
    sliderReview.addEventListener('touchstart', dragStart);
    sliderReview.addEventListener('mouseleave', dragEnd);
    sliderReview.addEventListener('touchend', dragEnd);
    sliderReview.addEventListener('touchmove', drag, { passive: true });
}

function dragStart(event) {
    if (event.type === 'touchstart') {
        startPosReview = event.touches[0].clientX;
    } else {
        startPosReview = event.clientX;
        sliderReview.style.cursor = 'grabbing';
    }
    isDraggingReview = true;
}

function drag(event) {
    if (isDraggingReview) {
        let currentPosition = 0;
        if (event.type === 'touchmove') {
            currentPosition = event.touches[0].clientX - startPosReview;
        } else {
            currentPosition = event.clientX - startPosReview;
        }
        currentTranslateReview = prevTranslateReview + currentPosition;
        sliderReview.style.transform = `translateX(${currentTranslateReview}px)`;
    }
}

function reloadSliderReview() {
    let position = -(cardWidthReview + spacingReview) * activeReview;
    sliderReview.style.left = position + 'px';
    sliderReview.style.transform = 'none'

    let lastActiveDot = document.querySelector('.reviews_dots-active');
    lastActiveDot.classList.remove('reviews_dots-active');
    dotsReview[activeReview].classList.add('reviews_dots-active');
}

function dragEnd() {
    isDraggingReview = false;
    let movedBy = currentTranslateReview - prevTranslateReview;
    if (movedBy < -100 && activeReview < lengthItemsReview) {
        activeReview++;
    } else if (movedBy > 100 && activeReview > 0) {
        activeReview--;
    }

    if (screen.width >= 1400 && currentTranslateReview < -905) {
        activeReview = 0;
    }

    if (cardWidthReview === 350 && currentTranslateReview < -1520) {
        activeReview = 0;
    }

    currentTranslateReview = -(cardWidthReview + spacingReview) * activeReview;
    prevTranslateReview = currentTranslateReview;

    sliderReview.style.cursor = 'grab';

    reloadSliderReview();
}

dotsReview.forEach((li, key) => {
    li.addEventListener('click', () => {
        activeReview = key;
        reloadSliderReview();
    });
});

window.addEventListener('resize', reloadSliderReview);
