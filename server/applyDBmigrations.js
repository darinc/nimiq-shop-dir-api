'use strict';
/* ------------ dependencies ------------ */

// dotenv is used with local development and will read '.env'
//   and then inject any values defined there into process.env vars
require('dotenv').config();

const RequiredEnv = require('./requiredEnvVars');
const Postgrator = require('postgrator');


const required_env_vars = [
    'PG_HOST',
    'PG_PORT',
    'POSTGRES_USER',
    'POSTGRES_PASSWORD',
    'POSTGRES_DB'
];

const config = RequiredEnv.validateRequiredEnvVars({},required_env_vars);

const postgrator = new Postgrator({

    migrationDirectory: __dirname + '/../migrations',
    driver: 'pg',

    // Database connection config
    host: config.PG_HOST,
    port: 5432,
    database: config.POSTGRES_DB,
    username: config.POSTGRES_USER,
    password: config.POSTGRES_PASSWORD,

    schemaTable: `${config.POSTGRES_DB}.dbmigrations`
});

// Log the migrations
//postgrator.on('validation-started', (migration) => console.log(migration));
//postgrator.on('validation-finished', (migration) => console.log(migration));
postgrator.on('migration-started', (migration) => console.log('INFO: Migration started: ', migration));
postgrator.on('migration-finished', (migration) => console.log('INFO: Migration completed: ', migration));


// Migrate to a specific version or 'max' for the latest
postgrator
    .migrate('000')
    .then((appliedMigrations) => {
        //console.log(appliedMigrations);
    })
    .catch((error) => {

        console.log('ERROR', error);
        // Because migrations prior to the migration with error would have run
        // error object is decorated with appliedMigrations
        console.log(error.appliedMigrations); // array of migration objects
    });
