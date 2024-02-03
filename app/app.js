// МАСКА ДЛЯ НОМЕРА
const phoneInputs = document.querySelectorAll('.phone-input');

const applyMask = (e) => {
    let value = e.target.value.replace(/[^\d+]/g, '');

    if (!value.startsWith('+')) {
        value = '+7' + value.replace(/\+/g, '');
    } else {
        value = '+' + value.substring(1).replace(/\+/g, '');
    }
    
    let x = value.match(/(\+)(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
    e.target.value = x[1] + '7 (' + x[3] + (x[4] ? ') ' + x[4] : '') + (x[5] ? '-' + x[5] : '') + (x[6] ? '-' + x[6] : '');
};

phoneInputs.forEach(input => {
    input.addEventListener('input', applyMask);
});

phoneInputs.forEach((input) => {
    input.addEventListener('input', applyMask);
});
function validateForm() {
    let allInputsValid = true;
    
    phoneInputs.forEach((input) => {
        let phone = input.value.replace(/[^\d]/g, '');

        if (phone === '') { return false; }

        if (phone.length !== 11) {
            allInputsValid = false; 
            input.classList.add('input-error');

            setTimeout(() => input.classList.remove('input-error'), 2500);
        } else {
            input.classList.remove('input-error');
        }
    });
    
   return allInputsValid;
}

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
function closeSubmenusFrom(element) {
    let submenu = element.querySelector('.services-list_inner.active');
    if (submenu) {
        submenu.classList.remove('active');
        submenu.style.display = 'none';
    }
    
    let link = element.querySelector('.item-link.active');
    if (link) {
        link.classList.remove('active');
    }
}

function closeAllSubmenus(element) {
    let currentLevel = element.closest('.services-list_main');
    if (currentLevel && currentLevel.classList.contains('services-list_main')) {
        Array.from(currentLevel.querySelectorAll('.services-item')).forEach(child => {
            if (!element.contains(child) && !child.contains(element)) {
                closeSubmenusFrom(child);
            }
        });
    }
}

document.querySelectorAll('.services-list_main .services-item').forEach(function(menuItem) {
    menuItem.addEventListener('mouseover', function() {
        closeAllSubmenus(this);

        this.querySelector('.item-link').classList.add('active');

        const innerList = this.querySelector('.services-list_inner');
        if (innerList) {
            innerList.classList.add('active');
            innerList.style.display = 'block';
        }
    });
});


// POPUP МЕНЮ ДЛЯ ЗАКАЗА ЗВОНКА
const requestBtn = document.querySelectorAll('.button-call, .button-call2');
const requestForm = document.querySelector('.form_popup');
const requestFormMenu = document.querySelector('.form_popup-block').addEventListener('click', (e) => e.stopPropagation());
const closeForm = document.querySelector('.close-popup');

requestBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    requestForm.classList.add('active');
  });
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

// ОТКРЫТИЕ И ЗАКРЫТИЕ МЕНЮ
buttonMenu.addEventListener('click', () => {
    menu.classList.add('active');
});
closeMenu.addEventListener('click', () => {
    menu.classList.remove('active');
});

const menuList = document.querySelector('.header_menu-list');
const selectList =  document.querySelectorAll('.header_select-menu-list');
const selectItem = document.querySelectorAll('.header_menu-list .item');
const searchInput = document.querySelector('.header_menu-search');
const inner = document.querySelector('.header_menu-inner');

function showContentList(contentIndex) {
    selectList.forEach((list, index) => {
        if (contentIndex === index) {
            list.classList.remove('hidden');
            menuList.classList.add('hidden');
            searchInput.classList.add('hidden');
            inner.style.justifyContent = 'space-between';
            inner.style.height = '100vh';

            const btnBack = list.querySelector('.select-item_name');

            if (btnBack) {
                btnBack.addEventListener('click', () => {
                    list.classList.add('hidden');
                    menuList.classList.remove('hidden');
                    searchInput.classList.remove('hidden');
                });
            }
        } else {
            list.classList.add('hidden');
        }
    });
};

selectItem.forEach((item, index) => {
    item.addEventListener('click', () => {
        showContentList(index);
    });
});

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
        const contentCategoryHead = document.querySelector('.content-category_head .name');
        contentCategoryHead.textContent = categoryName;
    });
});

// LAZY LOADING

window.onload = () => {
    const observer = new IntersectionObserver((entities, observer) => {
        entities.forEach(entity => {
            if (entity.isIntersecting) {
                entity.target.src = entity.target.dataset.src;

                observer.unobserve(entity.target);
            }
        });
    }, {});

    const image = document.querySelectorAll('.img');
    image.forEach(img => observer.observe(img));
};