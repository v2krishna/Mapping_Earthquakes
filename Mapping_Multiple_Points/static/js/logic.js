//Add console.log to click to see if our code is working
console.log("working");

//create the map object with a center and zoom level.
 let map = L.map('mapid').setView([34.0522,-118.2437],4);


//an array containing each city's location, state and population
//get the cities data from cities.js file
let cityData = cities;

//Loop through the cities array and create one marker for each city
// cityData.forEach(function(city) {
//     console.log(city);
//     L.marker(city.location)
//     .bindPopup("<h2>"+city.city+","+city.state+"</h2><h3>Population: "+city.population.toLocaleString()+"</h3>")
//     .addTo(map);
// });
cityData.forEach(function(city){
    console.log(city);
    L.circleMarker(city.location,{
        radius:city.population/100000,
        color: "orange",
        fillColor:'#ffffa1'
    
    })
        .bindPopup("<h2>"+city.city+","+city.state+"</h2><h3>Population:"+city.population.toLocaleString()+"</h3>")
        
        
        .addTo(map);
})


//add a marker to the map for Los Angeles, CA -- with circle
// L.circle([34.0522,-118.2437], {
//     radius:100,
//     // color:"black",
//     // fillColor:'#ffffa1'
// }).addTo(map);

// L.circleMarker([34.0522,-118.2437], {
//     radius:300,
//     color:"black",
//     fillColor:'#ffffa1'
// }).addTo(map);


// We create the tile layer that will be the background of our map.
// let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
// attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     accessToken: API_KEY
// });

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}',{
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});


// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

