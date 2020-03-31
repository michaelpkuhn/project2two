var myMap = L.map("map", {
    center: [41.8781, -87.6298],
    zoom: 13
  });
  
  // Adding tile layer
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap);
  
  var newtry = require("../short.json");

  console.log(newtry);
  
  d3.json(newtry, function(response) {
  
    console.log(response);
  
    for (var i = 0; i < response.length; i++) {
      var location = response[i].location;
  
      if (location) {
        L.marker([location.coordinates[1], location.coordinates[0]]).addTo(myMap);
      }
    }
  
  });
  