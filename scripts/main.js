var map;

function initMap(){

    //Here is the constructor for the map
    map=new google.maps.Map(document.getElementById('map'),{
      center:{lat:52.515919, lng:13.454574},
      zoom:13,
      styles:mapStyles.default,
      scaleControl: true,
      });

     var markers=[];

     //Here is the list of locations
     var locations=[{title:'fioflat',location:{lat:52.512245,lng:13.460891}}];

     var largeInfoWindow= new google.maps.InfoWindow();

    //Here is a helper function to populate info windows
    function populateInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div>' + marker.title + '</div>');
          infowindow.open(map, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
        });
        }
    };

    //Here are the styles

    //Here is the markers object populated
    markers=locations.map((location,idx)=>{
        var position=location.location;
        var title=location.title;
        var marker=new google.maps.Marker({
            position:position,
            title:title,
            animation:google.maps.Animation.DROP,
            id:idx});

        marker.addListener('click',function(){
            populateInfoWindow(this,largeInfoWindow);
        })
        return marker
    });

    // This function will loop through the markers array and display them all.
          function showListings() {
            var bounds = new google.maps.LatLngBounds();
            // Extend the boundaries of the map for each marker and display the marker
            for (var i = 0; i < markers.length; i++) {
              markers[i].setMap(map);
              bounds.extend(markers[i].position);
            }
            map.fitBounds(bounds);
            map.setCenter(markers[0].location)
            var mapOptions = {styles: mapStyles.default}
            map.setOptions(mapOptions);
            map.setZoom(14);
          }
          // This function will loop through the listings and hide them all.
          function hideListings() {
            for (var i = 0; i < markers.length; i++) {
              markers[i].setMap(null);
              var bounds = new google.maps.LatLngBounds();
              bounds.extend({lat:52.515919, lng:13.454574});
              map.fitBounds(bounds);
              map.setZoom(13);
            }
          }

          function changeStyle(e) {
             console.log(e.target.id);
            switch(e.target.id){
                case 'default-map':
                    var mapOptions = {styles: mapStyles.default};
                    break;
                case 'park-map':
                    var mapOptions = {styles: mapStyles.parks};
                    break;
                case 'hospital-map':
                    var mapOptions = {styles: mapStyles.hospitals};
                    break;
                case 'school-map':
                    var mapOptions = {styles: mapStyles.schools};
                    break;
                case 'trainStation-map':
                    var mapOptions = {styles: mapStyles.trainStation};
                    break;
                case 'localAttractions-map':
                    var mapOptions = {styles: mapStyles.localAttractions};
                    break;
                default:
                    var mapOptions = {styles: mapStyles.default};
            };
            console.log(mapOptions)
            map.setOptions(mapOptions);
          }

    //Event on button closeclick
    function zoomToArea() {
      // Initialize the geocoder.
      var geocoder = new google.maps.Geocoder();
      // Get the address or place that the user entered.
      var address = document.getElementById('address-input').value;
      // Make sure the address isn't blank.
      if (address == '') {
        window.alert('You must enter an area, or address.');
      } else {
        // Geocode the address/area entered to get the center. Then, center the map
        // on it and zoom in
        geocoder.geocode(
          { address: address,
            componentRestrictions: {locality: 'Berlin'}
          }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var position=results[0].geometry.location;
                var title=address;
                var marker=new google.maps.Marker({
                    position:position,
                    title:title,
                    animation:google.maps.Animation.DROP
                });
                marker.addListener('click',function(){
                    populateInfoWindow(this,largeInfoWindow);
                })
                markers.push(marker);
                showListings();
                map.setCenter(results[0].geometry.location);
                map.setZoom(15);
            } else {
              window.alert('We could not find that location - try entering a more' +
                  ' specific place.');
            }
          });
      }
  };

    //Add event listeners
    document.getElementById('show-listings').addEventListener('click', showListings);
    document.getElementById('hide-listings').addEventListener('click', hideListings);
    document.getElementById('map-buttons').addEventListener('click', changeStyle);
    document.getElementById('address-geocode').addEventListener('click',zoomToArea)

};
