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
//var queryUrl = " https://data.cityofchicago.org/resource/2kfw-zvte.geojson"
var queryUrl = 'api/scoot'

function geojsonMarkerOptions (feature) {
    return{
    radius: 6,
    fillColor: styleMarker(feature),
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 1
    };
};

function styleMarker(feature) {
    switch (true) {
        case parseInt(feature.properties.trip_distance)<100:
            // code block
            return "#DAF7A6";
        case parseInt(feature.properties.trip_distance)<2000:
            // code block
            return "#FFC300";
        case parseInt(feature.properties.trip_distance)<4000:
                // code block
            return "#FF5733";
        case parseInt(feature.properties.trip_distance)<6000:
                // code block
            return "#C70039";
        case parseInt(feature.properties.trip_distance)<8000:
                // code block
        return "#900C3F ";
        case parseInt(feature.properties.trip_distance)<10000:
                // code block
        return "#581845";
        default:
            return "#000000";
        // code block
    }
}

//Perform a GET request to the query URL
d3.json(queryUrl, function (data) {
    data["features"].forEach(thing => {
        console.log(thing);
    });
    L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
            console.log(latlng);
            return L.circleMarker(latlng)
                .bindPopup(latlng.toString());
        },
        style: geojsonMarkerOptions
    }).addTo(myMap);
    console.log(data);
    console.log(data["features"].length);
});

























