"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _faker = require("faker");

var _faker2 = _interopRequireDefault(_faker);

var _result = require("../../../../collections/models/result.model");

var _result2 = _interopRequireDefault(_result);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get("/", function (req, res, next) {
    var categories = ["TV's", "Tablets", "Cars", "Pets", "Houses", "Education"];
    var icons = ["tv", "tablet", "directions_car", "pets", "home", "school"];

    var _loop = function _loop(i) {
        var data = {
            title: categories[i],
            icon: icons[i],
            description: _faker2.default.lorem.paragraph(),
            version: _faker2.default.commerce.price()
        };
        data._id = function () {
            var t = void 0,
                d = void 0;
            t = data.title.replace(/[^a-z0-9+]/gi, "");
            d = data.description.replace(/[^a-z0-9+]/gi, "");
            return t.substr(0, t.length) + d.substr(0, 10);
        }();
        var cat = new Category(data);
        cat.save();
    };

    for (var i = 0; i < categories.length; i++) {
        _loop(i);
    }
    res.send({ success: true });
});

router.delete("/", function (req, res, next) {
    try {
        Category.collection.drop();
    } catch (e) {
        console.log(e);
    }
    res.send({ success: true });
});

exports.default = router;
//# sourceMappingURL=seeder.js.map