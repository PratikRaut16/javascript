const express = require("express");
const app = express();
const categoryandproductroutes = require("./routes/categoryandproductroutes")
const PORT =  8000;

app.use(express.json());
app.use("/api", categoryandproductroutes);

app.listen(PORT , () => {
    console.log("server is running on port 8000");
    
});