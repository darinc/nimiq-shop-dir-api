'use strict';

// Follows recommendations from: https://inadarei.github.io/rfc-healthcheck/

//const Joi = require('joi');
const Responses = require('../../utilities/responses');
const Models = require('./models');
const Handlers = require('./handlers');

module.exports = {
    method: 'GET',
    path: '/health',
    options: {
        handler: Handlers.health.get,
        description: 'Health check',
        notes: 'Returns "OK"',
        tags: ['api', 'health'],
        validate: {},
        plugins: {
            'hapi-swagger': {
                responses: Responses.responseGetModel(Models.status)
            }
        }
    }
};
