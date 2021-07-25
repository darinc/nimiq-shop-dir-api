'use strict';

module.exports = {
    method: 'GET',
    path: '/health',
    options: {
        handler: (request) => {
            console.log('/health');
            return 'OK';
        },
        description: 'Health check',
        notes: 'Returns "OK"',
        tags: ['api', 'health']
    }
};