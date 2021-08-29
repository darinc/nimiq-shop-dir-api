'use strict';

// Follows recommendations from: https://inadarei.github.io/rfc-healthcheck/

//const Joi = require('joi');
const Responses = require('../../utilities/responses');
const Models = require('./models');
const Handlers = require('./handlers');

module.exports = {
    method: 'GET',
    path: '/shops',
    options: {
        handler: Handlers.shops.get,
        description: 'Get list of shops',
        notes: 'uses pagination',
        tags: ['api', 'shops'],
        validate: {},
        plugins: {
            'hapi-swagger': {
                responses: Responses.responseGetModel(Models.shops)
            }
        }
    }
};
