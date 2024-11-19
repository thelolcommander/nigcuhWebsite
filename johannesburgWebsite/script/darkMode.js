document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById('toggle-button');
    const body = document.body;

    // No need to add 'dark-mode' class, since absence of 'light-mode' means dark mode
    // Just ensure that dark mode is the default (which is already set in CSS)

    // Add event listener for button click to toggle light/dark mode
    button.addEventListener('click', function() {
        // Toggle light mode on the body
        body.classList.toggle('light-mode');
    });
});