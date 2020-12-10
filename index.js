'use strict';

const axios = require('axios');

const productList = require('./lib/products');
const scrapers = require('./lib/scrapers');
const slack = require('./lib/slack');

let count = 0;

const checkStock = async () => {
    for (const product of productList) {
        const headers = typeof scrapers[product.site].headers === 'function'
            ? scrapers[product.site].headers()
            : scrapers[product.site].headers;

        const { data } = await axios.get(product.url, { headers });
        const instock = scrapers[product.site].stock(data);

        if (instock) {
            await slack.notify(product);
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
