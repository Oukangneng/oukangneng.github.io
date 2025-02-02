// Initialize the map
const map = L.map('map', {
    center: [35.8617, 104.1954], 
    zoom: 4,
    zoomControl: false,   // Removes the zoom buttons
    dragging: false,      // Disables dragging
    scrollWheelZoom: false, // Disables scroll zoom (we control zoom manually)
    doubleClickZoom: false, // Disables zoom on double click
    boxZoom: false,       // Disables zooming with box selection
    touchZoom: false      // Disables zooming on touch devices
});



// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Fix potential map rendering issues
setTimeout(() => {
    map.invalidateSize();
}, 100);

// Example marker (can be changed dynamically based on data)
L.marker([39.9042, 116.4074]) // Beijing
    .addTo(map)
    .bindPopup("<b>Political Prisoner: Name</b><br>Details about this prisoner.");

// Initialize Scrollama
const scroller = scrollama();

scroller
    .setup({
        step: '.step',  // Target scrolling sections
        offset: 0.5,    // Trigger halfway into viewport
        debug: false
    })
    .onStepEnter(handleStepEnter); // Handle section changes

// Function to handle scrolling behavior
function handleStepEnter(response) {
    const stepIndex = response.index;

    if (stepIndex === 0) {
        // Fade out the statistic box
        document.getElementById('stat-box').classList.add('hidden');
    } else if (stepIndex === 1) {
        // Zoom to Beijing
        map.setView([39.9042, 116.4074], 10);
    } else if (stepIndex === 2) {
        // Example action: Display an alert or load additional data
        alert('Show trends in political imprisonment.');
    }
}
function handleStepEnter(response) {
    const stepIndex = response.index; 

    if (stepIndex === 0) {
        map.setView([35.8617, 104.1954], 4); // Zoomed out view of China
    } else if (stepIndex === 1) {
        map.setView([39.9042, 116.4074], 10); // Zoom into Beijing for prisoner #1
    } else if (stepIndex === 2) {
        map.setView([31.2304, 121.4737], 10); // Zoom into Shanghai for prisoner #2
    }
}
