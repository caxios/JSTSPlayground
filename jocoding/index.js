let map;

async function myMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 15
    });
    infoWindow = new google.maps.InfoWindow;

    // 내(사용하는 사람) 위치 가져오기
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {lat: position.coords.latitude, lng: position.coords.longitude};

            infoWindow.open(map);
            map.setCenter(pos);
            var marker = new google.maps.Marker({
                position : pos,
                animation : google.maps.Animation.BOUNCE
            });
            marker.setMap(map);
            }, function() {handleLocationError(true, infoWindow, map.getCenter());
        });
    } 
    else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

async function findPlaces() {
    const query = document.getElementById('query').value;
    const { Place } = await google.maps.importLibrary("places");
    const { Marker } = await google.maps.importLibrary("marker");
    const request = {
      textQuery: query,
      fields: ["displayName", "location", "businessStatus"],
      includedType: "restaurant",
      isOpenNow: true,
      language: "ko",
      maxResultCount: 8,
      minRating: 3.2,
      region: "KR",
      useStrictTypeFiltering: false,
    };

    const { places } = await Place.searchByText(request);
  
    if (places.length) {
      console.log(places);
      const { LatLngBounds } = await google.maps.importLibrary("core");
      const bounds = new LatLngBounds();
  
      // Loop through and get all the results.
      places.forEach((place) => {
        const markerView = new Marker({
          map,
          position: place.location,
          title: place.displayName,
          flag: true,
          label : place.displayName
        });
  
        bounds.extend(place.location);
        console.log(place);
      });
      map.fitBounds(bounds);
    } else {
      console.log("No results");
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? 'Error: The Geolocation service failed.'
        : 'Error: Your browser doesn\'t support geolocation.'
    );
    infoWindow.open(map);
}
window.addEventListener('load', myMap);
//google.maps.event.addDomListener(window, 'load', myMap);