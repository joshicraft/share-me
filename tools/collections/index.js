const routes = require('../server/node_modules/express').Router()
const results = require('routes/result')


routes.use('/results', results)

module.exports = routes
