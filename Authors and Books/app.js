const express = require("express");
const app = express();
const mysql = require("mysql2");
const authorsandbooks = require("./routes/Authorandbooksroutes")

const PORT =  8000;

app.use(express.json());
app.use("/AuthorandBooks" , authorsandbooks);

app.listen(PORT , () => {
    console.log("server is running on port 8000");
    
})