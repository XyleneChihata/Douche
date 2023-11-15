// Get all buttons inside the form
const buttons = document.querySelectorAll('.timeSelector button');

// Get the div element to display the selected time
const selectedTimeDisplay = document.getElementById('selectedTimeDisplay');

// Add click event listeners to the buttons
buttons.forEach(button => {
    button.addEventListener('click', function() {
        // Get the text content of the clicked button (which is the selected time)
        const selectedTime = button.textContent;

        // Store the selected time in session storage
        sessionStorage.setItem('selectedTime', selectedTime);

        // Update the content of the div with the selected time
        selectedTimeDisplay.textContent = `Selected Time: ${selectedTime}`;
    });
});

// Check if there is a selected time in session storage when the page loads
window.addEventListener('load', function() {
    const storedTime = sessionStorage.getItem('selectedTime');

    // If there is a selected time, display it in the div
    if (storedTime) {
        selectedTimeDisplay.textContent = `Selected Time: ${storedTime}`;
    }
});
