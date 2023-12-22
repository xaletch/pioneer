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

// ЛЕСЕНКА Сертификация Продукции
const servicesLists = document.querySelectorAll('.services-list');

servicesLists.forEach((list, index) => {
  const items = list.querySelectorAll('.services-item');
  
    items.forEach((item) => {
        item.addEventListener('mouseover', () => {
            const previousActive = list.querySelector('.active');
            if (previousActive) {
                previousActive.classList.remove('active');
            }
      
            item.classList.add('active');
      
            if (index < servicesLists.length - 1) {
                servicesLists[index + 1].classList.add('open');
            }
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

// POPUP МЕНЮ ДЛЯ ПОИСКА
const searchBtn = document.querySelector('.header_contact .search');
const searchMenu = document.querySelector('.search_menu');
const searchMenuBlock = document.querySelector('.search_menu-block').addEventListener('click', (e) => e.stopPropagation());
const closeSearchMenu = document.querySelector('.close-menu');

searchBtn .addEventListener('click', () => {
    searchMenu.classList.add('active');
});

searchMenu.addEventListener('click', () => {
    searchMenu.classList.remove('active');
});
closeSearchMenu.addEventListener('click', () => {
    searchMenu.classList.remove('active');
});

// ЗАКРЕП ХЕДЕРА ПРИ СКРОЛЛЕ 
let lastScrollPosition = 0;

window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const headerTop = document.querySelector('.header_top');
    const headerBottom = document.querySelector('.header_bottom');
    const scrollPosition = window.scrollY;
  
    if (scrollPosition > lastScrollPosition) {
        headerTop.classList.add('hidden');
        headerBottom.classList.add('hidden');
    } else {
        headerTop.classList.remove('hidden');
        headerBottom.classList.remove('hidden');
    }

    lastScrollPosition = scrollPosition;

    scrollPosition > 0 ? header.classList.add('sticky') : header.classList.remove('sticky');
});

// МОБИЛЬНОE МЕНЮ
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


// Услуги по отраслям
const servicesItem = document.querySelectorAll('.category-menu_list .item');
const servicesContent = document.querySelectorAll('.content-category_wrapper');

servicesItem.forEach((item, index) => {
    item.addEventListener('mouseenter', () => {

        servicesItem.forEach((item) => {
            item.classList.remove('select');
        });

        servicesContent.forEach((content) => {
            content.classList.remove('active');
        });

        servicesItem[index].classList.add('select');
        servicesContent[index].classList.add('active');

        const categoryName = servicesItem[index].textContent;
        const contentCategoryHead = document.querySelector('.content-category_head h4');
        contentCategoryHead.textContent = categoryName;
    });
});

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
});
