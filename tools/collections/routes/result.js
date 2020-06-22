
const routes = require('../../server/node_modules/express').Router()

let Result = require('../models/result.model')

// const scraper = require('../../server/scrapers/news/scraper')

routes.get('/', (req, res) => {
  Result.find({}, 'title link date', (err, data) => {
    if (err) res.send(err)
    else {
      res.send({
        results: data
      })
    }
  })
})

// routes.get('/scrape', (req, res) => {
//   // scraper.fire();
// });

routes.post('/add_result', (req, res) => {
  const newResult = new Result(req.body)
  newResult.save((err) => {
    if (err) res.send(err)
    else {
      res.send({
        success: true
      })
    }
  })
})

routes.put('/:id', (req, res) => {
  Result.update({ _id: req.params.id }, req.body, {}, (err) => {
    if (err) res.send(err)
    else {
      res.send({
        success: true
      })
    }
  })
})

routes.delete('/:id', (req, res) => {
  Result.remove({
    _id: req.params.id
  }, (err) => {
    if (err) res.send(err)
    else {
      res.send({
        success: true
      })
    }
  })
})

routes.get('/:id', (req, res) => {
  Result.findById(req.params.id, false, (err, data) => {
    if (err) res.send(err)
    else res.send(data)
  })
})

module.exports = routes
