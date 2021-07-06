const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('../package');


const Routes = [
{
  method: 'GET',
  path: '/health',
  options: {
    handler: () => {
      console.log("/health");
      return 'OK';
    },
    description: 'Health check',
    notes: 'Returns "OK"',
    tags: ['api', 'health'],
    }
}];

(async () => {
    const server = await new Hapi.Server({
        host: 'localhost',
        port: 3000,
    });

    const swaggerOptions = {
        info: {
                title: 'Nimiq Shop Dir API Documentation',
                version: Pack.version,
            },
        };

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    try {
        await server.start();
        console.log('Server running at:', server.info.uri);
    } catch(err) {
        console.log(err);
    }

    server.route(Routes);
})();
