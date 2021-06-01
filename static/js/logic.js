var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"


d3.json(url, function(data) {
    //console.log(data)
    initFeatures(data.features);
});


function markerSize(magnitude) {
    return magnitude * 10000;
}

function markerCol(magnitude) {
    if (magnitude <1) {
        return "#FFFF00";
    } else if (magnitude < 2) {
        return "#8B8000";
    } else if (magnitude < 3) {
        return "#FFA500";
    } else if (magnitude < 4) {
        return "##ff8c00";
    } else if (magnitude < 5) {
        return "#ff0000";
    } else {
        return "#8b0000";
    };
}

function initFeatures(geoData) {
    var earthquakes = L.geoJSON(geoData, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup("<h4>" + feature.properties.place + "</h4><hr><p>" +new DataCue(feature.properties.time) + "</p>" + "<p> Magnitude: " + feature.properties.magnitude + "</p>")},
            pointToLayer: function (feature, latlng) {
                return new L.circle(latlng, 
                    {radius: markerSize(feature.properties.magnitude),
                         fillColor: markerCol(feature.properties.magnitude),
                          fillOpacity: 1,
                           stroke: false,})
            }
    });
    createMap(earthquakes);
}

function createMap (earthquakes) {
    var sateliteMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: ""Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 15, 
        id: "mapbox.satellite",
        accessToken: API_KEY
    });
    var darkMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 15,
        id: "mapbox.satellite",
        accessToken: API_KEY
    });
    var baseMap = {
        "Satelite Map": sateliteMap,
        "Dark Map": darkMap
    };

}