const mongoose = require('mongoose')
//Insert connectionURL
const connectionURL = 'mongodb+srv://ferdav:<password>a@cluster0-n1oxt.mongodb.net/lab7?retryWrites=true'

mongoose.set('useFindAndModify', false);

mongoose.connect( connectionURL, {
	useNewUrlParser : true,
	useCreateIndex: true
})
