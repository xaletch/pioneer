document.addEventListener('DOMContentLoaded', () => {
    function scrollToElement(elementId, offset) {
        const element = document.getElementById(elementId);
        
        if (element) {
            const elementRect = element.getBoundingClientRect();
            const absoluteElementTop = elementRect.top + window.pageYOffset;
            const middle = absoluteElementTop - offset;
            window.scrollTo({
                top: middle,
                behavior: 'smooth'
            });
        }
    };

    const listItems = document.querySelectorAll('.consultations .content-list .item');
    let activeItem = null;
    
    listItems.forEach((item) => {
        item.addEventListener('click', () => {
            if (activeItem) {
            activeItem.classList.remove('active');
            }
    
            item.classList.add('active');
            activeItem = item;
    
            const targetId = item.getAttribute('id');
            scrollToElement(targetId, 100);
        });
    });
});