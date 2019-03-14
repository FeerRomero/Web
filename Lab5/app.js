
const placeToSearch = 'Monterrey';

const weatherapp = require('./weatherapp.js')

weatherapp.getPlace(placeToSearch, function(error, response) {
	if(error) {
		console.log(error)
	} 
	else 
	{
		weatherapp.weatherInfo(response, function(error, response) {
			if(error) {
				console.log(error)
			}
			else
			{
				console.log(response)
			}
		})
	}
})