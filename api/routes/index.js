const express = require('express');
const router = express.Router();

const ctrlList = require("../controllers/list.controller");
const ctrlTask = require("../controllers/task.controller");

/* GET home page. */
// router.get('/lists', function(req, res, next) {
//   res.send('Hello world!');
// });

router.get('/lists', ctrlList.getAll);
router.get('/lists/:id', ctrlList.getOne);
router.post('/lists', ctrlList.create);
router.put('/lists/:id', ctrlList.update);
router.delete('/lists/:id', ctrlList.delete);

router.delete('/lists', ctrlList.dangerousRemoval);

router.get('/lists/:listId/tasks', ctrlTask.getAll);
router.post('/lists/:listId/tasks', ctrlTask.create);
router.put('/lists/:listId/tasks/:taskId', ctrlTask.update);
router.delete('/lists/:listId/tasks/:taskId', ctrlTask.delete);

module.exports = router;
