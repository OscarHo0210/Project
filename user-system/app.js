const mongoose = require("mongoose");
const express = require("express");
const app = express();

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
//views
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs', {name: 'Oscar'});
})*/