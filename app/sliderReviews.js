const sliderReview = document.querySelector('.reviews .wrapper');
const itemsReview = document.querySelectorAll('.reviews-card');
const dotsReview = document.querySelectorAll('.reviews_dots-item');

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
console.log(cardWidthReview)

sliderReview.addEventListener('mousedown', dragStart);
window.addEventListener('mousemove', drag);
window.addEventListener('mouseup', dragEnd);
window.addEventListener('mousemove', throttle(drag, 1));

sliderReview.addEventListener('touchstart', dragStart);
window.addEventListener('touchmove', drag);
window.addEventListener('touchend', dragEnd);

function dragStart(event) {
    if (event.type === 'touchstart') {
        startPosReview = event.touches[0].clientX;
    } else {
        startPosReview = event.clientX;
        sliderReview.style.cursor = 'grabbing';
    }
    isDraggingReview = true;
};

function drag(event) {
    if (isDraggingReview) {
        requestAnimationFrame(() => {
            let currentPosition = event.type === 'touchmove'
                ? event.touches[0].clientX - startPosReview
                : event.clientX - startPosReview;
            
            let translateX = prevTranslateReview + currentPosition;

            if(activeReview === 0 && currentPosition > 0){
              translateX = 0;
            }

            if(activeReview === lengthItemsReview && currentPosition < 0){
              translateX = -((cardWidthReview + spacingReview) * lengthItemsReview);
            }

            currentTranslateReview = translateX;

            sliderReview.style.transform = `translateX(${translateX}px)`;
        });
    }
};

function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

function reloadSliderReview() {
    const position = -(cardWidthReview + spacingReview) * activeReview;
    sliderReview.style.transform = `translateX(${position}px)`;

    sliderReview.addEventListener('transitionend', updateDotAfterTransition);

    function updateDotAfterTransition() {
        sliderReview.removeEventListener('transitionend', updateDotAfterTransition);
        
        const lastActiveDot = document.querySelector('.reviews_dots-active');
        if (lastActiveDot) {
            lastActiveDot.classList.remove('reviews_dots-active');
        }
        dotsReview[activeReview].classList.add('reviews_dots-active');
    }
};

function dragEnd() {
    isDraggingReview = false;
    
    const movedBy = currentTranslateReview - prevTranslateReview;
    
    if (movedBy < -100 && activeReview < lengthItemsReview) {
        activeReview++;
    }
    else if (movedBy > 100 && activeReview > 0) {
        activeReview--;
    }
    
    if (activeReview === lengthItemsReview && movedBy < -100) {
        activeReview = 0;
    }
    
    prevTranslateReview = currentTranslateReview = -(cardWidthReview + spacingReview) * activeReview;

    sliderReview.style.cursor = 'grab';
    
    reloadSliderReview();
};

dotsReview.forEach((li, key) => {
    li.addEventListener('click', () => {
        activeReview = key;
        reloadSliderReview();
    });
});

function debounce(func, wait = 10, immediate = true) {
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

window.addEventListener('resize', debounce(reloadSliderReview));
