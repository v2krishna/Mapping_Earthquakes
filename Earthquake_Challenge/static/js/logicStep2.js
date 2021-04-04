console.log("Working on EarthQuakes past 7 days");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

//create a base layer that holds both maps
let baseMaps = {
    "Streets":streets,
    "Satellite Streets": satelliteStreets
};

let map = L.map('mapid', {
    center: [39.5,-98.5],
    zoom: 3,
    layers: [streets]
})

let earthquakesdata  = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

let myStyle = {
    color: "#ffffa1",
    weight:2
}


//retrieve the earthquake GeoJson Data
d3.json(earthquakesdata).then(function (data){

    // This function returns the style data for each of the earthquakes we plot
    // on the map. we pass the magnitude of the earthquake into a function
    // to calculate the radius.
    function styleInfo(feature){
        return {
            opacity: 1, 
            fillOpacity:1,
            fillColor: "#ffae42",
            color :  "#000000",
            radius: getRadius(feature.properties.mag),
            stroke:true,
            weight:0.5
        } ;
    }
    function getRadius(magnitude){
        if(magnitude==0){
            return 1;
        }
        return magnitude *4;
    }
    
    //creating a geojson layer with the retrieved data
    L.geoJson(data,{
            
        //we turn each feature into a circleMarker on the map.
        pointToLayer: function(feature, latlng){
            console.log(data);
        return L.circleMarker(latlng);
    },
    style:styleInfo
    }).addTo(map);
})