const mongoose = require("mongoose");
const express = require("express");
const app = express();
const exphbs = require('express-handlebars');

const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require('dotenv').config();

//db connect
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true
}).then(() => {
    console.log("connected");
}).catch(() => {
    console.log("error");
})

//Use parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

//import routes
const userRoutes = require("./routes/route");

//use routes
app.use('/userSystem', userRoutes);

//connect server
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`connect port ${port}`);
});

/*
//JWT
app.use(function(req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jwt.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
      if (err) req.body.user = undefined;
      req.body.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});


//set view engine
//app.engine('handlebars', exphbs('defaultLayout: main'));
//app.set('view engine', 'handlebars');

/*
app.get('/', (req, res) => {
    res.render('index.ejs', {name: 'Oscar'});
})*/