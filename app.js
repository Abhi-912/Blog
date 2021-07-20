require('dotenv').config()
const express = require("express")
const methodOverride = require("method-override")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const passport = require('passport')
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const LocalStrategy = require('passport-local')
const User = require('./models/user')

//Database Setup
const MONGO_URI = process.env.DBURL;

const connect = mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
connect.then(
  (db) => {
    console.log("Database Connected Successfully");
  },
  (err) => {
    console.log("Error occur while connecting ", err);
  }
);

//-------------GENRAL CONFIGURATION----------
app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(methodOverride("_method"))

//------------ROUTERS------------------------
const postRoutes = require("./routes/blog");
const userRoutes = require("./routes/user");

//------------PASSPORT CONFIGURATION-----------
app.use(require('express-session')({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 600000 }
}))

app.use(cookieParser('Secret Key'));
app.use(flash());

app.use(passport.initialize())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
app.use(passport.session())


//to get current logged in user
app.use((req, res, next) => {
  res.locals.currentUser = req.user
  next()
})


//Root Route
app.get("/", (req, res) => {
  res.redirect("/blogs")
})

app.use("/blogs", postRoutes);
app.use("/", userRoutes);


app.listen(process.env.PORT || 4001, () => {
  console.log("Connected Blog App")
})