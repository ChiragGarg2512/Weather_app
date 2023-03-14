//const preq = require('postman-request')
const axios = require('axios')
const chlk = require('chalk')

const forecast = (latitude, longitude, callback) => {

    let url = `http://api.weatherstack.com/current`
    
    axios.get(url, {
        params:{
            access_key: '0c364b4d7bacc65ed66d9c1797a81a7a',
            query: latitude + ',' + longitude,
            units:'m'
        }

    }).then(({data})=>{
        if(!data.error) {
            callback(undefined, [data.current.weather_descriptions[0], data.current.temperature, data.current.precip, data.current.wind_dir ])
            //console.log(`${chlk.yellow(response.data.current.weather_descriptions[0])}. It is currently ${chlk.green(response.data.current.temperature)} degrees out. It feels like ${chlk.red(response.data.current.feelslike)} degrees out.`)
        }
        else {
            callback("Unable to find location. Try Again", undefined)
        }
    }).catch((error)=>{
        callback("Unable to connect to Location services", undefined)
    })
    
}

module.exports={
    forecast
}







// preq({ url: url, json: true }, (error, response) => {
//     if(error){
//         callback('Unable to connect to location services', undefined)
//     }
//     else if(response.body.current == 0){
//         callback("Unable to find Location. Try again", undefined)
//     }
//     else{
//         callback(undefined, {
//             Mohol: response.body.current.weather_descriptions[0],
//             Tapman: response.body.current.temperature,
//         })

//     }
// })