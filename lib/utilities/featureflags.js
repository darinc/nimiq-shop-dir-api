'use strict';

const Unleashed = require('unleash-client');

const isToggleDefined = function (toggle) {

    return Object.is(Unleashed.getFeatureToggleDefinition(toggle), undefined);
};

const getToggle = function (toggle, context) {

    const sendContext = Object.is(context, undefined) ? context : {};
    return Unleashed.isEnabled(toggle, sendContext);
};

const getToggleDefaultTrue = function (toggle, context) {

    return isToggleDefined ? getToggle(toggle, context) : true;
};

const getToggleDefaultFalse = function (toggle, context) {

    return isToggleDefined ? getToggle(toggle, context) : false;
};

const getToggleOrWarn = function (toggle, context) {

    if (!isToggleDefined) {

        console.warn('toggle not defined:', toggle);
        //return new Error('toggle not defined:', toggle);
    }

    return getToggle(toggle, context);
};

const getToggleOrError = function (toggle, context) {

    if (!isToggleDefined) {
        console.error('toggle not defined:', toggle);
        //return new Error('toggle not defined:', toggle);
    }

    return getToggle(toggle, context);
};

module.exports = {
    Client: Unleashed,
    isToggleDefined,
    getToggle,
    getToggleDefaultTrue,
    getToggleDefaultFalse,
    getToggleOrWarn,
    getToggleOrError
};
