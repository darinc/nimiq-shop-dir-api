'use strict';

const Joi = require('joi');

module.exports = {
    shops: Joi.array().items(
        Joi.object({
            id: Joi.number().required().example(22051),
            shortcode: Joi.string().required().example('marioscookies'),
            name: Joi.string().required().example('Mario\'s Cookies'),
            summary: Joi.string().required().example('Premier Italian Cookies'),
            description: Joi.string().required().example('Online retailer delivering the finest Italian cookies to Italy!'),
            active: Joi.boolean().required().example(true),
            created: Joi.date().required().example('2021-08-20 15:55:10'),
            updated: Joi.date().required().example('2021-08-29 09:01:30')
        })
    )
};
