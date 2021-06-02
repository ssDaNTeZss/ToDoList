const mongoose = require("mongoose");
const TASK = mongoose.model('Task');

const LIST = mongoose.model('List');

const helper = require("../helpers/common");

module.exports.getAll = async (req, res, next) => {


    if (req.params.listId !== "all-tasks" &&
        req.params.listId !== "my-day" &&
        req.params.listId !== "important" &&
        req.params.listId !== "planned") {
        TASK.find({
            _listId: req.params.listId
        }, (err, tasks) => {
            if (err) {
                helper.sendJsonResponse(res, 400, err);
            }
            helper.sendJsonResponse(res, 200, tasks);
        }).sort({$natural: -1});
    }

    if (req.params.listId === "all-tasks") {
        let list = [];
        let taskList = [];

        LIST.find({
            _userId: req.user_id
        }).then((listNew) => {
            if (listNew) {
                list = listNew;
                return true;
            }
            return false;
        }).then((canFindTask) => {
            if (canFindTask) {
                TASK.find({}, (err, tasks) => {
                    for (let i = 0; i < list.length; i++) {
                        for (let j = 0; j < tasks.length; j++) {
                            if (list[i]._id.toString() === tasks[j]._listId.toString()) {
                                taskList.push(tasks[j]);
                            }
                        }
                    }
                }).then(() => {
                    helper.sendJsonResponse(res, 200, taskList);
                })
            } else {
                res.sendStatus(404);
            }
        });
    }


    if (req.params.listId === "my-day") {
        // TASK.find({
        //     date_of_completion: formationDate(new Date().toLocaleDateString()),
        //     _userId: req.user_id
        // }, (err, tasks) => {
        //     if (err) {
        //         helper.sendJsonResponse(res, 400, err);
        //     }
        //     helper.sendJsonResponse(res, 200, tasks);
        // });

        let list = [];
        let taskList = [];

        LIST.find({
            _userId: req.user_id
        }).then((listNew) => {
            if (listNew) {
                list = listNew;
                return true;
            }
            return false;
        }).then(async (canFindTask) => {
            if (canFindTask) {
                TASK.find({}, (err, tasks) => {
                    for (let i = 0; i < list.length; i++) {
                        for (let j = 0; j < tasks.length; j++) {
                            if ((list[i]._id.toString() === tasks[j]._listId.toString()) && (tasks[j].date_of_completion)) {
                                if (tasks[j].date_of_completion.toString() === formationDate(new Date().toLocaleDateString())) {
                                    taskList.push(tasks[j]);
                                }
                            }
                        }
                    }
                }).then(() => {
                    helper.sendJsonResponse(res, 200, taskList);
                })
            } else {
                res.sendStatus(404);
            }
        });
    }

    if (req.params.listId === "important") {
        let list = [];
        let taskList = [];

        LIST.find({
            _userId: req.user_id
        }).then((listNew) => {
            if (listNew) {
                list = listNew;
                return true;
            }
            return false;
        }).then(async (canFindTask) => {
            if (canFindTask) {
                TASK.find({}, (err, tasks) => {
                    for (let i = 0; i < list.length; i++) {
                        for (let j = 0; j < tasks.length; j++) {
                            if (list[i]._id.toString() === tasks[j]._listId.toString()) {
                                if (tasks[j].important) {
                                    taskList.push(tasks[j]);
                                }
                            }
                        }
                    }
                }).then(() => {
                    helper.sendJsonResponse(res, 200, taskList);
                })
            } else {
                res.sendStatus(404);
            }
        });
    }

    if (req.params.listId === "planned") {
        let list = [];
        let taskList = [];

        LIST.find({
            _userId: req.user_id
        }).then((listNew) => {
            if (listNew) {
                list = listNew;
                return true;
            }
            return false;
        }).then(async (canFindTask) => {
            if (canFindTask) {
                TASK.find({}, (err, tasks) => {
                    for (let i = 0; i < list.length; i++) {
                        for (let j = 0; j < tasks.length; j++) {
                            if (list[i]._id.toString() === tasks[j]._listId.toString()) {
                                if (tasks[j].date_of_completion) {
                                    taskList.push(tasks[j]);
                                }
                            }
                        }
                    }
                }).then(() => {
                    helper.sendJsonResponse(res, 200, taskList);
                })
            } else {
                res.sendStatus(404);
            }
        });
    }
};

module.exports.create = async (req, res, next) => {
    LIST.findOne({
        _id: req.params.listId,
        _userId: req.user_id
    }).then((list) => {
        if (list) {
            return true;
        }
        return false;
    }).then((canCreateTask) => {
        if (canCreateTask) {
            let newTask = new TASK({
                title: req.body.title,
                _listId: req.params.listId,
                date_of_creation: new Date().toLocaleDateString(),
                date_of_change: new Date(),
            });

            if (req.body.date_of_completion) {
                newTask.date_of_completion = req.body.date_of_completion;
            }

            if (req.body.description) {
                newTask.description = req.body.description;
            }

            newTask.save().then((newTaskDoc) => {
                helper.sendJsonResponse(res, 201, newTaskDoc);
            }).catch((err) => {
                helper.sendJsonResponse(res, 400, err);
            });
        } else {
            res.sendStatus(404);
        }
    });
};

module.exports.update = async (req, res, next) => {
    LIST.findOne({
        _id: req.params.listId,
        _userId: req.user_id
    }).then((list) => {
        if (list) {
            return true;
        }
        return false;
    }).then((canCreateTask) => {
        if (canCreateTask) {
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
        } else {
            res.sendStatus(404);
        }
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

module.exports.dangerousRemoval = async (req, res, next) => {
    TASK.deleteMany({
        title: req.body.title
    }).then(() => {
        helper.sendJsonResponse(res, 200, {'message': `MANY Tasks deleted!`});
    }).catch((err) => {
        helper.sendJsonResponse(res, 400, err);
    });
};

let formationDate = (date) => {
    const str = date.split(".");
    const newDate = str[2] + "-" + str[1] + "-" + str[0];
    return newDate;
};
