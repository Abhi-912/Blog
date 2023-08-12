# Blog App

### A simple Restful blogging web app built using NodeJS, ExpressJS and MongoDb. Authenticated and authorization functions with passport.js.

## Features 

1. Register
2. Login
3. Add a Blog
4. Edit a blog
5. Remove a Blog

## Routes

- GET /posts - To view all the posts
- GET /user/:username - To view specific post by a user
- POST /posts/publish - To add new post (when user is authenticated andauthorized only)
- GET /posts/:id - To get a post with specific id
- PUT /posts/:id - To update specific post with unique Id (when user is authenticated andauthorized only)
- Delete /posts/:id - To delete specific post with unique Id (when user is authenticated andauthorized only)
- 
# How to run

- Git clone repository
- Intialize a .env file containing the MongoDB connection URI and Secret Key.
- Run the following commands in terminal

```npm
    npm install
    npm start
```



