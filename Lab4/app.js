
const credentials = require(`./credentials.js`);

const placeToSearch = 'Monterrey';

//Setup de mapbox, geocoding service
const mbxStyles = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingService = mbxStyles({ accessToken: credentials.MAPBOX_TOKEN})

//Setup de darksky
const DarkSky = require('dark-sky')
const darksky = new DarkSky(credentials.DARK_SKY_SECRET_KEY) // Your API KEY can be hardcoded, but I recommend setting it as an env variable.


//Request a darksky la info del clima
function weatherInfo(coordinates) {
	darksky
		.latitude(coordinates[1])
		.longitude(coordinates[0])
		.units(`si`)
		.language(`es`)
		.get()
		.then( function (dataWeather) {
			const summary = dataWeather["hourly"]["summary"];
			const current = dataWeather["currently"];
			const temp = Math.round(current["temperature"]);
			const precipProb = current["precipProbability"];
			const strDisplay = `${summary} Actualmente esta a ${temp}°C. Hay ${precipProb}% de posibilidad de lluvia.`
			console.log(strDisplay)
		})
		.catch(console.log)
}


//Request a mapbox para obtener la longitud y latitud de la ciudad
geocodingService.forwardGeocode({
	query: placeToSearch
})
.send()
.then(response => {
		const dataJSON = response.body.features[0];
		const placeCoordinates = dataJSON.center;
		weatherInfo(placeCoordinates);
	},
	error => {
		console.log(`ERROR`)
	});

