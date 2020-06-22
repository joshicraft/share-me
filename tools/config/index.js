// const dotenv = require('dotenv');
//
// dotenv.config();
// // module.exports = {
// //   endpoint: process.env.API_URL,
// //   masterKey: process.env.API_KEY,
// //   port: process.env.PORT
// // };
import dotenv from 'dotenv'
dotenv.config()
// console.log(process.env)
export default {
  client: {
    port: 8080
  },
  server: {
    dbTestURL: 'mongodb+srv://josh2:' + process.env.MONGO_PASSWORD + '@cluster0-lppyc.mongodb.net/' + process.env.MONGO_CLUSTER + '?retryWrites=true&w=majority',
    port: 8090
  }
}
