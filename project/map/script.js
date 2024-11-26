document.addEventListener('DOMContentLoaded', () => {
    // Init map
    const map = L.map('map').setView([56.8796, 24.6032], 7); // Latvia coords

    // OpenStreetMap layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Fetch JSON
    fetch('geomap.json')
        .then(response => response.json())
        .then(data => {
            const features = data.features;

            features.forEach(feature => {
                const properties = feature.properties;
                const coordinates = feature.geometry.coordinates;

                const latLng = LKS92WGS84.convertXYToLatLon(coordinates);

                L.marker(latLng).addTo(map).bindPopup(`
                    <strong>${properties.PLACENAME}</strong>
                `);
            });
        })
        .catch(err => console.error('Error loading data:', err));
});
