const Post  = require('../models/blog')


var middlewareObj = {};

middlewareObj.checkBlogOwnership = function(req, res, next) {

    if(req.isAuthenticated()) {
        Post.findById(req.params.id, (err, foundBlog) => {
            if(err) {
                res.redirect("back");
            }
            else{
                //does user owns the post
                if(foundBlog.author.id.equals(req.user._id))
                {
                    next();
                }else{
                    res.redirect("back")
                }
            }
        })
    }
    else{
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next) {

    if (req.isAuthenticated()) {
        return next();
      }
      else{
        res.redirect("/user/login");
      }
}


module.exports = middlewareObj;