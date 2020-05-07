const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=1fd282d0d2067c4bd03e993512817583'
    request({ url, json : true }, (error, {body}) =>{
        if(error){
            callback('Unable to connect to weather service.', undefined)
        }else if(body.message){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined,{description: body.weather[0].description, temperature: body.main.temp-273.15, humidity: body.main.humidity, feels: body.main.feels_like-273.15, min: body.main.temp_min-273.15, max: body.main.temp_max-273.15})
        }
    })
}

module.exports = forecast