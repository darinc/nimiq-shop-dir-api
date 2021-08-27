'use strict';

// Load modules

const Code = require('@hapi/code');
const Lab = require('@hapi/lab');
const Server = require('../server');
const Package = require('../package.json');

// Test shortcuts

const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script();
const { expect } = Code;
//const { init } = require('../server');



console.log(process.env.NODE_ENV);

describe('Deployment', () => {

    it('registers the main plugin.', async () => {

        const server = await Server.deployment();

        expect(server.registrations[Package.name]).to.exist();
    });
});

describe('GET /health', () => {

    let server;

    beforeEach(async () => {
        server = await Server.deployment();
    });

    afterEach(async () => {

        await server.stop();
    });

    it('responds with 200', async () => {

        const res = await server.inject({
            method: 'get',
            url: '/health'
        });
        expect(res.statusCode).to.equal(200);
    });
});
