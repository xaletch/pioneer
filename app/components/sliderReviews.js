const sliderReview = document.querySelector('.reviews .wrapper');
const itemsReview = document.querySelectorAll('.reviews-card');
const dotsReview = document.querySelectorAll('.reviews_dots-item');

let cardWidthReview = 422;
let spacingReview = 30;
let cloneFirst = itemsReview[0].cloneNode(true);
let cloneLast = itemsReview[itemsReview.length - 1].cloneNode(true);
let lengthItemsReview = itemsReview.length;
let activeReview = 2;
let isDraggingReview = false;
let startPosReview = 0;
let currentTranslateReview = 0;
let prevTranslateReview = 0;
let animationFrameId;

sliderReview.insertBefore(cloneLast, sliderReview.firstChild);
sliderReview.appendChild(cloneFirst);

function updateCardWidthReview() {
    if (screen.width <= 760) {
        cardWidthReview = 350;
    } else if (screen.width <= 480) {
        cardWidthReview = 340;
    }
};

updateCardWidthReview();

window.addEventListener('resize', debounce(() => {
    updateCardWidthReview();
    reloadSliderReview();
}, 250));

reloadSliderReview(false);

sliderReview.addEventListener('mousedown', dragStart);
window.addEventListener('mouseup', dragEnd);
sliderReview.addEventListener('touchstart', dragStart);
window.addEventListener('touchend', dragEnd);

window.addEventListener('mousemove', throttle(drag, 1));
window.addEventListener('touchmove', throttle(drag, 1));


function reloadSliderReview(withTransition = true) {
    if (withTransition) {
        sliderReview.style.transition = 'transform 0.4s ease-out';
    } else {
        sliderReview.style.transition = 'none';
    }

    const position = -(cardWidthReview + spacingReview) * activeReview;
    sliderReview.style.transform = `translateX(${position}px)`;

    if (activeReview === 0) {
        setTimeout(() => {
            sliderReview.style.transition = 'none';
            activeReview = lengthItemsReview;
            const position = -(cardWidthReview + spacingReview) * activeReview;
            sliderReview.style.transform = `translateX(${position}px)`;
        }, 600);
    }

    if (activeReview === lengthItemsReview + 1) {
        setTimeout(() => {
            sliderReview.style.transition = 'none';
            activeReview = 1;
            const position = -(cardWidthReview + spacingReview) * activeReview;
            sliderReview.style.transform = `translateX(${position}px)`;
        }, 600);
    }

    updateDots();
}


function updateDots() {
    const lastActiveDot = document.querySelector('.reviews_dots-active');
    if (lastActiveDot) {
        lastActiveDot.classList.remove('reviews_dots-active');
    }
    const trueActiveIndex = activeReview % lengthItemsReview === 0 ? 0 : activeReview % lengthItemsReview -1;              
    dotsReview[trueActiveIndex].classList.add('reviews_dots-active');
}

function debounce(func, delay) {
    let inDebounce;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(inDebounce);
        inDebounce = setTimeout(() => func.apply(context, args), delay);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function setSliderPosition() {
    sliderReview.style.transform = `translateX(${currentTranslateReview}px)`;
}

function dragStart(event) {
    isDraggingReview = true;
    startPosReview = getPositionX(event);
    animationFrameId = requestAnimationFrame(animation);
    sliderReview.classList.add('grabbing');
}

function drag(event) {
    if (isDraggingReview) {
        const currentPosition = getPositionX(event);
        currentTranslateReview = prevTranslateReview + currentPosition - startPosReview;
        setSliderPosition();
    }
}

function dragEnd() {
    cancelAnimationFrame(animationFrameId);
    isDraggingReview = false;
    const movedBy = currentTranslateReview - prevTranslateReview;
    if (movedBy < -100 && activeReview < itemsReview.length) {
        activeReview += 1;
    }
    if (movedBy > 100 && activeReview > 0) {
        activeReview -= 1;
    }
    setPositionByIndex();
    sliderReview.classList.remove('grabbing');
}

function setPositionByIndex() {
    currentTranslateReview = -(cardWidthReview + spacingReview) * activeReview;
    prevTranslateReview = currentTranslateReview;
    setSliderPosition();
    reloadSliderReview();
}

function animation() {
    setSliderPosition();
    if (isDraggingReview) requestAnimationFrame(animation);
}

function scrollToReview(index) {
    activeReview = index + 1;
    setPositionByIndex();
}

dotsReview.forEach((dot, index) => {
    dot.addEventListener('click', () => scrollToReview(index));
});

reloadSliderReview();