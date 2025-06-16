const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    definition : { 
        openapi: '3.0.0',
        info : {
            title : "Student Management API",
            version : '1.0.0',
            description : 'API for managing Students',
        },

        servers : [
            {
                url : 'http://localhost:8000/students'
            },
        ],
    },

    apis : ["./Routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const setupSwagger = (app) => {
    app.use("/api-docs" , swaggerUi.serve , swaggerUi.setup(swaggerDocs));
    console.log("Swagger Docs available at http://localhost:8000/api-docs");
    
}; 

module.exports = setupSwagger;