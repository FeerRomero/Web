const express = require('express')
require('./db/mongoose.js')

const GotCharacter = require('./models/gotCharacter.js')
const app = express()

const port = process.env.PORT || 3000

//Parsea todo lo que llegue a JSON
app.use(express.json())

app.post('/persons', function(req, res) {
	const gotCharacter = new GotCharacter(req.body) 
	gotCharacter.save().then(function() {
		return res.send(gotCharacter)
	}).catch(function(error) {
		return res.status(400).send(error)
	})
})

app.get('/persons', function(req, res) {
	GotCharacter.find({}).then(function(characters) {
		if(!characters) {
			return res.status(404).send(characters)
		}
		return res.status(200).send(characters)
	}).catch(function(error) {
		return res.status(500).send(error)
	})
})

app.get('/persons/:id', function(req, res) {
	const _id = req.params.id
	GotCharacter.findById(_id).then(function(character) {
		if(!character) {
			return res.status(404).send(character)
		}
		return res.status(200).send(character)
	}).catch(function(error) {
		return res.status(500).send(error)
	})
})

app.patch('/persons/:id', function(req, res) {
	const _id = req.params.id
	const updates = Object.keys(req.body)
	const allowedUpdates = ['name', 'mother', 'father']
	const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
	
	if(!isValidUpdate) {
		return res.status(400).send({
			error: 'Not valid modifiable keys, only valid keys are: ' + allowedUpdates
		})
	}

	const query = {_id: _id}
	GotCharacter.findOneAndUpdate(query, req.body).then(function(character) {
		if(!character) {
			return res.status(404).send()
		}
		return res.status(200).send(character)
	}).catch(function(error) {
		return res.status(500).send(error)
	})
})


app.delete('/persons/:id', function(req, res) {
	const _id = req.params.id
	const query = {_id: _id}
	GotCharacter.findOneAndDelete(query).then(function(character) {
		if(!character) {
			return res.status(404).send(character)
		}
		return res.status(200).send(character)
	}).catch(function(error) {
		return res.status(500).send(error)
	})
})


app.listen(port, function() {
	console.log('Server up and running in port ' + port)
})