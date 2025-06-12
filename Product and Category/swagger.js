// swagger.js
// const swaggerJsDoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');

// const swaggerOptions = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: "Product and Category API",
//       version: '1.0.0',
//       description: 'API for managing Product and their Categories information with Sequelize and MySQL',
//     },
//     servers: [
//       {
//         url: 'http://localhost:8000/api',
//       },
//     ],
//   },
//   apis: ["./routes/*.js"], 
// };

// const swaggerDocs = swaggerJsDoc(swaggerOptions);

// const setupSwagger = (app) => {
//   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
//   console.log(`Swagger Docs available at http://localhost:8000/api-docs`);
// };

// module.exports = setupSwagger;


const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Category and Product API',
      version: '1.0.0',
      description: 'API documentation for managing categories and products',
    },
    servers: [
      {
        url: 'http://localhost:8000/api',
      },
    ],
  },
  apis: ['./routes/*.js'], 
};

const specs = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

module.exports = setupSwagger;
