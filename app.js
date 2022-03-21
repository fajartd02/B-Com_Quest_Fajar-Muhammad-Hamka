const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const routes = require("./routes/routes"); 
const mongoose = require("mongoose");
const _ = require("lodash");
const dotenv = require("dotenv");
const port = process.env.PORT || 3000;

// use public folder
app.use(express.static("public"));

//
app.set("view engine", "ejs");

// use for req data from html
app.use(bodyParser.urlencoded({extended: true}));

// config ENV
dotenv.config();

// URL Local end point: mongodb://localhost:27017
mongoose.connect(process.env.MONGO_URL);

// use routes.js, Got error when use MVC so i not used it for my deadline
app.use(routes);

app.listen(port, () => {
    console.log("Server running success at http://localhost:3000/");
});