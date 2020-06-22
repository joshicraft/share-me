"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _result = require("../../../collections/routes/result");

var _result2 = _interopRequireDefault(_result);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import scraper from '../../scrapers'

var routes = _express2.default.Router();

routes.use("/results", _result2.default);

exports.default = routes;
//# sourceMappingURL=index.js.map