function initMap() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    // The location of SF
    const sf = {lat: 37.7749, lng: -122.4194};
    // The map, centered at SF
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 5,
      center: sf,
    });    
    // The marker, positioned at SF
    const marker = new google.maps.Marker({
      position: sf,
      map: map,
    }); 

    /************Autocomplete the from and to search inputs ***************/
    //Set the default bounds for the autocomplete search results (SW and NE corners)
    //this will bias the search results to this area but not limited to it
    var defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(32.7157, -117.1611), //coord of SD 
        new google.maps.LatLng(40.7128, -73.0060) //coords of NY
    );

    //Create options dictionary
    var options = {
        bounds: defaultBounds
    };

    //Get the HTML input elements (from_input & to_input)
    var from_input = document.getElementById('from_input');
    var to_input = document.getElementById('to_input');

    //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input); <- this is not need this pushes the input field onto the map

    //Create the autocomplete object
    var autocomplete_from = new google.maps.places.Autocomplete(from_input, options);
    var autocomplete_to = new google.maps.places.Autocomplete(to_input, options);
    /************End autocomplete the from and to search inputs ***************/

    directionsRenderer.setMap(map);

    const onChangeHandler = function () {
        calculateAndDisplayRoute(directionsService, directionsRenderer);
      };
      
    document.getElementById("from_input").addEventListener("change", onChangeHandler);
    document.getElementById("to_input").addEventListener("change", onChangeHandler);

}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    directionsService.route(
      {
        origin: {
          query: document.getElementById("from_input").value,
        },
        destination: {
          query: document.getElementById("to_input").value,
        },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === "OK") {
          directionsRenderer.setDirections(response);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }
  
 
