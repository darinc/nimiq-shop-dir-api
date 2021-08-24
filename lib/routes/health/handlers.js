'use strict';

const Flags = require('../../utilities/featureflags');

const APPJSON = 'application/json; charset=utf-8';

module.exports = {
    health: {
        get: function (request, h) {

            console.log('/health');
            if ( !Flags.getToggleDefaultTrue('health') ) {

                console.log('flagged as unhealthy');

                return h.response({ status: 'fail' }).code(503);
            }

            return h.response({ status: 'pass' }).code(200).type(APPJSON);
        }
    }
};
