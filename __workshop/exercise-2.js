// Exercise 2 - `getAddressPosition`
// ---------------------------------
// 1. Complete the code of this function to return a `Promise` for a lat/lng object
// 2. Use the [OpenCage Data API](https://opencagedata.com/) to do this
//     - Sign up for an account (free) and follow the various guides to get started.
//     - [NodeJs tutorial](https://opencagedata.com/tutorials/geocode-in-nodejs)
//     - missing from the above is the need for the `key` in the request object.
//     - disregard the `.env` guidelines for now.
// 3. Once you have it working, pass it a few address to see what the responses look like.
// 4. Make sure to only return an object with lat/lng and not the whole response

const opencage = require('opencage-api-client');

// reverse: https://api.opencagedata.com/geocode/v1/json?q=LAT+LNG&key=8f506f68366f402982ff4c3960c934b5
// forward: https://api.opencagedata.com/geocode/v1/json?q=PLACENAME&key=8f506f68366f402982ff4c3960c934b5

function getAddressPosition(address) {
    const requestObj = {
        key: '8f506f68366f402982ff4c3960c934b5',  // Scott's: 1315122032774d06b34c570f3bd70f7b
        q: address
    };

    return opencage.geocode(requestObj)
        .then(data => {
            // if (data.status.code == 200) {
                // if (data.results.length > 0) {
                    const place = data.results[0];

                    // console.log(`lng: ${place.geometry.lng}, lat: ${place.geometry.lat}`);

                    // return JSON.stringify(data);
                    return {lat: place.geometry.lat, lng: place.geometry.lng};
                // }
            // } else {
            //     // other possible response codes:
            //     // https://opencagedata.com/api#codes
            //     console.log('error', data.status.message);
            // }
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => console.log('error', error.message));
}

// console.log(getAddressPosition('1455 Boulevard de Maisonneuve O, Montréal, QC H3G 1M8'));
getAddressPosition('1455 Boulevard de Maisonneuve O, Montréal, QC H3G 1M8');

getAddressPosition('74 Rue De Galais, Boisbriand, QC J7G 1P7');