const accordionItem = document.querySelectorAll('.vacancies .wrapper .block');

accordionItem.forEach((item) => {
    let question = item.querySelector('.vacancies .wrapper .block .head-block');

    question.addEventListener('click', () => {
        item.classList.toggle('active');

        let content = item.querySelector('.vacancies .wrapper .block .content');

        if (item.classList.contains('active')) {
            content.classList.remove('hidden');
        } else {
            content.classList.add('hidden');
        }
    });
});