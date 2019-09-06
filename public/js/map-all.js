let markers = [];
let img = $("#preview");


function initAutocomplete(arr) {



    let myOptions = {
        zoom: 12,
        center: new google.maps.LatLng(37.5407, -77.4360),
        mapTypeControl: true,
        mapTypeControlOptions: { style: google.maps.MapTypeControlStyle.DROPDOWN_MENU },
        navigationControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("mapBox"),
        myOptions);


    // displays markers


    markers = arr.map(local => {



        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(parseFloat(local.lat), parseFloat(local.long)),
            map: map,
            custom: `/api/${local.id}`

        });
        // var infowindow = new google.maps.InfoWindow({
        //     content: `${local.id}`
        // });

        marker.addListener("click", function() {
            // infowindow.open(map, marker);
            img.attr("src", this.custom);
        });
    });


    // input of map
    var input = document.getElementById("pac-input");
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    map.addListener("bounds_changed", function() {
        searchBox.setBounds(map.getBounds());
    });


    searchBox.addListener("places_changed", function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };


            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }

        });
        map.fitBounds(bounds);
    });
}

function placeMarkerAndPanTo(latLng, name, html, map) {

    let contentString = "";
    let marker = new google.maps.Marker({
        position: latLng,
        map: map
    });
    google.maps.event.addListener(marker, "click", function() {
        infowindow.setContent(contentString);
        infowindow.open(map, marker);
        markers.push(marker);
    });
    google.maps.event.trigger(marker, "click");

    map.panTo(latLng);

    return marker;
}

function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

function clearMarkers() {
    setMapOnAll(null);
}

function deleteMarkers() {
    clearMarkers();
    markers = [];
}


function getMarkers() {

    $.ajax({
        type: "GET",
        url: "/api/map"

    }).then(response => {
        initAutocomplete(response);
    });

}


$(document).ready(function() {

    getMarkers();

});