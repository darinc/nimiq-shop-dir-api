'use strict';

const Responses = require('../../utilities/responses');
const Models = require('./models');
const Handlers = require('./handlers');

module.exports = {
    method: 'GET',
    path: '/shops',
    options: {
        handler: Handlers.shops.get,
        description: 'Get list of shops',
        notes: 'Returns a paginated list of shops.  Supports query parameters limit= and offset=',
        tags: ['api', 'shops'],
        validate: {},
        plugins: {
            'hapi-swagger': {
                responses: Responses.responseGetModel(Models.shops)
            }
        }
    }
};
