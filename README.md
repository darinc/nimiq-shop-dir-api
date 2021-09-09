# nimiq-shop-dir-api

REST API to find and manage shops that accept Nimiq


## Resources

- [Nimiq](https://nimiq.com/) is a frictionless payment protocol for the web.
- [Hapi.dev](https://hapi.dev) Hapi API framework.
- [Happi Swagger](https://github.com/glennjones/hapi-swagger) OpenAI documentation.


## Quickstart (Docker Compose) for local development and testing
- copy server/env.template to server/.env and update the variables
- npm run build:api && docker compose up api postgres unleash
- connect to postgres and create the unleash DB for local development: `CREATE DATABASE unleash;`
- Connect to swagger documentation: http://localhost:3000/documentation#/
- Edit feature flags http://localhost:4242/features
- 


## Quickstart (Node)
- copy server/env.template to server/.env and update the variables
- Use node > v14.17.3
- Install dependencies via: `npm install`
- Start server via: `npm start`

## Database design
[Database Design](docs/database.md)

## Test and Build


# Contribute

If you'd like to contribute to the development of the nimiq-shop-dir-api please contact the author

## License

This project is under the [MIT License](./LICENSE.md).
