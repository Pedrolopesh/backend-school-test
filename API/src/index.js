const express = require('express');
const routes = require('./routes/index.js');

const cors = require('cors');
const port = process.env.PORT || 3333;
const app = express();

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express')

const bodyparser = require('body-parser');

const swaggerOptions = {
    swaggerDefinition:{
        info:{
            title:'SCHOOL API',
            version:'1.0.0',
            description:"API that simulate a school test",
            contact:{
                name:"Pedro Henrique Lopes S."
            },
            severs:["http://localhost:"+port]
        }
    },
    apis:["./routes/*.js"]
};
const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

console.log(swaggerDocs)

const server = require('http').createServer(app);

app.use(bodyparser.json());
app.use(cors());

server.listen(port, () => {
    console.log('Server started at http://localhost:' + port +'/api/')
});

app.use('/api', routes);

module.exports = app;