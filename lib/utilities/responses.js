'use strict';

const APPJSON = 'application/json; charset=utf-8';
const Joi = require('joi');
const Hoek = require('@hapi/hoek');
const Boom = require('@hapi/boom');

/*
Example error message from(https://aglowiditsolutions.com/blog/rest-api-best-practices/#section3):
{
    "error": "auth-0001",
    "message": "Incorrect username and password",
    "detail": "Ensure that the username and password included in the request are correct"
}
*/
const errorModel500 = Joi.object({
    type: Joi.string().label('type').required().example('error'),
    code: Joi.string().label('code').required().example('500'),
    ref: Joi.string().label('ref').required().example('server-0001'),
    id: Joi.string().label('identifier').required().example('9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'),
    message: Joi.string().label('message').example('Incorrect username and password'),
    detail: Joi.string().label('detail').example('Ensure that the username and password included in the request are correct')
});

const errorModel = Joi.object({
    type: Joi.string().label('type').required().example('error'),
    code: Joi.string().label('code').required().example('503'),
    ref: Joi.string().label('ref').required().example('server-0002'),
    id: Joi.string().label('identifier').required().example('9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'),
    message: Joi.string().label('message').example('Service Unavailable'),
    detail: Joi.string().label('detail').example('Service is temporarility unavailable, please try again')
});

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
                        description: 'Created'
                    };
                    break;
                case 400:
                    responses['400'] = {
                        description: 'Bad Request'
                    };
                    break;
                case 401:
                    responses['401'] = {
                        description: 'Unauthorized'
                    };
                    break;
                case 403:
                    responses['403'] = {
                        description: 'Forbidden'
                    };
                    break;
                case 404:
                    responses['404'] = {
                        description: 'Not Found'
                    };
                    break;
                case 500:
                    responses['500'] = {
                        description: 'Internal Server Error',
                        schema: errorModel
                    };
                    break;
                case 501:
                    responses['501'] = {
                        description: 'Not Implemented',
                        schema: errorModel
                    };
                case 503:
                    responses['503'] = {
                        description: 'Service Unavailable',
                        schema: errorModel
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
