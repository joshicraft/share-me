const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');


const WEBSITES = require('./config/news-sites')
const COMPANIES = require('./config/companies')

const Result = require('../../../collections/models/result.model')

// const puppeteer = require('puppeteer');

// const MONGO_USER = 'josh';
// const MONGO_PASSWORD = 'CmbD6RmSPcSoBoy4';
// const MONGO_CLUSTER = 'Cluster0';
// const MONGO_ADDRESS = "mongodb+srv://josh:" + MONGO_PASSWORD + "@cluster0-lppyc.mongodb.net/" + MONGO_CLUSTER + "?retryWrites=true&w=majority";
let resultCollection;



// mongoose.connect(MONGO_ADDRESS, {useNewUrlParser: true});







let results = [];

let removeUselessWords = function(txt) {
    const uselessWordsArray =
        [
            "ltd.", "ltd"
        ];

    let expStr = uselessWordsArray.join("|");
    return txt.replace(new RegExp('\\b(' + expStr + ')\\b', 'gi'), ' ')
        .replace(/\s{2,}/g, ' ');
};

function getLink(article, website){
    let link = website.getLink ? website.getLink(article) : article.attr('href')
    if(typeof link !== "string"){
        // console.log('no link found');
        return ""
    }
    if(link.indexOf('http') === -1) {
        if (website.stripPath) {
            website.url = website.url.replace(website.stripPath, '')
        }
        link = website.url + link
    }
    return link
}

async function find (name, query, cb) {
    mongoose.connection.db.collection(name, function(err, collection){
        collection.find({}).toArray(function(err, data){
            resultCollection = data;
            // if(cb){
            //     cb()
            // }
        })
    });
}
function parse(website) {
    return new Promise(resolve => {
        axios(website.url)
            .then(response => {
                const html = response.data;
                const $ = cheerio.load(html);
                const articles = $(website.selector).map(function() {
                    return $(this);
                }).toArray();
                COMPANIES.forEach(company => {
                    let names = [removeUselessWords(company.name)];
                    if(company.otherNames){
                        names = names.concat(company.otherNames)
                    }
                    names.forEach(name => {
                        articles.forEach(article => {
                            let text = website.getText ? website.getText(article) : article.text();
                            let link = getLink(article, website);
                            let date;
                            let result;
                            text = text.toLowerCase();
                            name = name.toLowerCase();

                            if(results.find(result => {
                                return result.title === text
                            }) || text.indexOf(name) === -1) {
                                return
                            }
                            if(website.getDate){
                                date = website.getDate(article)
                            }

                            result = {title: text, link: link, date: date, type: 'article'};
                            // mongoose.connection.db.collection('result').update(
                            //     {"title": text},
                            //     { $setOnInsert: result},
                            //     { upsert: true }
                            // )
                            console.log(result)
                            // const dbResult = new Result(result);
                            // dbResult.save()
                            results.push(result)
                        })
                    })

                });
            })
            .catch(console.error)
            .finally(resolve)
    })
}

async function fireScraper() {

    for (let i = 0; i < WEBSITES.length; i++) {

        const url = WEBSITES[i];
        await parse(url);
        // await Wait();

    }
    // console.log(resultCollection)
}
        //     const browser = await puppeteer.launch({ headless: false });
        //     const page = await browser.newPage();
        //     await page.goto(`${url}`, { waitUntil: 'networkidle2' });
        //     const html = page.content();
        //



module.exports = {
    fire: async function(){
        // console.log('Scrape me');
        // const db = mongoose.connection;

        await find('result', false)
        await fireScraper()
        // db.on('error', console.error.bind(console, 'connection error:'));
        // db.once('open', async function() {
        //     // we're connected!
        //
        //
        //     // console.log(resultCollection)
        //     // fireScraper();
        //
        // });

    }
}


