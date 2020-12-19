'use strict';

const axios = require('axios');

const webhook = process.env.SLACK_WEBHOOK;
const users = process.env.SLACK_USERS.split(',');

for (const index in users) {
    users[index] = `<@${users[index]}>`
}

module.exports = {
    notify: async (product) => {
        const body = {text: `${users.join(', ')} ${product.title} in stock at ${product.site} url: \`${product.url}\``};

        await axios({
            url: webhook,
            method: 'post',
            data: body,
            headers: {'Content-Type': 'application/json'}
        });
    },
    healthcheck: async (product) => {
        console.log('Sending healthcheck')
        const body = {text: 'bot is healthy'};

        await axios({
            url: webhook,
            method: 'post',
            data: body,
            headers: {'Content-Type': 'application/json'}
        });
    }
};
