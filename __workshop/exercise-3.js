// Exercise 3 - `getAddressPosition`
// ---------------------------------
// 1. Go to https://darksky.net/dev/ and read the documentation
// 2. Signup and get a free API key
// 3. Complete the code of the function.
// The `position` parameter is an object with `lat` and `lng`.
// 4. Make sure your function only returns a `Promise` for the current temperature
// (a number) and nothing else

// Given a position (latitude and longitude), returns the position

const request = require('request-promise');
const opencage = require('opencage-api-client');

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



function getCurrentTemperatureAtPosition(address) {
    // GET https://api.darksky.net/forecast/0123456789abcdef9876543210fedcba/42.3601,-71.0589
    return getAddressPosition(address)
        .then (function(position) {
            console.log(address);
            console.log(position);
            console.log(position.lat);
            console.log(position.lng);
            return request(`https://api.darksky.net/forecast/b95294cb9e1ca1ae897d194cd6b0f905/${position.lat},${position.lng}`)
                .then(data => {
                    const tooMuchInfo = JSON.parse(data);
                    // console.log(tooMuchInfo.currently.temperature);     // this is the temp in F
                    return (tooMuchInfo.currently.temperature-32)*5/9;  // returning temp in C (non-retard units)
                })
                .then(data => {
                console.log(data);
                })
                .catch(error => console.log('error', error.message));
        });
}

getCurrentTemperatureAtPosition('74 Rue De Galais, Boisbriand, QC J7G 1P7');

// getAddressPosition('74 Rue De Galais, Boisbriand, QC J7G 1P7');



