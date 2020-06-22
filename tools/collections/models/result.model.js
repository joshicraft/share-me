let mongoose = require('../../server/node_modules/mongoose')

const resultSchema = new mongoose.Schema({
  link: String,
  title: String,
  date: String,
  type: String
});

const Result = mongoose.model('Result', resultSchema, 'result');

module.exports = Result
