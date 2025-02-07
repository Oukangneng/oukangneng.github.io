// Ensure DOM is loaded before running scripts
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed");

    // Ensure stat-box is visible
    const statBox = document.getElementById("stat-box");
    if (statBox) {
        statBox.style.display = "block";
        statBox.style.zIndex = "1000"; // Ensure it appears above other elements
    } else {
        console.warn("stat-box not found in DOM");
    }

// Initialize the map
var map = L.map('map', {
    zoomControl: false,
    scrollWheelZoom: false,
    dragging: false
});

// Set the initial world view explicitly
map.setView([20, 0], 1); 

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

    

    console.log("Map initialized");

    // Define political prisoner locations
    const locations = [
        { coords: [35.8617, 104.1954], zoom: 4, text: "Overview of political prisoners in China" }, // Start
        { coords: [30.657, 104.066], zoom: 8, text: "Zooming into Sichuan Province" }, // Sichuan Zoom
        { coords: [30.578, 103.947], zoom: 12, text: "Political Prisoner 1 - Sichuan" }, // First prisoner in Sichuan
        { coords: [31.2304, 121.4737], zoom: 10, text: "Political Prisoner 2 - Shanghai" },
        { coords: [23.1291, 113.2644], zoom: 10, text: "Political Prisoner 3 - Guangzhou" },
        { coords: [29.5630, 106.5516], zoom: 10, text: "Political Prisoner 4 - Chongqing" },
        { coords: [41.8057, 123.4315], zoom: 10, text: "Political Prisoner 5 - Shenyang" }
    ];

    // Create markers and hide them initially
    const markers = locations.map(({ coords, text }) => {
        return L.marker(coords).bindPopup(`<b>${text}</b>`);
    });

    markers.forEach(marker => marker.remove());

    // Initialize Scrollama
    const scroller = scrollama();

    scroller.setup({
        step: '.step',
        offset: 0.75, // Trigger a bit later for better effect
        debug: false
    }).onStepEnter(({ index }) => {
        const { coords, zoom, text } = locations[index];

        // Move map view with smooth animation
        map.flyTo(coords, zoom, { animate: true, duration: 2 });

        // Update floating info box
        const infoBox = document.getElementById("info-box");
        if (infoBox) {
            infoBox.innerHTML = text;
        } else {
            console.warn("info-box not found in DOM");
        }

        // Remove all markers and add the relevant one
        markers.forEach(marker => marker.remove());
        map.addLayer(markers[index]);

        console.log("Displaying: " + text);
    });

    console.log("Scrollama initialized and ready to interact");
});
