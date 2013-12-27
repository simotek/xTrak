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


function gps_distance(lat1, lon1, lat2, lon2)
{
    // http://www.movable-type.co.uk/scripts/latlong.html
    var R = 6371; // km
    var dLat = (lat2-lat1) * (Math.PI / 180);
    var dLon = (lon2-lon1) * (Math.PI / 180);
    var lat1 = lat1 * (Math.PI / 180);
    var lat2 = lat2 * (Math.PI / 180);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    
    return d;
}