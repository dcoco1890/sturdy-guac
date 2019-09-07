let markers = [];
let img = $("#preview");
let pageLat = $("#lat");
let pageLong = $("#long");

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
            custom: `/api/${local.id}`,
            lat: local.lat,
            long: local.long

        });

        // click listener for markers, changes img src on page to api/id, and lat and long on page
        marker.addListener("click", function() {
            img.attr("src", this.custom);
            pageLat.text(this.lat);
            pageLong.text(this.long);
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