'use strict';

const Mock = require('./mock');

const APPJSON = 'application/json; charset=utf-8';

module.exports = {
    shops: {
        get: function (request, h) {

            // temporary for testing
            if ( Math.random() < 0.5 ) {

                return h.response(Mock.mock_get_shops_noauth)
                    .code(Mock.mock_get_shops_noauth.code)
                    .type(APPJSON);
            }

            return h.response(Mock.mock_get_shops_yesauth).code(200).type(APPJSON);
        }
    }
};
