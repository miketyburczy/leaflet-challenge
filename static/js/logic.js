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
            layer.bindPopup("")
        }
    })
}