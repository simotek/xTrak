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

var track_id = '';      // Name/ID of the exercise
var watch_id = null;    // ID of the geolocation
var tracking_data = []; // Array containing GPS position objects

$("#startTracking_start").live('click', function(){
    
    // Start tracking the User
    watch_id = navigator.geolocation.watchPosition(
    
        // Success
        function(position){
            tracking_data.push(position);
        },
        
        // Error
        function(error){
            console.log(error);
        },
        
        // Settings
        { frequency: 3000, enableHighAccuracy: true });
    
    // Tidy up the UI
    track_id = $("#track_id").val();
    
    $("#track_id").hide();
    
    $("#startTracking_status").html("Tracking workout: <strong>" + track_id + "</strong>");
});


$("#startTracking_stop").live('click', function(){
    
    // Stop tracking the user
    navigator.geolocation.clearWatch(watch_id);
    
    // Save the tracking data
    window.localStorage.setItem(track_id, JSON.stringify(tracking_data));

    // Reset watch_id and tracking_data 
    var watch_id = null;
    var tracking_data = null;

    // Tidy up the UI
    $("#track_id").val("").show();
    
    $("#startTracking_status").html("Stopped tracking workout: <strong>" + track_id + "</strong>");

});
