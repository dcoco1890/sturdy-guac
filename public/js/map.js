let map = null;
let marker = null;
let infowindow;
let markers = [];

function initMap() {

    infowindow = new google.maps.InfoWindow(
        {
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

    map.addListener("click", function (event) {
        placeMarkerAndPanTo(event.latLng, "name", "<b>Location</b><br>" + event.latLng, map);
    });

}

function placeMarkerAndPanTo(latLng, name, html, map) {
    let contentString = html;
    let marker = new google.maps.Marker({
        position: latLng,
        map: map
    });
    google.maps.event.addListener(marker, "click", function () {
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