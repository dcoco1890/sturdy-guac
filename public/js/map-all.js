function initAutocomplete(arr) {

    infowindow = new google.maps.InfoWindow({
        size: new google.maps.Size(150, 50)
    });
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


    map.addListener("click", function(event) {
        // deleteMarkers();
        // // changed so they would be more global
        // if (!pickedPosition) {
        //     pickedPosition = true;
        //     sure.text("");
        // }
        // lat = event.latLng.lat();
        // long = event.latLng.lng();
        // console.log(lat, long);
        // placeMarkerAndPanTo(event.latLng, "name", "" + event.latLng, map);
    });
    console.log(arr);
    for (var i = 0; i < arr.length; i++) {
        var lat = parseFloat(arr[i].lat);
        var long = parseFloat(arr[i].long);
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, long),
            map: map
        });
        console.log("hi");
    }

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

            markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));

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