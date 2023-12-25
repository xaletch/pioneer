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