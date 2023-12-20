// МАСКА ДЛЯ НОМЕРА
let phoneInput = document.getElementById('phone-input');

phoneInput.addEventListener('input', function(e) {
  let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
  e.target.value = !x[2] ? x[1] === '+' ? x[1] : '+7 (' : x[1] + ' (' + x[2] + (x[3] ? ') ' + x[3] : '') + (x[4] ? ' ' + x[4] : '') + (x[5] ? ' ' + x[5] : '');
});

// POPUP МЕНЮ ДЛЯ ХЕДЕРА
document.addEventListener('DOMContentLoaded', () => {
    const listItems = document.querySelectorAll('.list-item');
    const listContentItems = document.querySelectorAll('.content');
    
    listItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            listContentItems[index].classList.add('active');
        });
        
        item.addEventListener('mouseleave', () => {
            listContentItems[index].classList.remove('active');
        });

        listContentItems[index].addEventListener('mouseenter', () => {
            listContentItems[index].classList.add('active');
        });
    
        listContentItems[index].addEventListener('mouseleave', () => {
            listContentItems[index].classList.remove('active');
        });
    });
});

// POPUP МЕНЮ ДЛЯ ЗАКАЗА ЗВОНКА
const requestBtn = document.querySelector('.button-call');
const requestForm = document.querySelector('.form_popup');
const requestFormMenu = document.querySelector('.form_popup-block').addEventListener('click', (e) => e.stopPropagation());
const closeForm = document.querySelector('.close-popup');

requestBtn.addEventListener('click', () => {
    requestForm.classList.add('active');
});

requestForm.addEventListener('click', () => {
    requestForm.classList.remove('active');
});
closeForm.addEventListener('click', () => {
    requestForm.classList.remove('active');
});

// МОБИЛЬНО МЕНЮ
const buttonMenu = document.querySelector('.header_button-menu');
const menu = document.querySelector('.header_menu');
const closeMenu = document.querySelector('.header_close-menu');

buttonMenu.addEventListener('click', () => {
    menu.classList.add('active');
})

closeMenu.addEventListener('click', () => {
    menu.classList.remove('active');
})

// СЛАЙДЕР
let slider = document.querySelector('.basic-services .wrapper');
let items = document.querySelectorAll('.basic-services-card');
let dots = document.querySelectorAll('.dots-item');

let cardWidth = 240;
let spacing = 16;
let lengthItems = items.length - 1;
let active = 0;

let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;

slider.addEventListener('mousedown', dragStart);
slider.addEventListener('touchstart', dragStart);
slider.addEventListener('mouseup', dragEnd);
slider.addEventListener('touchend', dragEnd);
slider.addEventListener('mouseleave', dragEnd);
slider.addEventListener('mousemove', drag);
slider.addEventListener('touchmove', drag);

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
    if (isDragging) {
        let currentPosition = 0;
        if (event.type === 'touchmove') {
            currentPosition = event.touches[0].clientX - startPos;
        } else {
            currentPosition = event.clientX - startPos;
        }
        currentTranslate = prevTranslate + currentPosition;
    }
}

function reloadSlider(){
    let position = -(cardWidth + spacing) * active;
    slider.style.left = position + 'px';

    let lastActiveDot = document.querySelector('.dots-item_active');
    lastActiveDot.classList.remove('dots-item_active');
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

dots.forEach((li, key) => {
    li.addEventListener('click', ()=>{
        active = key;
        reloadSlider();
    })
})

window.onresize = function() {
    reloadSlider();
};

// АККОРДЕОН
const accordionItem = document.querySelectorAll('.questions .questions_accordion .card');

accordionItem.forEach((item) => {
    let question = item.querySelector('.questions_accordion .card .name');

    question.addEventListener('click', () => {
        item.classList.toggle('active');

        let description = item.querySelector('.questions_accordion .card .description');

        if (item.classList.contains('active')) {
            description.style.height = `${description.scrollHeight}px`;
            description.style.paddingTop = '16px';
        } else {
            description.style.height = '0';
            description.style.paddingTop = '0';
        }
    });
})