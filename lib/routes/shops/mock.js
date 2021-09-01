'use strict';

const Errors = require('../../utilities/errors');

const mock_get_shops_noauth = Errors.unauthorizedError('shops');

// Not implemented yet more detailed example
const mock_get_shops_yesauth = [
    {
        id: 22051,
        shortcode: 'marioscookies',
        name: 'Mario\'s Cookies',
        summary: 'Premier Italian Cookies',
        description: 'Online retailer delivering the finest Italian cookies to Italy!',
        active: true,
        created: '2021-08-20 15:55:10',
        updated: '2021-08-29 09:01:30'
    }
];

module.exports = {
    mock_get_shops_noauth,
    mock_get_shops_yesauth
};
