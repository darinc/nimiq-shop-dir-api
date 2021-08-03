'use strict';
/* ------------ dependencies ------------ */

// dotenv is used with local development and will read '.env'
//   and then inject any values defined there into process.env vars
require('dotenv').config();
const RequiredEnv = require('./requiredEnvVars');

const required_env_vars = [
    'PG_HOST',
    'PG_PORT',
    'POSTGRES_USER',
    'POSTGRES_PASS',
    'POSTGRES_DB'
];

const config = RequiredEnv.validateRequiredEnvVars(required_env_vars);

const Postgrator = require('postgrator');

const postgrator = new Postgrator({

    // Directory containing migration files
    migrationDirectory: __dirname + '/migrations',
    // or a glob pattern to files
    migrationPattern: __dirname + '/some/pattern/*',
    driver: 'pg',

    // Database connection config
    host: config.PG_HOST,
    port: 5432,
    database: config.POSTGRES_DB,
    username: config.POSTGRES_USER,
    password: config.POSTGRES_PASSWORD,

    // Schema table name. Optional. Default is schemaversion
    // If using Postgres, schema may be specified using . separator
    // For example, { schemaTable: 'schema_name.table_name' }
    schemaTable: `${config.POSTGRES_DB}.appliedMigrations`
});

// Log the migrations
postgrator.on('validation-started', (migration) => console.log(migration));
postgrator.on('validation-finished', (migration) => console.log(migration));
postgrator.on('migration-started', (migration) => console.log(migration));
postgrator.on('migration-finished', (migration) => console.log(migration));


// Migrate to a specific version or 'max' for the latest
postgrator
    .migrate()
    .then((appliedMigrations) => {

        console.log(appliedMigrations);
    })
    .catch((error) => {

        console.log(error);
        // Because migrations prior to the migration with error would have run
        // error object is decorated with appliedMigrations
        console.log(error.appliedMigrations); // array of migration objects
    });
