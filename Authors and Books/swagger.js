const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const swaggerOptions = {
    definition : { 
        openapi: '3.0.0',
        info : {
            title : "Authors and Books API",
            version : '1.0.0',
            description : 'API for managing Authors and their Books',
        },

        servers : [
            {
                url : 'http://localhost:8000/AuthorandBooks'
            },
        ],
    },

    apis : ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const setupSwagger = (app) => {
    app.use("/api-docs" , swaggerUi.serve , swaggerUi.setup(swaggerDocs));
    console.log("Swagger Docs available at http://localhost:8000/api-docs");
    
}; 

module.exports = setupSwagger;