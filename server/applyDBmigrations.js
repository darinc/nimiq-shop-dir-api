const Postgrator = require('postgrator')

const postgrator = new Postgrator({
    // Directory containing migration files
    migrationDirectory: __dirname + '/migrations',
    // or a glob pattern to files
    migrationPattern: __dirname + '/some/pattern/*',
    driver: 'pg',

    // Database connection config
    host: '127.0.0.1',
    port: 5432,
    database: 'databasename',
    username: 'username',
    password: 'password',
    // Schema table name. Optional. Default is schemaversion
    // If using Postgres, schema may be specified using . separator
    // For example, { schemaTable: 'schema_name.table_name' }
    schemaTable: 'schemaversion',
})

// Migrate to a specific version or 'max' for the latest
postgrator
    .migrate()
    .then((appliedMigrations) => console.log(appliedMigrations))
    .catch((error) => {
        console.log(error)
        // Because migrations prior to the migration with error would have run
        // error object is decorated with appliedMigrations
        console.log(error.appliedMigrations) // array of migration objects
    })