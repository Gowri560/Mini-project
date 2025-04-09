document.getElementById('startButton').addEventListener('click', function () {
    // Show the overlay animation
    const overlay = document.getElementById('animation-overlay');
    overlay.style.opacity = 1;

    // Transition to the second page (with a delay to allow animation)
    setTimeout(() => {
        window.location.href = "page2.html"; // Redirect to the page with the options
    }, 500); // Delay to allow the animation to complete
});