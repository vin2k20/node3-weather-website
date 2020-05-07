const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handle bar engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Vineet'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me',
        name: 'Vineet'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'example message',
        name: 'Vineet'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({error: 'Please provide an address.'})
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            
            res.send({
                description: forecastData.description,
                temperature: forecastData.temperature,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req,res) => {
    res.render('404error', {
        title: 'Help is not here go back one of this ',
        name: 'Vineet',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req,res) => {
    res.render('404error', {
        title: 'I think you are lost.',
        name: 'Vineet',
        errorMessage: '404 Page not found.'
    })
})

//app.com
//app.com/help
//app.com/about

app.listen(3000, () => {
    console.log('Serveris up on port 3000')
})