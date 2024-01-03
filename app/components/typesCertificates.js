document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.btn_all-certificate');
    const cards = Array.from(document.querySelectorAll('.types-certificates .card.hidden'));

    let isShow = true;

    button.addEventListener('click', () => {
        if (isShow) {
            cards.slice(0, 9).forEach(card => card.classList.remove('hidden'));
            
            button.textContent = 'Скрыть';
            button.classList.add('active');

            isShow = false;
        } else {
            cards.slice(0, 9).forEach(card => card.classList.add('hidden'));
            
            button.textContent = 'Показать все сертификаты';
            button.classList.remove('active');

            isShow = true;
        }
    });
});