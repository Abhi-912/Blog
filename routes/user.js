const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");


//show register form
router.get("/register", (req, res) => {
    res.render("register");
  });


//handle signup
router.post("/register",(req,res)=>{
    var newUser = new User({username: req.body.username})
    User.register(newUser,req.body.password,(err,user)=>{
        if(err){
            return res.render("register")
        }
        passport.authenticate("local")(req,res,()=>{
            res.redirect('/blogs')
        })
    })
})

//show login form
router.get("/login",(req,res)=>{
    res.render("login")
})

//handling login logic
router.post("/login",passport.authenticate("local",{
    successRedirect:"/blogs",
    failureRedirect:"/login"
}),(req,res)=>{
})


router.get("/logout",(req,res)=>{
    req.logOut()
    res.redirect("/blogs")
})

  
module.exports = router;