document.addEventListener('DOMContentLoaded', function() {
    const blogCard = Array.from(document.querySelectorAll('.reviews-page .wrapper .card'));
    const showMoreBtn = document.querySelector('#reviews_show-more');
    const reviewsCountElem = document.querySelector('.reviews-count');
    const reviewsDots = document.querySelector('.reviews_dots');

    let currentCard = 5;

    function updateButtonCount() {
        const hiddenCardsCount = blogCard.length - currentCard;
        reviewsCountElem.textContent = hiddenCardsCount > 0 ? hiddenCardsCount : '0';
        
        if (hiddenCardsCount <= 0) {
            showMoreBtn.style.display = 'none';
            reviewsDots.style.bottom = '0';
        } else {
            showMoreBtn.style.display = 'block';
        }
    }

    function hideCards() {
        blogCard.forEach((card, index) => {
            if (index >= 5) card.style.display = 'none';
        });
        updateButtonCount();
    }
  
    function showNextCards() {
        const nextCards = blogCard.slice(currentCard, currentCard + 5);
        nextCards.forEach(card => {
            card.style.display = 'flex';
        });
        currentCard += 5;
        updateButtonCount();
    }
  
    hideCards();
    showMoreBtn.addEventListener('click', showNextCards);
});
