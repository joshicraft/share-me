'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../../config/index');

var _index2 = _interopRequireDefault(_index);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import seeder from './routes/seeder/seeder'

/*
Mongo API KEY
API Key:02698a63-6c54-45cd-bea7-336ca4064388
Description:Test Mongo Atlas API KEY
 */

exports.default = function (cfg) {
  var app = void 0,
      server = void 0;
  cfg = cfg || {};
  var disconnect = function disconnect() {
    console.log('\nServer Shut Down');
    return server.close();
  };
  var events = function events() {
    // CONNECTION EVENTS

    process.on('SIGTERM', function (e) {
      console.log('SIGTERM' + e);
      disconnect();
    });

    /*
      Most server errors occur here
     */
    process.on('uncaughtException', function (e) {
      // console.log("uncaughtException" + e)
      // disconnect()
    });

    // When successfully connected to db
    _mongoose2.default.connection.on('connected', function () {
      console.log('Mongoose default connection open');
    });

    // If the connection throws an error
    _mongoose2.default.connection.on('error', function (err) {
      console.log('Mongoose default connection error: ' + err);
    });

    // When the connection is disconnected
    _mongoose2.default.connection.on('disconnected', function () {
      console.log('Mongoose default connection disconnected');
    });

    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', function () {
      _mongoose2.default.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        // process.exit(0);
      });
    });
  };

  function serve(done) {
    console.log('Server Listening on port: ' + _index2.default.server.port);
    // console.log(this.collection('result'))

    return app.listen(_index2.default.server.port);
    // return server = app.listen(config.server.port)

    /*
        Below is code to detect if port is running. Will likely need to address this at a later date.
        Some sort of server management for tests might be good here so that when running tests or development we
        wont need to manual spin up servers and use prexisiting ones. The same should be done for the client dev server.
       */
    // return detect(config.server.port)
    //   .then(_port => {
    //     if (config.server.port === _port) {
    //       return server = app.listen(config.server.port)
    //     } else {
    //       console.log(`port: ${config.server.port} was occupied, try port: ${_port}`);
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }

  var connect = function connect(done) {
    events();

    return _mongoose2.default.connect(_index2.default.server.dbTestURL, {
      useNewUrlParser: true
    }).then(function (done) {
      return serve(done);
    });
  };

  return {
    db: _mongoose2.default.connection,
    collection: function collection(_collection) {
      return _mongoose2.default.connection.db.collection(_collection);
    },
    close: function close(done) {
      return disconnect(done);
    },
    start: function start(done) {
      app = (0, _express2.default)();
      app.use((0, _morgan2.default)('combined'));
      app.use(_bodyParser2.default.json());
      app.use((0, _cors2.default)());
      app.use('/', _routes2.default);
      // app.use('/seeder', seeder)
      connect(done);
    }
  };
};
//# sourceMappingURL=app.js.map