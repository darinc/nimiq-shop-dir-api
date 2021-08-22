'use strict';

const Joi = require('joi');

module.exports = {
    status: Joi.string().valid('pass','warn','fail').required().example('pass')
};
