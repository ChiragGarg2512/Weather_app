//const preq = require('postman-request')
const axios = require('axios')

const locate = (address, callback)=>{
    if(!address){
        callback("Enter Valid Location", undefined)
    }
    else {const url = `http://api.positionstack.com/v1/forward`
        axios.get(url, {
            params:{
                access_key: '1f542fed82829b16bb12650e514de845',
                query: address,
            }
        }).then(({data})=>{
            if(!data.error) {
                callback(undefined, {
                    latitude: data.data[0].latitude,
                    longitude: data.data[0].longitude,
                    location: data.data[0].label
                })
            }
            else {
                callback("Unable to find Location. Try again", undefined)
            }
        }).catch((error)=>{
            callback('Unable to connect to location services', undefined)
        })
    }
}

module.exports={
    locate
}


// preq({url:url, json: true}, (error, response)=>{
//     if(error){
//         callback('Unable to connect to location services', undefined)
//     }
//     else if( response.body.features == 0){
//         callback("Unable to find Location. Try again", undefined)
//     }
//     else{
//         callback(undefined, {
//             latitude: response.body.data[0].latitude,
//             longitude: response.body.data[0].longitude,
//             location: response.body.data[0].label
//         })
//     }
// })


// yargs.command({
//     command: "location",
//     Describe: "Enter Location",
//     builder:{
//         location:{
//             Describe:'Enter Location',
//             demandOption: true,
//             type: "string",
//             alias: 'l'
//         }
//     },
//     handler(argv){
//         locate(argv.location);
//     }
// })

// yargs.parse();