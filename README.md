# Earthquake Data Visualization with Leaflet and D3.js

This project visualizes earthquake data from the US Geological Survey (USGS) using a map created with [Leaflet](https://leafletjs.com/). It plots earthquakes from the past 7 days as interactive markers on the map, using circle markers whose size represents the magnitude and color represents the depth of each earthquake.

## Features

- **Interactive Map**: Displays earthquake data on a map centered on the United States.
- **Circle Markers**: Earthquake magnitudes determine the size of each marker, while depth determines the color.
- **Popups**: Clickable markers that display details about each earthquake, including location, magnitude, and depth.
- **Clustered Markers**: Uses marker clustering to group markers for a cleaner view at larger zoom levels.
- **Legend**: Provides a color-coded legend for earthquake depths in the bottom-left corner of the map.

## Getting Started

### Prerequisites

To run this project, you need:

- A text editor (e.g., VS Code, Sublime Text).
- A web browser (e.g., Chrome, Firefox).
- A web server for local development (optional, but recommended for loading data with D3).

### Installation

1. Clone or download this repository to your local machine.
2. Ensure that the following libraries are included in your HTML file:

   - Leaflet:
     ```html
     <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
     <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
     ```
   - Leaflet MarkerCluster:
     ```html
     <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster/dist/MarkerCluster.css" />
     <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster/dist/MarkerCluster.Default.css" />
     <script src="https://unpkg.com/leaflet.markercluster/dist/leaflet.markercluster.js"></script>
     ```
   - D3.js:
     ```html
     <script src="https://d3js.org/d3.v7.min.js"></script>
     ```

3. Create an `index.html` file and include the above libraries along with a link to your JavaScript file (`logic.js`).

4. Create a `logic.js` file and copy the provided JavaScript code into it.

### Running the Project

1. Open `index.html` in your preferred web browser. You should see a map centered on the United States.
2. The earthquake data is fetched from the USGS API and displayed as markers on the map.

## Code Overview

### Functionality

- **`getColor(depth)`**: Determines the color of each marker based on the earthquake's depth:
  - Depth > 90 km: Dark red (`#800026`)
  - Depth > 70 km: Red (`#BD0026`)
  - Depth > 50 km: Dark orange (`#E31A1C`)
  - Depth > 30 km: Orange (`#FC4E2A`)
  - Depth > 10 km: Light orange (`#FD8D3C`)
  - Depth ≤ 10 km: Yellow (`#FEB24C`)

- **Map Initialization**: Creates a Leaflet map centered on `[39.8283, -98.5795]` (center of the US) with a zoom level of `5`.

- **Tile Layer**: Adds a tile layer from OpenStreetMap to provide the map background.

- **Fetching Data**: Uses D3.js to fetch earthquake data from the USGS API:
  - URL: `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson`

- **Marker Creation**: For each earthquake, creates a circle marker using `L.circleMarker()` with:
  - `radius`: Scaled based on the earthquake's magnitude.
  - `fillColor` and `color`: Determined by the earthquake's depth using the `getColor` function.
  - Popups: Display information about the earthquake's location, magnitude, and depth when clicked.

- **Marker Clustering**: Uses `L.markerClusterGroup()` to group markers, improving performance and visualization when many markers are close together.

- **Legend**: Adds a control in the bottom-left corner of the map to show a legend for depth ranges, providing a reference for the color coding of markers.

### Error Handling

- The script includes a `.catch()` block to handle errors during the data fetch process:
  ```javascript
  d3.json(url).then(function(data) {
      // Marker creation and clustering logic...
  }).catch(error => console.error('Error fetching GeoJSON data:', error));
