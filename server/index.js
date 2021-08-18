'use strict';

require('dotenv').config();
const Glue = require('@hapi/glue');
const Exiting = require('exiting');
const Manifest = require('./manifest');
const RequiredEnv = require('./requiredEnvVars');
const { initialize } = require('unleash-client');

const required_env_vars = [
    'UNLEASH_URL',
    'APP_NAME',
    'APP_ENV',
    'UNLEASH_AUTH',
    'UNLEASH_API_TOKEN'
];

const config = RequiredEnv.validateRequiredEnvVars({},required_env_vars);

const Unleash = initialize({
    url: config.UNLEASH_URL,
    appName: config.APP_NAME,
    environment: config.APP_ENV,
    instanceId: process.env.HOSTNAME,
    customHeaders: {
        Authorization: config.UNLEASH_API_TOKEN
    }
});

if (process.env.APPLY_MIGRATIONS === 'true') {

    // Run the migrations
    console.info('INFO: Applying migrations');
    require('./applyDBmigrations');
}

exports.deployment = async ({ start } = {}) => {

    const manifest = Manifest.get('/', process.env);
    const server = await Glue.compose(manifest, { relativeTo: __dirname });

    if (start) {
        await Exiting.createManager(server).start();
        server.log(['start'], `Server started at ${server.info.uri}`);
        return server;
    }

    await server.initialize();

    return server;
};

if (require.main === module) {

    exports.deployment({ start: true });

    process.on('unhandledRejection', (err) => {

        throw err;
    });
}
