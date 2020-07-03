const express = require("express");
const exphbs =require("express-handlebars");
const bodyParser = require('body-parser');
//load the enviroment variable file
require('dotenv').config({path:"./config/keys.env"});


const app=express();

app.engine("handlebars",exphbs());
app.set("view engine","handlebars");
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));

//load controllers
const generalController= require("./controllers/general");
const loginController=require("./controllers/login");

app.use("/",generalController);
app.use("/login",loginController);

const PORT=3000;

app.listen(PORT,()=>{
    console.log(`Web is running`);
})