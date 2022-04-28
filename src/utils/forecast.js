const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url='http://api.weatherstack.com/current?access_key=33ce5d04aef31f6daff20abe83347b9f&query=' + latitude
               + ',' + longitude + '&units=f'
//  request({ url: url, json: true}, (error, response) => {
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
//      } else if (response.body.error) {
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
//          callback(undefined, response.body.current.weather_descriptions[0] + ". It is currently "
//                        + response.body.current.temperature + " degrees out."
//                        + " It feels like " + response.body.current.feelslike + " degrees out")
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently "
                          + body.current.temperature + " degrees out."
                          + " It feels like " + body.current.feelslike + " degrees out")
        }
    })
}

module.exports = forecast
