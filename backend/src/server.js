const { ENV, environments } = require('./config');
const express = require('express');
const cors = require('cors');
const favicon = require('serve-favicon');
const path = require('node:path');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(cors());
app.use(express.json());

const swaggerSpec = swaggerJsDoc({
    definition: {
        openapi: '3.0.0',
        info: {
            version: '1.0.0',
            title: 'Gomoku API',
            description: 'API Information of gomoku-backend',
            contact: { name: 'Wacoco' }
        },
        servers: [
            { url: 'http://localhost:3001', description: 'Local' }
        ]
    },
    apis: ['./src/routes/*.js'] // JSDoc annotations live here
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));


app.use('/api/gomoku', require('./routes/game_routes.js'));


module.exports = app;
