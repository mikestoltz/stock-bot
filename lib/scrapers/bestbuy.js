'use strict';

const cheerio = require('cheerio');

module.exports = {
    stock: (source) => {
        const $ = cheerio.load(source);
        const addTest = $('.fulfillment-add-to-cart-button').text();
        console.log(addTest)

        if(!/Sold Out/.test(addTest)) {
            return true;
        }

        return false;
    },
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
        'Accept': '*/*',
        'Host': 'www.bestbuy.com'
    }
};
