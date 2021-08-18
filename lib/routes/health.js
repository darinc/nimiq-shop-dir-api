'use strict';

const Unleash = require('unleash-client');

module.exports = {
    method: 'GET',
    path: '/health',
    options: {
        handler: (request, h) => {

            console.log('/health');
            if (!Unleash.isEnabled('health')) {
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
                },
            }
          }
    }
};
