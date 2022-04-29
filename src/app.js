const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode  = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.port || 3000

// Define paths for Express configuration
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('views',viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// Setup static directory
app.use( express.static(publicDirPath) )

app.get('', (req,res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Claude Duplissey'
  })
})

app.get('/about', (req,res) => {
  res.render('about', {
      title: 'About Me',
      name: 'Claude Duplissey'
  })
})

app.get('/help', (req,res) => {
  res.render('help', {
      title: 'Unexpected errors',
      name: 'Claude Duplissey',
      helpText: 'Sometimes this can be helpful. Other times this is not worth the paper it is written on.'
  })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
      return res.send({
         error: 'You must provide an address!'
      })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {} ) => {
        if (error) {
            return res.send({error})
        }
        //  forecast(geoData.longitude, geoData.latitude, (error, forecastData) => {
        forecast( longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
              forecast: forecastData,
              location,
              address: req.query.address
            })
        })
 
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search)  {
        return res.send({
          error: 'You must provide a search term'
        })
    }
    res.send({
      products: []
    })
})

app.get('/help/*', (req,res) => {
  res.render('404', {
      title: '404',
      name: 'Claude Duplissey',
      errorMessage: 'Help article not found.'
  })
})

app.get('*', (req, res) => {
  res.render('404', { title: '404',
                      name: 'Claude Duplissey',
                      errorMessage: 'Page not found'
                    })
})

// Start server
app.listen(port, () => {
   console.log('Server is up on port ' + port)
})
