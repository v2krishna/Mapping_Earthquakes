//Add console.log to click to see if our code is working
console.log("mapping GeoJSON working");

//create the map object with a center and zoom level.
 let map = L.map('mapid').setView([30,30],3);

       
// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

//Accessing the airport GeoJSON URL 
let airportData = " https://raw.githubusercontent.com/v2krishna/Mapping_Earthquakes/Mapping_Multiple_GeoJson_Points/majorAirports.json"

// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data,{
      onEachFeature: function(feature,layer){
          console.log(layer);
          console.log(feature.properties.faa);
          console.log(feature.properties.name);
          layer.bindPopup("<h3>Airport code: "+feature.properties.faa+"</h3><hr/><h3>Airport name:"+feature.properties.name+"</h3>");
      }
  }
    ).addTo(map);
});