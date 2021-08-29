'use strict';

const slice = [];
let routes = slice
    .concat(require('./health/routes'));

// Localdev routes only, will not show up in production
if (process.env.NODE_ENV === 'development') {
    routes = routes.concat(require('./shops/routes'));
}

module.exports = routes;
