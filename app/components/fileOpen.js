function openFileDialog() {
    const fileInput = document.getElementById('resume');
    fileInput.click();
}

document.addEventListener('DOMContentLoaded', () => {
    const inputWrapper = document.querySelector('.input-wrapper');
    inputWrapper.addEventListener('click', openFileDialog);
});