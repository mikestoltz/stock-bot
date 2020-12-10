'use strict';

const cheerio = require('cheerio');

module.exports = {
    stock: (source) => {
        const $ = cheerio.load(source);
        const addTest = $('[data-selenium=addToCartButton]').text();

        if(/Add to Cart/.test(addTest)) {
            return true;
        }

        return false;
    }
};
