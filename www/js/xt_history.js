// Copyright Simon Lees 2013
// This has a dual license it may be used in accordance with the terms contained in
// a written agreement between you and Simon Lees.

// GNU General Public License Usage
// Alternatively, this file may be used under the terms of the GNU
// General Public License version 2.1 as published by the Free Software
// Foundation and appearing in the file LICENSE.GPL included in the
// packaging of this file.  Please review the following information to
// ensure the GNU General Public License version 2.1 requirements
// will be met: http://www.gnu.org/licenses/old-licenses/gpl-2.1.html.

// When the user views the history page
$('#history').live('pageshow', function () {
    
    // Count the number of entries in localStorage and display this information to the user
    tracks_recorded = window.localStorage.length;
    $("#tracks_recorded").html("<strong>" + tracks_recorded + "</strong> workout(s) recorded");
    
    // Empty the list of recorded tracks
    $("#history_tracklist").empty();
    
    // Iterate over all of the recorded tracks, populating the list
    for(i=0; i<tracks_recorded; i++){
        $("#history_tracklist").append("<li><a href='#track_info' data-ajax='false'>" + window.localStorage.key(i) + "</a></li>");
    }
    
    // Tell jQueryMobile to refresh the list
    $("#history_tracklist").listview('refresh');

});

// When the user clicks a link to view track info, set/change the track_id attribute on the track_info page.
$("#history_tracklist li a").live('click', function(){

    $("#track_info").attr("track_id", $(this).text());
    
});


// When the user views the Track Info page
$('#track_info').live('pageshow', function(){

    // Find the track_id of the workout they are viewing
    var key = $(this).attr("track_id");
    
    // Update the Track Info page header to the track_id
    $("#track_info div[data-role=header] h1").text(key);
    
    // Get all the GPS data for the specific workout
    var data = window.localStorage.getItem(key);
    
    // Turn the stringified GPS data back into a JS object
    data = JSON.parse(data);

    // Calculate the total distance travelled
    total_km = 0;

    for(i = 0; i < data.length; i++){
        
        if(i == (data.length - 1)){
            break;
        }
        
        total_km += gps_distance(data[i].coords.latitude, data[i].coords.longitude, data[i+1].coords.latitude, data[i+1].coords.longitude);
    }
    
    total_km_rounded = total_km.toFixed(2);
    
    // Calculate the total time taken for the track
    start_time = new Date(data[0].timestamp).getTime();
    end_time = new Date(data[data.length-1].timestamp).getTime();

    total_time_ms = end_time - start_time;
    total_time_s = total_time_ms / 1000;
    
    final_time_m = Math.floor(total_time_s / 60);
    final_time_s = total_time_s - (final_time_m * 60);

    // Display total distance and time
    $("#track_info_info").html('Travelled <strong>' + total_km_rounded + '</strong> km in <strong>' + final_time_m + 'm</strong> and <strong>' + final_time_s + 's</strong>');
    
    // Set the initial Lat and Long of the Google Map
    var myLatLng = new google.maps.LatLng(data[0].coords.latitude, data[0].coords.longitude);

    // Google Map options
    var myOptions = {
      zoom: 15,
      center: myLatLng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // Create the Google Map, set options
    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

    var trackCoords = [];
    
    // Add each GPS entry to an array
    for(i=0; i<data.length; i++){
        trackCoords.push(new google.maps.LatLng(data[i].coords.latitude, data[i].coords.longitude));
    }
    
    // Plot the GPS entries as a line on the Google Map
    var trackPath = new google.maps.Polyline({
      path: trackCoords,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    // Apply the line to the map
    trackPath.setMap(map);
   
        
});
