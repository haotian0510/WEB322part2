const express = require('express');
const router = express.Router();
const meals=require("../models/meals");
const gif = require("../models/gif");


router.get("/",(req,res)=>{
   
    res.render("home",{
        title:"Home Page",
        data : gif.getGif(),
        data1 : meals.getTopSeller() 

    })
});

router.get("/packages",(req,res)=>{
    res.render("packages",{
        title:"Package Listings",
        data :meals.getTopSeller()
    })
});
module.exports =router;