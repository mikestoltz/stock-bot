'use strict';

const fetch = require('node-fetch');

const webhook = process.env.SLACK_WEBHOOK;
const users = process.env.SLACK_USERS.split(',');

for (const index in users) {
    users[index] = `<@${users[index]}>`
}

module.exports = {
    notify: async (product) => {
        const body = {text: `${users.join(', ')} ${product.title} in stock at ${product.site} url: \`${product.url}\``};

        await fetch(webhook, {
            method: 'post',
            body: JSON.stringify(body),
            headers: {'Content-Type': 'application/json'}
        });
    },
    healthcheck: async (product) => {
        const body = {text: 'bot is healthy'};

        await fetch(webhook, {
            method: 'post',
            body: JSON.stringify(body),
            headers: {'Content-Type': 'application/json'}
        });
    }
};
