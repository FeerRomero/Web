const credentials = require(`./credentials.js`);
const request = require('request')

//Setup de mapbox, geocoding service
const mbxStyles = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingService = mbxStyles({ accessToken: credentials.MAPBOX_TOKEN})

//Request a darksky la info del clima
const weatherInfo = function (coordinates, callback) {
	const url = 'https://api.darksky.net/forecast/' + credentials.DARK_SKY_SECRET_KEY + 
  	'/' + coordinates[1] + ',' +coordinates[0] + '?lang=es&units=si'
  	
  	request({ url, json: true }, function(error, dataWeather ) {
  		if(error){
  			callback('Servicio no disponible', undefined)
  		}
  		else if(dataWeather.body=='Forbidden\n' || dataWeather.body=='Not Found\n')
  		{
			callback('La key de Darksky es incorrecta.', undefined)
  		}
  		else
  		{
  			const summary = dataWeather.body["hourly"]["summary"];
			const current = dataWeather.body["currently"];
			const temp = Math.round(current["temperature"]);
			const precipProb = current["precipProbability"];
			const strDisplay = `${summary} Actualmente esta a ${temp}°C. Hay ${precipProb}% de posibilidad de lluvia.`
			callback(undefined, strDisplay)
  		}
  	})
}


//Request a mapbox para obtener la longitud y latitud de la ciudad
const getPlace = function (placeToSearch, callback) {
	geocodingService.forwardGeocode({
	query: placeToSearch
	})
	.send()
	.then(response => {
		if(response.body.features.length == 0)
		{
			callback('No se encontraron resultados para la búsqueda.', undefined)
		}
		else
		{
			const dataJSON = response.body.features[0];
			const placeCoordinates = dataJSON.center;
			callback(undefined, placeCoordinates);
		}
	},
	error => {
		if(error.message == "Not Authorized - Invalid Token") {
			callback('Token inválido', undefined)
		}
		else
		{
			callback('Servicio no disponible.', undefined)
		}
	});
}

module.exports = {
	weatherInfo: weatherInfo,
	getPlace: getPlace
}