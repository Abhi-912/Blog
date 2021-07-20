# Blog App

#### A simple Restful blogging web app built using NodeJS, ExpressJS and MongoDb. Authenticated and authorization functions with passport.js.

### Model &rarr; [MongoDB][18]

The NoSQL database [MongoDB][18] is used for data storage, with [Mongoose][19] 
as a native JavaScript object document mapper (ODM). Schemas in the `/models` 
directory model the database as well as define validation functions. In 
production, the database is hosted by [MongoDB Atlas][17]

### View &rarr; [Express][25], [EJS][23]

Server-side routing is managed by the [Express.js][25] web framework.

Views are preprocessed with [Embedded JavaScript][23] (EJS) templates (written 
in HTML with embedded tags for JS) from the `/views` directory 
or served statically using the [`express.static()`][24] middleware from the
`/public` directory.

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

[Blog App ](https://blog-gers.herokuapp.com/)

# How to run

- Git clone repository
- Intialize a .env file containing the MongoDB connection URI and Secret Key.
- Run the following commands in terminal

```npm
    npm install
    npm start
```



