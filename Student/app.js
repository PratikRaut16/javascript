
const express = require("express");
const app = express();
const mysql = require("mysql2");
const studentroutes = require("./Routes/StudentRoutes");
const setupSwagger = require("./swagger");
const PORT = 8000

app.use(express.json());
app.use("/students" , studentroutes);

setupSwagger(app);

app.listen(PORT , () => {
    console.log(`Server is running on the port ${PORT}` );
     });
