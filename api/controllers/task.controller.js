const mongoose = require("mongoose");
const TASK = mongoose.model('Task');

const helper = require("../helpers/common");

module.exports.getAll = async (req, res, next) => {
    TASK.find({_listId: req.params.listId}, (err, tasks) => {
        if (err) {
            helper.sendJsonResponse(res, 400, err);
        }
        helper.sendJsonResponse(res, 200, tasks);
    });
};

module.exports.create = async (req, res, next) => {
    let newTask = new TASK({
        title: req.body.title,
        _listId: req.params.listId,
        date_of_creation: new Date(),
        date_of_change: new Date()
    });

    newTask.save().then((newTaskDoc) => {
        helper.sendJsonResponse(res, 201, newTaskDoc);
    }).catch((err) => {
        helper.sendJsonResponse(res, 400, err);
    });
};

module.exports.update = async (req, res, next) => {
    TASK.findOneAndUpdate({
        _id: req.params.taskId,
        _listId: req.params.listId
    }, {
        $set: req.body
    }).then(() => {
        helper.sendJsonResponse(res, 200, {'message': 'updated successfully'});
    }).catch((err) => {
        helper.sendJsonResponse(res, 400, err);
    });
};

module.exports.delete = async (req, res, next) => {
    TASK.findOneAndRemove({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then(() => {
        helper.sendJsonResponse(res,200, { 'message': `Tasks from ${req.params.taskId} were deleted!` });
    }).catch((err) => {
        helper.sendJsonResponse(res, 400, err);
    });
};
