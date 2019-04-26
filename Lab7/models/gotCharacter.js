const mongoose = require('mongoose')

const GotCharacter = mongoose.model('GotCharacter', {
	name: {
		type: String,
		//required: true
	},
	age: {
		type: Number,
		//required: true
	},
	born: {
		type: String,
		//required: true
	},
	timeline: {
		type: String,
		//required: true
	},
	alliegance: {
		type: [String],
		//required: true
	},
	playedBy: {
		type: String,
		//required: true
	},
	titles: {
		type: [String],
		//required: true
	},
	father: {
		type: String,
		//required: true
	},
	mother: {
		type: String,
		//required: true
	},
	spouse: {
		type: String,
		//required: true
	}
})

module.exports = GotCharacter