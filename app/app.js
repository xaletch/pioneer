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