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

