var LKS92WGS84 = (function() {
    // Define constants for LKS92 to WGS84 conversion
    LKS92WGS84.PI = Math.PI;
    LKS92WGS84.A_AXIS = 6378137; // Ellipsoid semi-major axis
    LKS92WGS84.B_AXIS = 6356752.31414; // Ellipsoid semi-minor axis
    LKS92WGS84.CENTRAL_MERIDIAN = LKS92WGS84.PI * 24 / 180; // Central meridian
    LKS92WGS84.OFFSET_X = 500000; // Horizontal offset
    LKS92WGS84.OFFSET_Y = -6000000; // Vertical offset
    LKS92WGS84.SCALE = 0.9996; // Scale factor

    function LKS92WGS84() {}

    // Get footpoint latitude
    LKS92WGS84.getFootpointLatitude = function(y) {
        var yd, alpha, beta, gamma, delta, epsilon, n;

        n = (LKS92WGS84.A_AXIS - LKS92WGS84.B_AXIS) / (LKS92WGS84.A_AXIS + LKS92WGS84.B_AXIS);
        alpha = ((LKS92WGS84.A_AXIS + LKS92WGS84.B_AXIS) / 2) * (1 + (Math.pow(n, 2) / 4) + (Math.pow(n, 4) / 64));
        yd = y / alpha;
        beta = (3 * n / 2) + (-27 * Math.pow(n, 3) / 32) + (269 * Math.pow(n, 5) / 512);
        gamma = (21 * Math.pow(n, 2) / 16) + (-55 * Math.pow(n, 4) / 32);
        delta = (151 * Math.pow(n, 3) / 96) + (-417 * Math.pow(n, 5) / 128);
        epsilon = (1097 * Math.pow(n, 4) / 512);

        return yd + (beta * Math.sin(2 * yd)) + (gamma * Math.sin(4 * yd)) + (delta * Math.sin(6 * yd)) + (epsilon * Math.sin(8 * yd));
    };

    // Convert map coordinates to latitude and longitude
    LKS92WGS84.convertMapXYToLatLon = function(x, y, lambda0) {
        var phif, Nf, Nfpow, nuf2, ep2, tf, tf2, tf4, cf,
            x1frac, x2frac, x3frac, x4frac, x5frac, x6frac, x7frac, x8frac,
            x2poly, x3poly, x4poly, x5poly, x6poly, x7poly, x8poly,
            latLng = [0, 0];

        phif = LKS92WGS84.getFootpointLatitude(y);
        ep2 = (Math.pow(LKS92WGS84.A_AXIS, 2) - Math.pow(LKS92WGS84.B_AXIS, 2)) / Math.pow(LKS92WGS84.B_AXIS, 2);
        cf = Math.cos(phif);
        nuf2 = ep2 * Math.pow(cf, 2);
        Nf = Math.pow(LKS92WGS84.A_AXIS, 2) / (LKS92WGS84.B_AXIS * Math.sqrt(1 + nuf2));
        Nfpow = Nf;

        tf = Math.tan(phif);
        tf2 = tf * tf;
        tf4 = tf2 * tf2;

        x1frac = 1 / (Nfpow * cf);

        Nfpow *= Nf;    // Nf^2
        x2frac = tf / (2 * Nfpow);

        Nfpow *= Nf;    // Nf^3
        x3frac = 1 / (6 * Nfpow * cf);

        Nfpow *= Nf;    // Nf^4
        x4frac = tf / (24 * Nfpow);

        Nfpow *= Nf;    // Nf^5
        x5frac = 1 / (120 * Nfpow * cf);

        Nfpow *= Nf;    // Nf^6
        x6frac = tf / (720 * Nfpow);

        Nfpow *= Nf;    // Nf^7
        x7frac = 1 / (5040 * Nfpow);

        Nfpow *= Nf;    // Nf^8
        x8frac = tf / (40320 * Nfpow);

        x2poly = -1 - nuf2;
        x3poly = -1 - 2 * tf2 - nuf2;
        x4poly = 5 + 3 * tf2 + 6 * nuf2 - 6 * tf2 * nuf2 - 3 * (nuf2 * nuf2) - 9 * tf2 * (nuf2 * nuf2);
        x5poly = 5 + 28 * tf2 + 24 * tf4 + 6 * nuf2 + 8 * tf2 * nuf2;
        x6poly = -61 - 90 * tf2 - 45 * tf4 - 107 * nuf2 + 162 * tf2 * nuf2;
        x7poly = -61 - 662 * tf2 - 1320 * tf4 - 720 * (tf4 * tf2);
        x8poly = 1385 + 3633 * tf2 + 4095 * tf4 + 1575 * (tf4 * tf2);

        // Latitude
        latLng[0] = phif + x2frac * x2poly * (x * x) + x4frac * x4poly * Math.pow(x, 4) + x6frac * x6poly * Math.pow(x, 6) + x8frac * x8poly * Math.pow(x, 8);

        // Longitude
        latLng[1] = lambda0 + x1frac * x + x3frac * x3poly * Math.pow(x, 3) + x5frac * x5poly * Math.pow(x, 5) + x7frac * x7poly * Math.pow(x, 7);

        return latLng;
    };

    return LKS92WGS84;
})();

// Initialize the map
const map = L.map('map').setView([56.8796, 24.6032], 7); // Latvia coordinates

// Add OpenStreetMap layer
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://carto.com/">Carto</a>'
}).addTo(map);


// Function to convert EPSG:3059 (LKS92) to WGS84 (latitude, longitude)
function convertCoordinates(x, y) {
    const latLon = LKS92WGS84.convertMapXYToLatLon(x, y, LKS92WGS84.CENTRAL_MERIDIAN);
    return [latLon[0], latLon[1]]; // Return the WGS84 latitude and longitude
}

// Load GeoJSON data
fetch('geomap.json')
    .then(response => response.json())
    .then(data => {
        console.log('GeoJSON Data:', data); // Log the GeoJSON data to the console

        // Transform and add features
        const markers = []; // Array to store markers
        const features = data.features.map(feature => {
            const [x, y] = feature.geometry.coordinates; // Get EPSG:3059 coordinates
            const [lat, lon] = convertCoordinates(x, y); // Convert to WGS84
            feature.geometry.coordinates = [lat, lon]; // Update to WGS84
            return feature;
        });

        // Add features to the map
        L.geoJSON(features, {
            pointToLayer: (feature, latlng) => {
                const marker = L.marker(latlng);
                markers.push(marker); // Store marker
                return marker;
            },
            onEachFeature: (feature, layer) => {
                const { PLACENAME } = feature.properties; // Extract property
                layer.bindPopup(`<strong>${PLACENAME}</strong>`); // Add popup
            }
        }).addTo(map);

        // Fit map to markers
        const group = L.featureGroup(markers);
        map.fitBounds(group.getBounds());
    })
    .catch(err => console.error("Error loading GeoJSON data:", err));
