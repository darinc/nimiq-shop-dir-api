'use strict';

const Flags = require('../utilities/featureflags');

const addUnreleasedRoute = function (routes, routePathString) {

    if ( Flags.getToggleNonProd('ROUTE:' + routePathString) ) {

        routes = routes.concat(require('.' + routePathString + '/routes'));
    }

    return routes;
};

const slice = [];
let routes = slice
    .concat(require('./health/routes'));

// Unreleased / non production routes only
// e.g: routes = addUnreleasedRoute(routes, '/shops');
routes = addUnreleasedRoute(routes, '/shops');

module.exports = routes;
