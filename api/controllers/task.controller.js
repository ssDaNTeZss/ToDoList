const mongoose = require("mongoose");
const TASK = mongoose.model('Task');

const LIST = mongoose.model('List');

const helper = require("../helpers/common");

module.exports.getAll = async (req, res, next) => {

    if (req.params.listId !== "all-tasks" &&
        req.params.listId !== "my-day" &&
        req.params.listId !== "important" &&
        req.params.listId !== "planned") {
        TASK.find({_listId: req.params.listId}, (err, tasks) => {
            if (err) {
                helper.sendJsonResponse(res, 400, err);
            }
            helper.sendJsonResponse(res, 200, tasks);
        }).sort({ $natural: -1 });
    }

    if (req.params.listId === "all-tasks") {
        TASK.find({}, (err, tasks) => {
            if (err) {
                helper.sendJsonResponse(res, 400, err);
            }
            helper.sendJsonResponse(res, 200, tasks);
        });
    }

    if (req.params.listId === "my-day") {
        console.log(new Date().toLocaleDateString());
        TASK.find({date_of_completion: new Date().toLocaleDateString()}, (err, tasks) => {
            if (err) {
                helper.sendJsonResponse(res, 400, err);
            }
            helper.sendJsonResponse(res, 200, tasks);
        });
    }

    if (req.params.listId === "important") {
        TASK.find({important: true}, (err, tasks) => {
            if (err) {
                helper.sendJsonResponse(res, 400, err);
            }
            helper.sendJsonResponse(res, 200, tasks);
        });
    }

    if (req.params.listId === "planned") {
        TASK.find({date_of_completion: { '$exists' : true }}, (err, tasks) => {
            if (err) {
                helper.sendJsonResponse(res, 400, err);
            }
            helper.sendJsonResponse(res, 200, tasks);
        });
    }
};

module.exports.create = async (req, res, next) => {

    console.log(req.body);
    console.log(req.params);

    let newTask = new TASK({
        title: req.body.title,
        _listId: req.params.listId,
        date_of_creation: new Date().toLocaleDateString(),
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
        $set: req.body,
        date_of_change: new Date()
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
        helper.sendJsonResponse(res, 200, {'message': `Tasks from ${req.params.taskId} were deleted!`});
    }).catch((err) => {
        helper.sendJsonResponse(res, 400, err);
    });
};
