'use strict';

const cheerio = require('cheerio');
const btoa = require('btoa');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

module.exports = {
    stock: (source) => {
        const $ = cheerio.load(source);
        const addTest = $('.add-to-cart').text();

        if(!/Temporarily not available/.test(addTest)) {
            return true;
        }

        return false;
    },
    headers: () => ({
        // 'authority': 'www.adorama.com',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
        'Accept': '*/*',
        referer: 'http://www.google.com/',
        'cookie': `_px2=${btoa(JSON.stringify({
            u: uuidv4(),
            v: 'e44ecdff-3ab3-11eb-bfb2-0242ac120010',
            t: Date.now(),
            h: crypto.randomBytes(64).toString('hex'),
        }))};`
    })
};
