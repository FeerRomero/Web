const path = require('path')
const express = require('express')
const weatherapp = require('./weatherapp.js')

const app = express()

const publicDir = path.join(__dirname, 'public')

app.use(express.static(publicDir))

app.get('/', function(req, res) {
	res.send('<h1>Web Weather App</h1>')
})

app.get('/weather', function(req, res){
	if(!req.query.search) {
		return res.send({
			error: "Proporcionar un lugar a buscar."
		})
	}
	let placeToSearch = req.query.search
	weatherapp.getPlace(placeToSearch, function(error, response) {
		console.log('Lugar a buscar: ' + placeToSearch)
		if(error) {
			return res.send( {
				error: error
			})
		} 
		else 
		{
			weatherapp.weatherInfo(response, function(error, response) {
				if(error) {
					return res.send({
						error: error
					})
				}
				else
				{
					return res.send({
						location: placeToSearch,
						weather: response
					})
				}
			})
		}
	})
})

app.get('*', function(req, res){
	res.send({
		error: 'Esta ruta no existe.'
	})
})

app.listen('3000', function() {
	console.log('up and running')
})