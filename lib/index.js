'use strict';

const HauteCouture = require('@hapipal/haute-couture');
const Package = require('../package.json');

exports.plugin = {
    pkg: Package,
    register: async (server, options) => {

        await HauteCouture.compose(server, options, {
            amendments: {
                // Do not look recursively into directories anywhere aside from routes/
                [HauteCouture.default]: {
                    recursive: false
                }
            }
        });
    }
};
