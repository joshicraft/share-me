import express from "express"
import faker from "faker"
import Result from "../../../../collections/models/result.model"

let router = express.Router();

router.get("/", function (req, res, next) {
    const categories = ["TV's", "Tablets", "Cars", "Pets", "Houses", "Education"];
    const icons = ["tv", "tablet", "directions_car", "pets", "home", "school"];
    for (let i = 0; i < categories.length; i++) {
        let data = {
            title: categories[i],
            icon: icons[i],
            description: faker.lorem.paragraph(),
            version: faker.commerce.price()
        }
        data._id = function () {
            let t, d;
            t = data.title.replace(/[^a-z0-9+]/gi, "")
            d = data.description.replace(/[^a-z0-9+]/gi, "")
            return t.substr(0, t.length) + d.substr(0, 10)
        }()
        let cat = new Category(data);
        cat.save();
    }
    res.send({success: true})
});


router.delete("/", function (req, res, next) {
    try {
        Category.collection.drop()

    } catch (e) {
        console.log(e)
    }
    res.send({success: true})

});


export default router
