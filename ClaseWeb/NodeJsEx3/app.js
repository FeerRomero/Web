const omdb = require('./omdb.js')

//const title = "Die Hard"
const title = 'Game of thrones'

omdb.omdbMovie(title)

omdb.omdbSeason(title, 1)
