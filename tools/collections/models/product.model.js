const mongoose = require('../../server/node_modules/mongoose')

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  _id: String,
  title: String,
  price: Number,
  category: String,
  image: String,
  description: String
});

module.exports = mongoose.model('Product', ProductSchema);
