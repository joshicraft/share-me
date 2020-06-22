import express from "express"
import results from "../../../collections/routes/result"
// import scraper from '../../scrapers'

let routes = express.Router();

routes.use("/results", results)


export default routes

