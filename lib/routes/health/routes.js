'use strict';

// Follows recommendations from: https://inadarei.github.io/rfc-healthcheck/

//const Joi = require('joi');
const Flags = require('./flags').Flags;
//const Models = require('./models');

module.exports = {
    method: 'GET',
    path: '/health',
    options: {
        handler: (request, h) => {

            console.log('/health');
            if (!Flags.isEnabled('health')) {
                console.log('flagged as unhealthy');
                return h.response('NOT OK').code(503);
            }

            return 'OK';
        },
        description: 'Health check',
        notes: 'Returns "OK"',
        tags: ['api', 'health'],
        validate: {},
        plugins: {
            'hapi-swagger': {
                responses: {
                    '200': {
                        'description': 'OK'
                    },
                    '503': {
                        'description': 'Service Unavailable'
                    }
                }
            }
        }
    }
};
