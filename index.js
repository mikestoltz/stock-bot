'use strict';

const fetch = require('node-fetch');

const productList = require('./lib/products');
const scrapers = require('./lib/scrapers');
const slack = require('./lib/slack');

let count = 0;

const checkStock = async () => {
    for(const product of productList) {
        const response = await fetch(product.url, { headers: scrapers[product.site].headers });
        const source = await response.text();
        const instock = scrapers[product.site].stock(source);

        if(instock) {
            await slack.notify(product);
        }
    }

    if (count === 120) {
        slack.healthcheck();
        count = 0;
    }

    count++;
};

checkStock();
// Run every 30s
setInterval(checkStock, 30000);
