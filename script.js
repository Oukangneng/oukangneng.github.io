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
        center: [35.8617, 104.1954], // Center of China
        zoom: 4,
        zoomControl: false,
        scrollWheelZoom: false,
        dragging: false,
    });

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    console.log("Map initialized");

    // Define political prisoner locations
    const locations = [
        { coords: [35.8617, 104.1954], zoom: 4, text: "Overview of political prisoners in China" },
        { coords: [39.9042, 116.4074], zoom: 10, text: "Political Prisoner 1 - Beijing" },
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
        offset: 0.5,
        debug: true
    }).onStepEnter(({ index }) => {
        const { coords, zoom, text } = locations[index];

        // Move map view
        map.setView(coords, zoom, { animate: true });

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
