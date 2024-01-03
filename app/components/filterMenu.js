document.addEventListener('DOMContentLoaded', () => {
    const filterButton = document.querySelector('.all-cervices .wrapper-top .sort-list .filter-item');
    const backButton = document.querySelector('.filter-menu .come-back');
    const filterMenu = document.querySelector('.filter-menu');
    const filterList = document.querySelector('.filter-menu .filter_list');
    const filterContentLists = document.querySelectorAll('.filter_content-list');
    const cardItems = document.querySelectorAll('.filter-menu .filter_list .card-item');
    const filterName = document.querySelector('.filter-menu .filter-name');

    filterButton.addEventListener('click', () => {
        filterMenu.classList.add('active');
    });

    function showContentList(contentIndex) {
        filterContentLists.forEach((list, index) => {
            if (contentIndex === index) {
                list.classList.add('active');
            } else {
                list.classList.remove('active');
            }
        });

        filterList.style.display = 'none';
    }

    cardItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            showContentList(index);

            filterName.textContent = item.textContent.trim();
        });
    });

    // Функция возвращения назад
    backButton.addEventListener('click', () => {
        if (filterList.style.display === 'none') {
            filterList.style.display = 'flex';
            filterContentLists.forEach(list => {
                list.classList.remove('active');
                filterName.textContent = 'Фильтры';
            });
        } else {
            filterMenu.classList.remove('active');;
        }
    });
});