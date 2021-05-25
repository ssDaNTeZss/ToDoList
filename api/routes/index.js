const express = require('express');
const router = express.Router();

const ctrlList = require("../controllers/list.controller");

/* GET home page. */
// router.get('/lists', function(req, res, next) {
//   res.send('Hello world!');
// });

router.get('/lists', ctrlList.getAll);
router.post('/lists', ctrlList.create);

module.exports = router;
