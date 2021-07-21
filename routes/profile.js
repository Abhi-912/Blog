const express = require("express");
const router = express.Router({ mergeParams: true });
const Blog = require("../models/blog");
const middleware = require("../middleware");

 
router.get('/profile', middleware.isLoggedIn, (req, res) => {
    
    Blog.find({},(err,blogs)=>{
        if(err){
            console.log("ERROR")
            res.render('login')
        }
        else{
            res.render("profile",{blogs:blogs})
        }
    })    
})

module.exports = router;