'use strict';

const axios = require('axios');
const http = require('http');

const productList = require('./lib/products');
const scrapers = require('./lib/scrapers');
const slack = require('./lib/slack');

const stockStatuses = {};
let count = 0;

const checkStock = async () => {
    for (const product of productList) {
        try {
            const headers = typeof scrapers[product.site].headers === 'function'
                ? scrapers[product.site].headers()
                : scrapers[product.site].headers;

            const { data } = await axios.get(product.url, { headers });
            const instock = scrapers[product.site].stock(data);

            if (stockStatuses[product.url] === undefined) {
                stockStatuses[product.url] = false;
            }

            if (stockStatuses[product.url] !== instock) {
                await slack.notify(product, instock);
            }

            stockStatuses[product.url] = instock;
        } catch(err) {
            console.log(err)
        }
    }

    if (count === 120) {
        count = 0;
    }

    if (count === 0) {
        slack.healthcheck();
    }

    count++;
};

checkStock();
// Run every 30s
setInterval(checkStock, 30000);

const requestListener = function (req, res) {
  res.writeHead(200);
  res.end();
}

const server = http.createServer(requestListener);
server.listen(8080);
console.log('Listening on 8080')
