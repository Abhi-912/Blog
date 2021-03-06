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
    var newUser = new User({username: req.body.username, name: req.body.name})

    const password = req.body.password
    const confirmpassword = req.body.confirmpassword

    if(password.length < 6) {
        req.flash('info', 'Password length must be greater than 6 characters');
        return res.render('register')
    }
    if(confirmpassword != password) {
        req.flash('info', 'Both Confirm password and password should be same.');
        return res.render('register')
    }

    User.register(newUser,req.body.password, (err,user)=>{
        if(err){
            req.flash('error', 'Please Register');
            return res.render("register")
        }
        passport.authenticate("local")(req,res,()=>{
            res.redirect('/blogs')
        })
    })
})

//show login form
router.get("/login",(req,res)=>{
    res.render("login", {
        user: req.user,
        error: req.flash('info', ' ')
    })
})

//handling login logic
router.post("/login",passport.authenticate("local",{
    successRedirect:"/blogs",
    failureRedirect:"/login",
    failureFlash : { type: 'info', message: 'Invalid username or password' }
})
)


router.get("/logout",(req,res)=>{
    req.logOut()
    req.flash('success', 'Logged Out. Please login to post.')
    res.redirect("/blogs")
})

  
module.exports = router;