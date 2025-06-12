const express = require("express");
const app = express();
const categoryandproductroutes = require("./routes/categoryandproductroutes")
const PORT =  8000;
const setupSwagger = require("./swagger")

app.use(express.json());
app.use("/api", categoryandproductroutes);


// 🔹 **Setup Swagger Documentation**
setupSwagger(app);


app.listen(PORT , () => {
    console.log("server is running on port 8000");
    
});