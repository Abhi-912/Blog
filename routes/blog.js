const express = require("express");
const router = express.Router({ mergeParams: true });
const Blog = require("../models/blog");
const middleware = require("../middleware");

//INDEX PAGE
router.get("/",(req,res)=>{
    Blog.find({},(err,blogs)=>{
        if(err)
            console.log("ERROR")
        else{
            res.render("index",{blogs:blogs})
        }
    })
})


//new - shows the form
router.get("/new",middleware.isLoggedIn,(req,res)=>{
    res.render("new")
})

//create route
router.post("/",middleware.isLoggedIn,(req,res)=>{
    //create blog
    const author={
        id: req.user._id,
        username: req.user.username,
        name: req.user.name
    }
    const newBlog = {title: req.body.blog.title,image: req.body.blog.image,body: req.body.blog.body, author:author}
    //console.log(req.body.blog.body)
    console.log(newBlog)
    Blog.create(newBlog,(err,blog)=>{
        if(err)
            res.render("new")
        else
            res.redirect("/blogs")
    })
})

//SHOW ROUTE
router.get("/:id",(req,res)=>{
    Blog.findById(req.params.id,(err,foundBlog)=>{
        if(err)
           res.redirect("/blogs")
        else{
            res.render("show",{blog:foundBlog})
        }
    })
})

//EDIT ROUTE 
router.get("/:id/edit",middleware.checkBlogOwnership,(req,res)=>{
    Blog.findById(req.params.id,(err,foundBlog)=>{
        if(err)
        res.redirect("/blogs")
     else{
         res.render("edit",{blog:foundBlog})
     }
    })
})

//UPDATE ROUTE
router.put("/:id",middleware.checkBlogOwnership,(req,res)=>{
    Blog.findByIdAndUpdate(req.params.id,req.body.blog,(err,updatedBlog)=>{
        if(err)
           res.redirect("/blogs")
        else{
            res.redirect("/blogs/"+req.params.id)
        }
    })
})

//DELETE ROUTE
router.delete("/:id",middleware.checkBlogOwnership,(req,res)=>{
    Blog.findByIdAndRemove(req.params.id,(err)=>{
        if(err)
           res.redirect("/blogs")
        else{
            res.redirect("/blogs")
        }
    })
})

module.exports = router;