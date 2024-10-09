// Define a function to get color based on depth
function getColor(depth) {
    return depth > 90 ? '#800026' :
           depth > 70 ? '#BD0026' :
           depth > 50 ? '#E31A1C' :
           depth > 30 ? '#FC4E2A' :
           depth > 10 ? '#FD8D3C' :
                        '#FEB24C';
}

// Create the map object
let myMap = L.map("map", {
    center: [39.8283, -98.5795], // Center on the US
    zoom: 5
});

// Add the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Store the API URL for past 7 days All Earthquakes
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Fetch the data using D3
d3.json(url).then(function(data) {
    // Create a marker cluster group
    let markers = L.markerClusterGroup();

    // Loop through each feature in the GeoJSON
    data.features.forEach(feature => {
        // Extract the coordinates and properties
        let coordinates = feature.geometry.coordinates; // [longitude, latitude, depth]
        let magnitude = feature.properties.mag || 0.1; // Ensure magnitude has a minimum value.
        let place = feature.properties.place;
        let depth = coordinates[2]; // Depth

        // Check for valid coordinates
        if (coordinates) {
            // Create a circle marker for each earthquake
            let marker = L.circleMarker([coordinates[1], coordinates[0]], {
                radius: Math.max(magnitude * 3, 5), // Adjust radius for magnitude
                fillColor: getColor(depth),
                color: getColor(depth),
                weight: 0.5,
                fillOpacity: 0.8
            }).bindPopup(
                `<h3>${place}</h3><p>Magnitude: ${magnitude}</p><p>Depth: ${depth} km</p>`
            );

            // Add the marker to the marker cluster group
            markers.addLayer(marker);
        }
    });

    // Add the cluster group to the map
    myMap.addLayer(markers);
}).catch(error => console.error('Error fetching GeoJSON data:', error));

// Create a legend control for depth
let legend = L.control({ position: 'bottomleft' });

legend.onAdd = function() {
    let div = L.DomUtil.create('div', 'info legend');
    let depths = [-10, 10, 30, 50, 70, 90];
    let labels = [];

    // Loop through the depth intervals and generate a label with a colored square for each interval
    depths.forEach((depth, index) => {
        const nextDepth = depths[index + 1];
        const color = getColor(depth + 1);

        labels.push(
            `<i style="background: ${color}; width: 18px; height: 18px; display: inline-block; margin-right: 8px;"></i> ` +
            `${depth}${nextDepth ? `&ndash;${nextDepth}` : '+'}`
        );
    });

    // Join all labels and add them to the div
    div.innerHTML = labels.join('<br>');
    return div;
};

// Add the legend to the map
legend.addTo(myMap);
