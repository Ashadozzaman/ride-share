## Leaflet

-   Use CSS link in welcome page
-   `npm install leaflet`

```
var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS popup.<br> Easily customizable.')
    .openPopup();
```

## Leaflet Routing Machin

If you prefer, you can also install using NPM:

```
npm install --save leaflet-routing-machine
```

```
// import

import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
```

```
L.Routing.control({
  waypoints: [
    L.latLng(57.74, 11.94),
    L.latLng(57.6792, 11.949)
  ]
}).addTo(map);
```

Details

```
Leaflet.Routing.control({
        waypoints: [
            Leaflet.latLng(latitudeL, longitudeL),
            Leaflet.latLng(latitudeD, longitudeD),
        ],
        lineOptions: {
            styles: [{ color: "blue", weight: 5, opacity: 0.8 }],
        },
        routeWhileDragging: true,
    }).addTo(map.value);
```

Main Site [Here](https://www.liedman.net/leaflet-routing-machine/#getting-started)
