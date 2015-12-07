var results;

// script.
//   var map = L.map('map').setView([37.804146, -122.275045], 16);
//   L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
//   }).addTo(map);
//   //var geocoder = L.control.geocoder('search-GL1-fZE ').addTo(map);

var map = L.map('map').setView([37.412513, -121.937197], 14);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
}).addTo(map);
// get all junction and add to map with Marker
var marker_junction = {};
$.get('/api/all_junction', function(data) {
  var junctions = data.hits.hits;
  //$('#right_panel').html(JSON.stringify(junctions));
  for (var i=0; i<junctions.length; i++) {
    var lat = junctions[i]._source.location.lat;
    var lon = junctions[i]._source.location.lon;
    var marker = new CustomMarker(new L.LatLng(lat, lon), {
      junction: junctions[i],
      icon: new NumberedDivIcon({
        iconUrl: '/images/search@2x.png',
        number: junctions[i]._source.junction_shortname
      })
    }

    /*, {
      icon: new LeafIcon( {
        iconUrl: '../public/images/point_icon.png'
      })
    }*/)
      .addTo(map)
      .on('click', function (e) {
        //alert(marker_junction[this]._source.location.lat);
        $('#right_panel').html(JSON.stringify(e.target.options.junction));
      });
      //.bindPopup(junctions[i]._source.junction_name);
    //marker_junction[marker] = junctions[i];
  }
});
$(function(){
 $('#search').on('keyup', function(e){
   var keySearch = $(this).val();
   if(keySearch.length > 1) {
     var parameters = { name: keySearch };
     $.post('/api/search',parameters, function(data) {
       $('#results').empty();
       var output;
       // data tra ve hist
       if (data.total > 0) {
         results = data.hits;
         $.each(data.hits, function (key, val) {
           output = '<li id="' + key + '">';
            output += '<a>';
              output += val._source.name.default;
            output += '<a>';
           output += '</li>';
           $('#results').append(output);
         });
         $("#results li").on("click", function() {
           $('#search').val($(this).text());
           $('#right_panel').html(JSON.stringify(results[$(this).attr('id')]));
           $('#results').empty();
         });
       }
     });
   } else {
     $('#results').empty();
   }
 });
});
