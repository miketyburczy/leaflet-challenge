var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"


//read data
d3.json(url, function(data) {
    //console.log(data)
    initFeatures(data.features);
});

function markSize(mag) {
    return mag * 15000;
}

function markCol(mag) {
    if (mag <1) {
        return "#FFFF00";
    } else if (mag < 2) {
        return "#ffdd00";
    } else if (mag < 3) {
        return "#FFA500";
    } else if (mag < 4) {
        return "#ff9100";
    } else if (mag < 5) {
        return "#ff0000";
    } else {
        return "#8b0000";
    };
}

function initFeatures(geoData) {
    var earthquakes = L.geoJSON(geoData, {
        onEachFeature : function (feature, layer) {
            layer.bindPopup("<h4>" + feature.properties.place + "</h4><hr><p>" + new Date(feature.properties.time) + "</p>" + "<p> Magnitude: " + feature.properties.mag + "</p>")},
            pointToLayer: function (feature, latlng) {
                return new L.circle(latlng, 
                    {radius: markSize(feature.properties.mag),
                         fillColor: markCol(feature.properties.mag),
                          fillOpacity: 20,
                           stroke: false,})
            }
    });
    createMap(earthquakes);
}

function createMap (earthquakes) {
    var satelliteMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 15, 
        id: "mapbox.satellite",
        accessToken: API_KEY
    });
    var streetMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 15,
        id: "mapbox.streets",
        accessToken: API_KEY
    });
    var baseMaps = {
        "Satellite Map": satelliteMap,
        "Street Map": streetMap
    };
    var overlayMaps = {
        Earthquakes: earthquakes
    };
    var myMap = L.map("map", {
        center: [37.7749, -122.4194],
        zoom: 7,
        layers: [satelliteMap, earthquakes]
    });
   
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

    //create legend
    var legend = L.control({position: "bottomright"});
    legend.onAdd = function () {
        
        var div = L.DomUtil.create('div', 'info legend'),
            magnitudes = [0, 1, 2, 3, 4, 5];

        for (var i = 0; i < magnitudes.length; i++) {
            div.innerHTML += '<i style="background:' + markCol(magnitudes[i] + 1) + '"></i> ' + 
            + magnitudes[i] + (magnitudes[i + 1] ? ' - ' + magnitudes[i + 1] + '<br>' : ' + ');
        }
        return div;
    };
    //add legend to Map
    legend.addTo(myMap);
}