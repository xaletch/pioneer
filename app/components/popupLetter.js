const letterPopup = document.querySelector('.read-letter');
const letterOpen = document.querySelectorAll('.reviews .reviews-card .button');
const letter = document.querySelector('.letter_block img').addEventListener('click', (e) => e.stopPropagation());
const closeBtn = document.querySelector('.read-letter .letter_close');

letterOpen.forEach((item) => {
    item.addEventListener('click', () => {
        letterPopup.classList.add('active');
    });
});

letterPopup.addEventListener('click', () => {
    letterPopup.classList.remove('active');
});
closeBtn.addEventListener('click', () => {
    letterPopup.classList.remove('active');
});