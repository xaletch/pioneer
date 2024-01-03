document.addEventListener('DOMContentLoaded', () => {
    const sortPopup = document.querySelector('.all-articles .sort-popup');
    if (!sortPopup) return;

    const sortPopupActive = sortPopup.querySelector('.all-articles .sort-popup_active');
    const sortPopupList = sortPopup.querySelector('.all-articles .sort-popup_list');

    sortPopupActive.addEventListener('click', () => {
        sortPopupList.classList.toggle('show');
        sortPopupActive.classList.toggle('open');
    });

    document.addEventListener('click', (event) => {
        const isClickInsideSortPopup = sortPopup.contains(event.target);

        if (!isClickInsideSortPopup && sortPopupList.classList.contains('show')) {
            sortPopupList.classList.remove('show');
        }
    });

    sortPopupList.addEventListener('click', (e) => {
        const clickedItem = e.target.closest('.item');

        if (clickedItem) {
            sortPopupActive.querySelector('.item').textContent = clickedItem.textContent;
            if (sortPopupList.querySelector('.item.active')) {
                sortPopupList.querySelector('.item.active').classList.remove('active');
            }
            clickedItem.classList.add('active');
            sortPopupList.classList.remove('show');
            sortPopupActive.classList.remove('open');
        }
    });
});