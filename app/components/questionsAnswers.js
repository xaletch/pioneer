// АККОРДEОН
const accordionItem = document.querySelectorAll('.all-questions .wrapper .questions_card');

accordionItem.forEach((item) => {
    const question = item.querySelector('.card-head');

    question.addEventListener('click', () => {
        const content = item.querySelector('.content');
        if (item.classList.contains('open')) {
            content.style.height = `${content.scrollHeight}px`;
            
            window.requestAnimationFrame(() => {
                content.style.height = '0';
            });
        } else {
            content.style.height = '0';
            
            window.requestAnimationFrame(() => {
                content.style.height = `${content.scrollHeight}px`;
            });
        }
        item.classList.toggle('open');
    });
});

// ФУНКЦИЯ ДЛЯ ПОЛУЧЕНИЯ НУЖНЫХ ВОПРОСОВ И ОТВЕТОВ ОТ ВЫБРАННОГО РАЗДЕЛА
function initializeClickHandlers() {
    const items = document.querySelectorAll('.sections-questions .item');
    const questionBlocks = document.querySelectorAll('.select-questions_block');
  
    function setActiveBlock(index) {
        questionBlocks.forEach((block, blockIndex) => {
            if (blockIndex === index) {
                block.classList.add('active');
            } else {
                block.classList.remove('active');
            }
        });
    };
  
    function clearActiveItems() {
        items.forEach(item => {
            item.classList.remove('active');
        });
    };
  

    items.forEach((item, index) => {
        item.addEventListener('click', () => {
            clearActiveItems();
            item.classList.add('active');
            setActiveBlock(index);
        });
    });
};
  
document.addEventListener('DOMContentLoaded', initializeClickHandlers);


// В РАЗРАБОТКЕ
// function initializeOpenQuestions() {
//     const allQuestionsSection = document.querySelector('.all-questions');
//     const questionsBlocks = document.querySelectorAll('.questions-menu');
//     const comebackButton = document.querySelector('.questions-menu .come-back');
  
//     document.querySelectorAll('.all-questions .item').forEach((item, index) => {
//         item.addEventListener('click',() => {
//             questionsBlocks.forEach((elem) => {
//                 elem.classList.remove('active');
//             });
//             allQuestionsSection.style.display = 'none';
//             questionsBlocks[index].classList.add('active');
//         });
//     });
  
//     comebackButton.addEventListener('click', () => {
//         questionsBlocks.forEach((elem) => {
//             elem.classList.remove('active');
//         });
//         allQuestionsSection.style.display = '';
//     });
// }

// if (window.matchMedia("(max-width: 744px)").matches) {
//     document.addEventListener('DOMContentLoaded', initializeOpenQuestions);
// }
