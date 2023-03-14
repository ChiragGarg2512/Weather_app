const path = require('path')
const express = require('express')
const hbs = require('hbs')
const {locate} = require('./utils/locate')
const {forecast} = require('./utils/forecast')


// console.log(__dirname) //directory name
// console.log(__filename) // file name
// console.log(path.join(__dirname, '../public')) //path.join is an inbuilt node function

const app = express()

//Define paths for Express config
const public = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const ppaths = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(ppaths)

// Setup static directory to serve
app.use(express.static(public)) // express works through the application untill it finds a match. index.html matches the root url

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        Name: 'Chirag Garg'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'Work in Progress', 
        Name: 'Chirag Garg'
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        title : 'Help page',
        Name : 'Chirag Garg',
        Contact : 'Chiraggarg2512@gmail.com',
        Query : 'Write here'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({error: "No location provided"})
    }

    locate(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if(error){
            return res.send({ 
                error:"Error in finding location"
            })
        }
        
        // console.log('Error', error)
        // console.log('Data', data)
        forecast(latitude, longitude, (error, foredata) => {
            if(error){
                return res.send({error : error})
            }
            // console.log('Error', error)
            // console.log('Data', foredata)
            // res.render('index',{
            //     location: location,
            //     Weather: foredata[0],
            //     temp: foredata[1],
            //     precip: foredata[2],
            //     wind_dir: foredata[3],
            //     Name: "Chirag Garg"
            // })
            res.send({
                location: location,
                weather: foredata
            })
        })
    })

    // res.send({
    //     location: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products : []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('error', {
        title: 'Work in Progress', 
        Name: 'Chirag Garg',
        Content: "Help article not found."
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Work in Progress', 
        Name: 'Chirag Garg',
        Content: "Page not found."
    })
})

app.listen(2000, ()=>{
    console.log('Server is up on port 2000')
})