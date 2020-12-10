'use strict';

const cheerio = require('cheerio');

module.exports = {
    stock: (source) => {
        const $ = cheerio.load(source);
        const addTest = $('.fulfillment-add-to-cart-button').text();

        if(!/Sold Out|Coming Soon/.test(addTest)) {
            return true;
        }

        return false;
    },
    headers: {
        'Accept': '*/*',
        'Host': 'www.bestbuy.com'
    }
};
