'use strict';

const cheerio = require('cheerio');

module.exports = {
    stock: (source) => {
        const $ = cheerio.load(source);
        const inventory = $('.product-inventory').text();
        const soldby = $('.product-seller strong').text();

        if(/In stock/.test(inventory) && /Newegg/.test(soldby)){
            return true;
        }

        return false;
    }
};
