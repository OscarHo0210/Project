const express = require("express");
const { signup } = require("../controllers/user");
const { getAll } = require("../controllers/user")
const router = express.Router();

router.post('/signup', signup);
router.get('/getAll', getAll);
module.exports = router;