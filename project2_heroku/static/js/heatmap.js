var myMap = L.map("map", {
    center: [41.8991, -87.7213],
    zoom: 13
  });
  
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap);
  
  //var url = ("static/js/data/scoot.json");
  var url = '/api/scoot'

  d3.json(url, function(response) {
  
    //console.log(response);
  
    var heatArray = [];


  
    for (var i = 0; i < response.length; i++) {
        var startLat = response[i]["Start Lat"];
        var startLong = response[i]["Start Long"];
        var location = [startLat, startLong]; 
  
      if (location) {
        heatArray.push([location[0], location[1]]);
      }
    }
  
    var heat = L.heatLayer(heatArray, {
      radius: 20,
      blur: 35
    }).addTo(myMap);
  
  });