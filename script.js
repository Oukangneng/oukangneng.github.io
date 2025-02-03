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

// Define the locations of the political prisoners
const locations = [
    { coords: [35.8617, 104.1954], zoom: 4, text: "Overview of political prisoners in China" }, // Start
    { coords: [39.9042, 116.4074], zoom: 10, text: "Political Prisoner 1 - Beijing" }, // Prisoner 1
    { coords: [31.2304, 121.4737], zoom: 10, text: "Political Prisoner 2 - Shanghai" }, // Prisoner 2
    { coords: [23.1291, 113.2644], zoom: 10, text: "Political Prisoner 3 - Guangzhou" }, // Prisoner 3
    { coords: [29.5630, 106.5516], zoom: 10, text: "Political Prisoner 4 - Chongqing" }, // Prisoner 4
    { coords: [41.8057, 123.4315], zoom: 10, text: "Political Prisoner 5 - Shenyang" }  // Prisoner 5
];

// Define prisoner markers (hidden initially)
const markers = locations.map(({ coords, text }) => {
    return L.marker(coords).bindPopup(`<b>${text}</b>`).addTo(map);
});

// Hide all markers at first
markers.forEach(marker => marker.remove());

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

        // Move map view
        map.setView(coords, zoom, { animate: true });

        // Update floating info box text
        document.getElementById("info-box").innerHTML = text;

        // Remove all markers and show only the relevant one
        markers.forEach(marker => marker.remove());
        map.addLayer(markers[index]);
    });
