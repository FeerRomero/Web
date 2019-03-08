
const credentials = require('./credentials.js')
const request = require('request')

const omdbMovie = function( title, callback ) {
	const url = 'http://www.omdbapi.com/?t=' + title + '&apikey=' + credentials.apikey

	request({url: url, json: true}, function(error, response) {
	const cuerpo = response.body;
	const data = {
		titulo: cuerpo.Title,
		plot: cuerpo.Plot,
		rating: cuerpo.Ratings[0].Value,
		seasons: cuerpo.totalSeasons
	}
	})
}


const omdbSeason = function(title, seasonNo) {
	const url = 'http://www.omdbapi.com/?t=' + title + 
	'&Season=' + seasonNo + '&apikey=' + credentials.apikey
	request({url: url, json: true}, function(error, response) {
		console.log(response.body)
	})
}


module.exports = {
	omdbMovie: omdbMovie,
	omdbSeason: omdbSeason
}



const funcEx = function(name, age, email) {
	const ejemplo = {
		name,
		userAge: age,
		email: email
	}
}
