const express = require('express');
const router = express.Router();

const ctrlList = require("../controllers/list.controller");
const ctrlTask = require("../controllers/task.controller");

const {
    authenticate,
} = require("../controllers/user.controller");


/* GET home page. */
// router.get('/lists', function(req, res, next) {
//   res.send('Hello world!');
// });

router.get('/lists', authenticate, ctrlList.getAll);
router.get('/lists/:id', authenticate, ctrlList.getOne);
router.post('/lists', authenticate, ctrlList.create);
router.put('/lists/:id', authenticate, ctrlList.update);
router.delete('/lists/:id', authenticate, ctrlList.delete);

router.delete('/lists', ctrlList.dangerousRemoval);

router.get('/lists/:listId/tasks', authenticate, ctrlTask.getAll);
router.post('/lists/:listId/tasks', authenticate, ctrlTask.create);
router.put('/lists/:listId/tasks/:taskId', authenticate, ctrlTask.update);
router.delete('/lists/:listId/tasks/:taskId', authenticate, ctrlTask.delete);

router.delete('/tasks', ctrlTask.dangerousRemoval);

// router.post('/user', ctrlUser.signUp);

module.exports = router;
