var myMap = L.map("map", {
    center: [41.8781, -87.6298],
    zoom: 12,
    minZoom: 2,
    maxZoom: 18
});

// We use the addTo method to add objects to our map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
}).addTo(myMap);

// Store our API endpoint inside queryUrl
var queryUrl = " https://data.cityofchicago.org/resource/2kfw-zvte.geojson" 

var geojsonMarkerOptions = {
    radius: 6,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 1
};

//Perform a GET request to the query URL
d3.json(queryUrl, function (data) {
    data["features"].forEach(thing => {
        console.log(thing);
    });
    L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
            console.log(latlng);
            return L.circleMarker(latlng, geojsonMarkerOptions)
            .bindPopup(latlng.toString());
        }
    }).addTo(myMap);
    console.log(data);
    console.log(data["features"].length);
});

























