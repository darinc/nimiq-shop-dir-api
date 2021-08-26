'use strict';

const APPJSON = 'application/json; charset=utf-8';
//const Joi = require('joi');
const Hoek = require('@hapi/hoek');
const Boom = require('@hapi/boom');

const ResponseModels = require('./responseModels');

const buildResponseModel = function (responseList) {

    let i;
    let len;
    const responses = {};

    for (i = 0, len = responseList.length; i < len; i = i + 1) {

        const response = responseList[i];
        if (typeof response === 'object') {
            Hoek.merge(responses, response);
        }
        else {
            switch (response) {
                case 201:
                    responses['201'] = {
                        description: 'Created',
                        schema: ResponseModels.successModel201
                    };
                    break;
                case 400:
                    responses['400'] = {
                        description: 'Bad Request',
                        schema: ResponseModels.errorModel400
                    };
                    break;
                case 401:
                    responses['401'] = {
                        description: 'Unauthorized',
                        schema: ResponseModels.errorModel401
                    };
                    break;
                case 403:
                    responses['403'] = {
                        description: 'Forbidden',
                        schema: ResponseModels.errorModel403
                    };
                    break;
                case 404:
                    responses['404'] = {
                        description: 'Not Found',
                        schema: ResponseModels.errorModel404
                    };
                    break;
                case 500:
                    responses['500'] = {
                        description: 'Internal Server Error',
                        schema: ResponseModels.errorModel500
                    };
                    break;
                case 501:
                    responses['501'] = {
                        description: 'Not Implemented',
                        schema: ResponseModels.errorModel501
                    };
                case 503:
                    responses['503'] = {
                        description: 'Service Unavailable',
                        schema: ResponseModels.errorModel503
                    };
            }
        }
    }

    return responses;
};

module.exports = {
    buildResponseModel,
    renderJSON: function (request, reply, error, result) {

        if (error) {
            if (typeof error === 'string') {
                reply(Boom.badrequest(error));
            }
            else {
                reply(error);
            }
        }
        else {
            reply(result).type(APPJSON);
        }
    },
    responseGetModel: function (model) {

        const success = {
            200: {
                description: 'Success',
                schema: model
            }
        };
        return buildResponseModel([success, 400, 401, 403, 404, 500, 503]);
    }
};
