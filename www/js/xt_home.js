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

document.addEventListener("deviceready", function(){
    
    if(navigator.network.connection.type == Connection.NONE){
        $("#home_network_button").text('No Internet Access')
                                 .attr("data-icon", "delete")
                                 .button('refresh');
    }

});

$("#home_clearstorage_button").live('click', function(){
    window.localStorage.clear();
});

$("#home_seedgps_button").live('click', function(){
    window.localStorage.setItem('Sample block', '[{"timestamp":1335700802000,"coords":{"heading":null,"altitude":null,"longitude":170.33488333333335,"accuracy":0,"latitude":-45.87475166666666,"speed":null,"altitudeAccuracy":null}},{"timestamp":1335700803000,"coords":{"heading":null,"altitude":null,"longitude":170.33481666666665,"accuracy":0,"latitude":-45.87465,"speed":null,"altitudeAccuracy":null}},{"timestamp":1335700804000,"coords":{"heading":null,"altitude":null,"longitude":170.33426999999998,"accuracy":0,"latitude":-45.873708333333326,"speed":null,"altitudeAccuracy":null}},{"timestamp":1335700805000,"coords":{"heading":null,"altitude":null,"longitude":170.33318333333335,"accuracy":0,"latitude":-45.87178333333333,"speed":null,"altitudeAccuracy":null}},{"timestamp":1335700806000,"coords":{"heading":null,"altitude":null,"longitude":170.33416166666666,"accuracy":0,"latitude":-45.871478333333336,"speed":null,"altitudeAccuracy":null}},{"timestamp":1335700807000,"coords":{"heading":null,"altitude":null,"longitude"
:170.33526833333332,"accuracy":0,"latitude":-45.873394999999995,"speed":null,"altitudeAccuracy":null}},{"timestamp":1335700808000,"coords":{"heading":null,"altitude":null,"longitude":170.33427333333336,"accuracy":0,"latitude":-45.873711666666665,"speed":null,"altitudeAccuracy":null}},{"timestamp":1335700809000,"coords":{"heading":null,"altitude":null,"longitude":170.33488333333335,"accuracy":0,"latitude":-45.87475166666666,"speed":null,"altitudeAccuracy":null}}]');

});