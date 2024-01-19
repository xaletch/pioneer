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
    const list = document.querySelector('.all-questions .sections-questions');
    const items = document.querySelectorAll('.all-questions .sections-questions .item');
    const questionsMain = document.querySelector('.all-questions .questions_block');
    const questionBlocks = document.querySelectorAll('.all-questions .select-questions_block');
    const questionName = document.querySelector('.all-questions .questions_block-name');
    const backButton = document.querySelector('.all-questions .come-back');

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

    backButton.addEventListener('click', () => {
        if (list.style.display === 'none') {
            list.style.display = 'block';
            questionsMain.classList.add('hidden');
        }
    });

    if (window.matchMedia("(max-width: 744px)").matches) {
        questionsMain.classList.add('hidden');
        
        items.forEach((item, index) => {
            item.addEventListener('click', function() {
                const text = item.textContent.trim();
                clearActiveItems();
                
                setActiveBlock(index);
                
                list.style.display = 'none';
                questionsMain.classList.remove('hidden');
                item.classList.add('active');
                questionName.textContent = text;
            });
        });
    } else {
        items.forEach((item, index) => {
            questionsMain.classList.remove('hidden');
            
            item.addEventListener('click', function() {
                clearActiveItems();
                item.classList.add('active');
                setActiveBlock(index);
            });
        });
    }
};

document.addEventListener('DOMContentLoaded', initializeClickHandlers);

window.addEventListener('resize', initializeClickHandlers);