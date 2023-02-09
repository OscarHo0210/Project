const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
require('dotenv').config();
const User = require("../models/user");

function isAuth(req, res) {

  // check header or url parameters or post parameters for token
  var token = req.headers['x-access-token'];
  if (!token) 
    return res.status(403).send({ auth: false, message: 'No token provided.' });

  // verifies secret and checks exp
  /*jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {      
    if (err) 
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });    

    // if everything is good, save to request for use in other routes
    console.log(token);
    console.log(process.env.JWT_SECRET);
    req.user = decoded;
    //next();
  });*/

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
  const currentUser = User.findById(decoded.id);
  console.log(currentUser);
  //auth.js不但驗證，也會存user一包資料
  req.user = currentUser;
  next();
}


module.exports = isAuth;