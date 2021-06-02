var express = require('express');
var router = express.Router();

const ctrlUser = require("../controllers/user.controller");
const {
    verifySession,
} = require("../controllers/user.controller");


router.post('/sign-up', ctrlUser.signUp);
router.post('/login', ctrlUser.login);
router.get('/me/access-token', verifySession, ctrlUser.accessToken);

module.exports = router;
