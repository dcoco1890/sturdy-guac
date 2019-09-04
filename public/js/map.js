let map = null;
let marker = null;
let infowindow;
let markers = [];
var $submitBtn = $("#submit");
var preview = $("#preview");
var fileInput = $("input[type=\"file\"]");
var sure = $("#u-sure");

function initAutocomplete() {

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
        deleteMarkers();
        var lat = event.latLng.lat();
        var long = event.latLng.lng();
        console.log(lat, long);
        placeMarkerAndPanTo(event.latLng, "name", "" + event.latLng, map);
    });


    // input of map
    var input = document.getElementById("pac-input");
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    map.addListener("bounds_changed", function () {
        searchBox.setBounds(map.getBounds());
    });
    var markers = [];

    searchBox.addListener("places_changed", function () {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
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

    let contentString = `Is this where you found that dank SKREET ART??<br><button id="gay">gay</button>`;
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

function sendCoordinates(coords) {

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


// End map code



function imageSubmit(e) {
    e.preventDefault();
    setTimeout(reload, 3000); // added this to reload the page regardless of whether or not the upload was good
    var form = $("#file")[0];
    var data = new FormData(form); // new formdata object to send to ajax

    $submitBtn.prop("disabled", true); // disables the submit button after it is pressed

    $.ajax({
        type: "POST",
        enctype: "multipart/form-data",
        url: "/api/upload",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        success: function(data) {

            $("#result").text(`Success! ${data.name} was uploaded`);
            console.log("SUCCESS : ", data);
            $submitBtn.prop("disabled", false);
        },
        error: function(e) {

            $("#result").text("Needs to be JPG or PNG");
            console.log("ERROR : ", e);
            $submitBtn.prop("disabled", false);
        }
    });
}

// shows preview of image being uploaded
fileInput.on("change", function(e) {
    var url = URL.createObjectURL(e.target.files[0]);
    preview.attr("src", url);
    sure.text("Are you sure you want to upload this image?");

});

function reload() {
    location.reload();
}


$submitBtn.on("click", imageSubmit);