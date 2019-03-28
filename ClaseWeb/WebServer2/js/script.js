console.log("Aqui vamos a llamar a nuestro mini websever")

/*
let searchBtn = document.getElementById("searchBtn")

searchBtn.addEventListener("click", function () {
	let searchTerm = document.getElementById("searchTerm").value
	fetch('http://localhost:3000/omdb?search=' + searchTerm).then(function(response) {		
		response.json().then(function (data) {
			if( data.error ) {
				console.log(data.error)
			} else {
				console.log(data)
				console.log(data.title)
				console.log(data.plot)
			}
		})
	})

})
*/

${"#searchBtn"}.click(function() {
	let searchTerm = $("#searchTerm").val()
	$.ajax({
		url: 'http://localhost:3000/omdb?search=' + searchTerm,
		type: 'GET',
		dataType: 'json',
		success: function (data) {
			if( data.error ) {
				console.log(data.error)
			} else {
				console.log(data)
				console.log(data.title)
				console.log(data.plot)
			}
		},
		error: function (error) {
			console.log(error)
		}
	})

})

