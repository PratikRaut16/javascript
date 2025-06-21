const express = require("express");
const app = express();
const categoryandproductroutes = require("./routes/categoryandproductroutes")
const PORT =  8000;
const setupSwagger = require("./swagger")
const swaggerDocs = require("./docs/swaggerDocs.json");
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require("./docs/swaggerDocs.json")

app.use(express.json());
app.use("/api", categoryandproductroutes);
// app.use(
//   "/swaggerDocs",
//   swaggerUi.serveFiles(swaggerDocs, swaggerUiOptions),
//   swaggerUi.setup(swaggerDocs)
// );

 app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(PORT , () => {
    console.log("server is running on port 8000");
    console.log(`Swagger Docs available at http://localhost:8000/api-docs`);
    
});