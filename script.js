// Initialize the map
var map = L.map('map', {
    center: [35.8617, 104.1954], // Center of China
    zoom: 4,
    zoomControl: false, // Disables zoom buttons
    scrollWheelZoom: false, // Prevents zoom with scrolling
    dragging: false, // Disables dragging
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


// Define the locations of the political prisoners
const locations = [
    { coords: [35.8617, 104.1954], zoom: 4, text: "Overview of political prisoners in China" }, // Start
    { coords: [39.9042, 116.4074], zoom: 10, text: "Political Prisoner 1 - Beijing" }, // Prisoner 1
    { coords: [31.2304, 121.4737], zoom: 10, text: "Political Prisoner 2 - Shanghai" }, // Prisoner 2
    { coords: [23.1291, 113.2644], zoom: 10, text: "Political Prisoner 3 - Guangzhou" }, // Prisoner 3
    { coords: [29.5630, 106.5516], zoom: 10, text: "Political Prisoner 4 - Chongqing" }, // Prisoner 4
    { coords: [41.8057, 123.4315], zoom: 10, text: "Political Prisoner 5 - Shenyang" }  // Prisoner 5
];

// Initialize Scrollama
const scroller = scrollama();

scroller
    .setup({
        step: '.step',  // Target each text section
        offset: 0.5,    // Trigger at 50% of viewport
        debug: false
    })
    .onStepEnter(({ index }) => {
        const { coords, zoom, text } = locations[index];
        map.setView(coords, zoom, { animate: true });
        console.log(text); // You can use this to update UI dynamically
    });

function handleStepEnter(response) {
    const index = response.index;
    const { coords, zoom, text } = locations[index];

    map.setView(coords, zoom, { animate: true });

    // Create a floating text box that updates
    document.getElementById("info-box").innerHTML = text;
}

function handleStepEnter(response) {
    const index = response.index;  // Get section index
    const { text } = locations[index];  // Get corresponding text

    // Update the floating info box with new content
    document.getElementById("info-box").innerHTML = text;
}

// Define prisoner markers (hidden initially)
const markers = locations.map(({ coords, text }) => {
    return L.marker(coords).bindPopup(`<b>${text}</b>`).addTo(map).openPopup();
});

// Hide all markers at first
markers.forEach(marker => marker.remove());

// Show marker when scrolling to the section
scroller.onStepEnter(({ index }) => {
    map.setView(locations[index].coords, locations[index].zoom, { animate: true });

    // Remove previous markers and show only the relevant one
    markers.forEach(marker => marker.remove());
    map.addLayer(markers[index]);
});






