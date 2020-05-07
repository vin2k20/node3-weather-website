const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoidmluZWV0MmsyMCIsImEiOiJjazlzcHVkcnMxN3gzM2Vwamk1dnpiNjQ4In0.FgkeqYUyPZroP8YYNSpJ-Q&limit=1'

    request({ url, json : true }, (error, response) =>{
        if(error){
            callback('Unable to connect to geolocation services.', undefined)
        }else if(response.body.features.length === 0){
            callback('Unable to find the given location. Try another location.', undefined)
        }else{
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode