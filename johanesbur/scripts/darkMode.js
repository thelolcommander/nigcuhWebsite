document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById('toggle-button');
    const body = document.body;

    button.addEventListener('click', function() {
        body.classList.toggle('light-mode');
    });
});