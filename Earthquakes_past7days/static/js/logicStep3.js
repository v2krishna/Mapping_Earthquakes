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
});

//Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

let earthquakesdata  = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

let myStyle = {
    color: "#ffffa1",
    weight:2
}


//retrieve the earthquaje GeoJson Data
d3.json(earthquakesdata).then(function (data){

    // This function returns the style data for each of the earthquakes we plot
    // on the map. we pass the magnitude of the earthquake into a function
    // to calculate the radius.
    function styleInfo(feature){
        return {
            opacity: 1, 
            fillOpacity:1,
            fillColor:getColor(feature.properties.mag),
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
    
    function getColor(magnitude){
        if(magnitude>5){
            return "#ea2c2c";
        }
        if(magnitude>4){
            return "#ea822c";
        }
        if(magnitude>3){
            return "#ee9c00";
        }
        if(magnitude>2){
            return "#eecc00";
        }
        if (magnitude > 1) {
            return "#d4ee00";
        }
        return "#98ee00";
    }
    //creating a geojson layer with the retrieved data
    L.geoJson(data,{
        // We turn each feature into a circleMarker on the map.
        pointToLayer: function(feature, latlng) {
            console.log(data);
            return L.circleMarker(latlng);
      },
        style:styleInfo,
        //we turn each feature into a circleMarker on the map.
        onEachFeature: function(feature,layer){ 
            layer.bindPopup("Magnitue:"+feature.properties.mag+"<br/>Location:"+feature.properties.place)
        }


    }).addTo(map);
})