// Initialize Scrollama
const scroller = scrollama();

// Setup Scrollama for triggering events based on scroll position
scroller
    .setup({
        step: '.step',  // Target the sections
        offset: 0.5,    // Trigger when 50% of the section is in view
        debug: false    // Set to true if you want debug info
    })
    .onStepEnter(handleStepEnter);  // Callback function for when a step is scrolled into view

// Function to handle step enter
function handleStepEnter(response) {
    const stepIndex = response.index;  // Get the index of the section in view

    // When the user scrolls to the first section, hide the statistic box
    if (stepIndex === 0) {
        // Add the 'hidden' class to the statistic box to fade it out
        document.getElementById('stat-box').classList.add('hidden');
    }
}

// Create map centered at a default location (e.g., Beijing)
const map = L.map('map').setView([39.9042, 116.4074], 5); // Beijing's coordinates

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Example marker (you can dynamically add more based on your data)
L.marker([39.9042, 116.4074]) // Coordinates for Beijing
    .addTo(map)
    .bindPopup("<b>Political Prisoner: Name</b><br>Details about this prisoner.")
    .openPopup();

// Initialize Scrollama
const scroller = scrollama();

// Setup Scrollama for triggering events based on scroll position
scroller
    .setup({
        step: '.step', // Target the sections
        offset: 0.5,   // When 50% of the section is visible
        debug: false   // Set to true if you want debug output
    })
    .onStepEnter(handleStepEnter); // Callback function to trigger actions when a step is in view

// This function will run when a step comes into view
function handleStepEnter(response) {
    const stepIndex = response.index; // Get the index of the section that was scrolled into view

    // Example of changing map view based on scroll position
    if (stepIndex === 1) {
        // Zoom into a specific location or highlight a prisoner’s location
        map.setView([39.9042, 116.4074], 10); // Zoom into Beijing
    } else if (stepIndex === 2) {
        // Example of changing the content or triggering other effects
        alert('Show trends in political imprisonment.');
    }
}

