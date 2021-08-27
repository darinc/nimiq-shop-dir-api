'use strict';

const Joi = require('joi');

/*
Information on this format
{
    "code":    // repeats the status code
    "error":   // concatenation of code module "." and camel case http error code string
    "message": // error message
    "detail":  // hints on how to avoid this error
}
Example error message:
{
    "code": 401
    "error": "Login.Unauthorized",
    "message": "Incorrect username and password",
    "detail": "Ensure that the username and password included in the request are correct"
}
*/
const successModel201 = Joi.object({
    code: Joi.number().integer().label('code').required().example(201),
    error: Joi.string().label('error').required().example('User.Created'),
    message: Joi.string().label('message').example('User created successfully'),
    detail: Joi.string().label('detail').example(':/manage/user/437')
});

const errorModel400 = Joi.object({
    code: Joi.number().integer().label('code').required().example(400),
    error: Joi.string().label('error').required().example('Manage.BadRequest'),
    message: Joi.string().label('message').example('Invalid query parameters'),
    detail: Joi.string().label('detail').example('query parameter failed validation')
});

const errorModel401 = Joi.object({
    code: Joi.number().integer().label('code').required().example(401),
    error: Joi.string().label('error').required().example('Login.Unauthorized'),
    message: Joi.string().label('message').example('Incorrect username and password'),
    detail: Joi.string().label('detail').example('Ensure that the username and password included in the request are correct')
});

const errorModel403 = Joi.object({
    code: Joi.number().integer().label('code').required().example(403),
    error: Joi.string().label('error').required().example('Manage.Forbidden'),
    message: Joi.string().label('message').example('Not allowed'),
    detail: Joi.string().label('detail').example('Your user is authenticated, however you do not have the permissions needed')
});

const errorModel404 = Joi.object({
    code: Joi.number().integer().label('code').required().example(404),
    error: Joi.string().label('error').required().example('Search.NotFound'),
    message: Joi.string().label('message').example('Path Not Found'),
    detail: Joi.string().label('detail').example('Refer to OpenAPI documentation for supported paths')
});

const errorModel500 = Joi.object({
    code: Joi.number().integer().label('code').required().example(500),
    error: Joi.string().label('error').required().example('Server.InternalServerError'),
    message: Joi.string().label('message').example('Internal Server Error'),
    detail: Joi.string().label('detail').example('Service is temporarility unavailable, please try again')
});

const errorModel501 = Joi.object({
    code: Joi.number().integer().label('code').required().example(501),
    error: Joi.string().label('error').required().example('Search.NotImplemented'),
    message: Joi.string().label('message').example('Not Implemented'),
    detail: Joi.string().label('detail').example('Method not implemented, refer to documentation')
});

const errorModel503 = Joi.object({
    code: Joi.number().integer().label('code').required().example(503),
    error: Joi.string().label('error').required().example('Server.ServiceUnavailable'),
    message: Joi.string().label('message').example('Service Unavailable'),
    detail: Joi.string().label('detail').example('Service is temporarility unavailable, please try again')
});

module.exports = {
    successModel201,
    errorModel400,
    errorModel401,
    errorModel403,
    errorModel404,
    errorModel500,
    errorModel501,
    errorModel503
};
