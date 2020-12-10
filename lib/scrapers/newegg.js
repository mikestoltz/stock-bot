'use strict';

const cheerio = require('cheerio');

module.exports = {
    stock: (source) => {
        const $ = cheerio.load(source);
        const inventory = $('.product-inventory').text();

        if(/In stock/.test(inventory)){
            return true;
        }

        return false;
    }
};
