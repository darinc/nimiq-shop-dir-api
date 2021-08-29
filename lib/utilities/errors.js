'use strict';

const constructError = function (code, error, message, detail) {

    return {
        code,
        error,
        message,
        detail
    };
};

const unauthorizedError = function (prefix) {

    prefix = prefix || 'Authorization';
    return constructError(401,
        prefix + '.Unathorized',
        'Missing authentication',
        'Ensure that the token or username and password included in the request'
    );

};

module.exports = {
    unauthorizedError
};

/*
const errorModel400 = Joi.object({
    code: 400,
    errorSuffix: '.BadRequest',
    message: 'Missing authentication',
    details: 'Ensure that the token or username and password included in the request'

    code: Joi.number().integer().label('code').required().example(400),
    error: Joi.string().label('error').required().example('Manage.BadRequest'),
    message: Joi.string().label('message').example('Invalid query parameters'),
    detail: Joi.string().label('detail').example('query parameter failed validation')
});

const http401 = {
    code: 401,
    errorSuffix: '.Unathorized',
    message: 'Missing authentication',
    details: 'Ensure that the token or username and password included in the request'
}

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
    detail: Joi.string().label('detail').example('Service is temporarility unavailable, please try again'
*/

/* - example
code: Joi.number().integer().label('code').required().example(401),
error: Joi.string().label('error').required().example('Login.Unauthorized'),
message: Joi.string().label('message').example('Incorrect username and password'),
detail: Joi.string().label('detail').example('Ensure that the username and password included in the request are correct')
*/
