document.addEventListener('DOMContentLoaded', () => {
    const optionSelectWrapper = document.querySelector('.send-resume .option .input-wrapper');
    const optionSelect = document.querySelector('.send-resume .option .option-select');
    const optionItems = document.querySelectorAll('.send-resume .option .item');

    optionSelectWrapper.addEventListener('click', () => {
        const popup = document.querySelector('.send-resume .option-content');
        popup.classList.toggle('active');
    });

    optionItems.forEach((item) => {
        item.addEventListener('click', (event) => {
            optionSelect.textContent = event.target.textContent;

            const popup = item.closest('.option-content');
            if (popup) {
                popup.classList.remove('active');
            }
        });
    });
});