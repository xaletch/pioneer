const filterCard = document.querySelectorAll('.all-articles .wrapper .blog_card');
const categoryItem = document.querySelectorAll('.all-articles .category_list .item');
const showMoreButton = document.querySelector('.button_look-more');

let currentCard = 6;
let filterClass = 'all';

function updateCardsVisibility() {
    let visibleCardCount = 0;

    filterCard.forEach((card) => {
        if (filterClass === 'all' || card.classList.contains(filterClass)) {
            visibleCardCount++;
            if (visibleCardCount <= currentCard) {
                card.style.display = 'grid';
            } else {
                card.style.display = 'none';
            }
        } else {
            card.style.display = 'none';
        }
    });

    if (visibleCardCount > currentCard) {
        showMoreButton.style.display = 'block';
    } else {
        showMoreButton.style.display = 'none';
    }
}

categoryItem.forEach((item) => {
    item.addEventListener('click', (e) => {
        categoryItem.forEach((el) => el.classList.remove('active'));
        e.currentTarget.classList.add('active');

        filterClass = e.currentTarget.dataset['blog'];

        if(filterClass === 'all') {
            currentCard = 6;
        } else {
            const selectedCards = Array.from(filterCard).filter(card => card.classList.contains(filterClass));
            currentCard = Math.min(selectedCards.length, 6);
        }

        updateCardsVisibility();
    })
});

function showNextCards() {
    currentCard += 6;
    updateCardsVisibility();
}

document.addEventListener('DOMContentLoaded', function() {
    updateCardsVisibility();
    showMoreButton.addEventListener('click', showNextCards);
});

