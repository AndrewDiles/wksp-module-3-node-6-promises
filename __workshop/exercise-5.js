// Exercise 5 - `getDistanceFromIss`
// ---------------------------------
// Again here you should re-use two previously created functions, plus the `getDistance` function provided to you in `workshop.js`.
//
// One of the functions does address ==> position and the other simply does nothing ==> position.
// The `getDistance` function needs the two positions to compute the final value.


// Given an address (a string), returns the distance between that address and the ISS
// You'll need to use getDistance, getIssPosition and getAddressPosition

const request = require('request-promise');
const opencage = require('opencage-api-client');

// Gets ISS's lat/lng position
function getPosition() {
    return request('http://api.open-notify.org/iss-now.json')
    .then(function(res) {
        const location = JSON.parse(res);
        console.log (location.iss_position);
        return {lng: location.iss_position.longitude, lat: location.iss_position.latitude};
    });
}

// Turns an address into lat/lng

function getAddressPosition(address) {
    const requestObj = {
        key: '8f506f68366f402982ff4c3960c934b5',  // Scott's: 1315122032774d06b34c570f3bd70f7b
        q: address
    };

    return opencage.geocode(requestObj)
        .then(data => {
            const place = data.results[0];
            return {lat: place.geometry.lat, lng: place.geometry.lng};
        })
        // .then(data => {
        //     console.log(data);
        // })
        .catch(error => console.log('error', error.message));
}

// Taken from online, turns two positions inton the distance between them
function deg2rad(deg) {
    return deg * (Math.PI/180)
}
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    const R = 6371; // Radius of the earth in km
    let dLat = deg2rad(lat2-lat1);  // deg2rad below
    let dLon = deg2rad(lon2-lon1); 
    let a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    let d = R * c; // Distance in km
    return d;
}

// Average height of the ISS is 408km
function getDistanceFromIss(address) {
    return getAddressPosition(address)
        .then (function(position) {
            let lat1 = position.lat;
            let lon1 = position.lng;
            return getPosition()
                .then (function(issPosition) {
                    let lat2 = issPosition.lat;
                    let lon2 = issPosition.lng;
                    let base = getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2);  // this is the base of the triangle
                    let height = 408;                                           // this is the height of the triangle / ISS
                    let highOnPotEnous = Math.sqrt((height*height) + (base*base));
                    console.log(highOnPotEnous);
                    return highOnPotEnous;
                })
                .catch(error => console.log('error', error.message));
        });
}

getDistanceFromIss('74 Rue De Galais, Boisbriand, QC J7G 1P7');