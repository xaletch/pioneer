document.addEventListener('DOMContentLoaded', function() {
    const blogCard = Array.from(document.querySelectorAll('.blog .wrapper .blog_card'));
    const showMoreBtn = document.querySelector('#blog_show-more');
    let currentCard = 3;

    function hideCards() {
        blogCard.forEach((card, index) => {
            if (index >= 3) card.style.display = 'none';
        });
    }
  
    function showNextCards() {
        const nextCards = blogCard.slice(currentCard, currentCard + 3);
        nextCards.forEach(card => {
            card.style.display = 'grid';
        });
  
        currentCard += 3;
  
        if (currentCard >= blogCard.length) {
            showMoreBtn.style.display = 'none';
        }
    }
  
    hideCards();
  
    showMoreBtn.addEventListener('click', showNextCards);
});