'use strict'
const start = require('./startup.js');

module.exports.config = () => {
    const express = require('express');
    const bodyParser = require('body-parser');
    const app = express();
    const expressSwagger = require('express-swagger-generator')(app);
    const users_routes = require('../routes/users.js');
    const tenants_routes = require('../routes/tenants.js');
    const user_groups_routes = require('../routes/user_groups.js');
    const roles_routes = require('../routes/roles.js');
    const resources_routes = require('../routes/resources.js');
    const permissions_routes = require('../routes/permissions.js');
    const rules_routes = require('../routes/rules.js');
    const configuration_routes = require('../routes/configuration.js');
    const content_routes = require('../routes/content.js');

    start.onstartup('Administrator', 'Administrator tenant');

    let options = {
        swaggerDefinition: {
            info: {
                description: 'This is a sample server',
                title: 'Swagger',
                version: '1.0.0',
            },
            host: 'localhost:3000',
            basePath: '/api',
            produces: [
                "application/json"
            ],
            schemes: ['http'],
            securityDefinitions: {
                JWT: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'Authorization',
                    description: "",
                }
            }
        },
        basedir: __dirname, //app absolute path
        files: ['../routes/*.js'] //Path to the API handle folder
    };
    expressSwagger(options);
    app.listen(3000, () => {
        console.log('server is listening on port 3000')
    })

    app.use(express.json());
    app.use(bodyParser.json());
    app.use('/api/users', users_routes);
    app.use('/api/tenants', tenants_routes);
    app.use('/api/groups', user_groups_routes);
    app.use('/api/roles', roles_routes);
    app.use('/api/resources', resources_routes);
    app.use('/api/permissions', permissions_routes);
    app.use('/api/rules', rules_routes);
    app.use('/api/configuration', configuration_routes);
    app.use('/api/content', content_routes);
}