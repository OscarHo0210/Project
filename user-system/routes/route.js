const express = require("express");
const { signup, login } = require("../controllers/user");
const { getAll } = require("../controllers/user");
//const { Article } = require("../controllers/post");
const { getArticle } = require("../controllers/post");


const router = express.Router();

//router.post('/postArticle', Article);
router.post('/signup', signup);
router.post('/login', login);
router.get('/getAll', getAll);
router.get('/getArticle', getArticle);

module.exports = router;