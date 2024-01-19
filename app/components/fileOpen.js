function openFileDialog() {
    const fileInput = document.getElementById('resume');
    fileInput.click();
}

function updateFileName() {
    const fileInput = document.getElementById('resume');
    const filePlaceholder = document.querySelector('.file-placeholder');
    
    if (fileInput.files.length > 0) {
        const fileName = fileInput.files[0].name;
        filePlaceholder.textContent = fileName;
        filePlaceholder.style.color = '#FFF';
    } else {
        filePlaceholder.textContent = 'Прикрепите файл';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const inputWrapper = document.querySelector('.input-wrapper');
    inputWrapper.addEventListener('click', openFileDialog);

    const fileInput = document.getElementById('resume');
    fileInput.addEventListener('change', updateFileName);
});