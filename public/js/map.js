var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('mapBox'), {
    center: {lat: 37.5407, lng: -77.4360},
    zoom: 10
  });
}