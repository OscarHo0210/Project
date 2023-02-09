const express = require("express");
const { signup, login, userProfile } = require("../controllers/user");
const { getAll } = require("../controllers/user");
//const { Article } = require("../controllers/post");
const { getArticle } = require("../controllers/post");

//var isAuth = require('../middlewares/isAuth');
var User = require('../models/user');
const jwt = require('jsonwebtoken');
const router = express.Router();

//router.post('/postArticle', Article);
router.post('/signup', signup);
router.post('/login', login);
router.get('/getAll', getAll);
router.get('/getArticle', getArticle);
router.get('/userProfile', function(req, res, next) {

    var token = req.headers['x-access-token'];

    const decoded = new Promise((resolve, reject) => {

        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
          if (err) {
            console.log(err);
            reject(err)
          } else {
            resolve(payload)
          }
        })
      })
      console.log(token);
      const currentUser = User.findById(decoded.id);
      console.log(currentUser);
      //auth.js不但驗證，也會存user一包資料
      req.user = currentUser;
  });
module.exports = router;