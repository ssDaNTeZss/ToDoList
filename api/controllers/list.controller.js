const mongoose = require("mongoose");
const LIST = mongoose.model('List');

const helper = require("../helpers/common");

module.exports.getAll = async (req, res, next) => {
    LIST.find({}, (err, lists) => {
        if (err) {
            helper.sendJsonResponse(res, 400, err);
        }
        helper.sendJsonResponse(res, 200, lists);
    });
};

module.exports.create = async (req, res, next) => {
    LIST.create(req.body, (err, lists) => {
        if(err){
            helper.sendJsonResponse(res,400, err);
        }
        helper.sendJsonResponse(res,201, lists);
    });
};

module.exports.update = async (req, res, next) => {
    LIST.findOneAndUpdate({_id: req.params.id}, {
        $set: req.body
    }).then(() => {
        helper.sendJsonResponse(res, 200, {'message': 'updated successfully'});
    }).catch((err) => {
        helper.sendJsonResponse(res, 400, err);
    });
};

module.exports.delete = async (req, res, next) => {
    LIST.findOneAndRemove({
        _id: req.params.id
    }).then(() => {
        helper.sendJsonResponse(res,200, { 'message': `Tasks from ${req.params.id} were deleted!` });

        // delete all the tasks that are in the deleted list
        // deleteTasksFromList(removedListDoc._id);
    }).catch((err) => {
        helper.sendJsonResponse(res, 400, err);
    });
};

let deleteTasksFromList = (_listId) => {
    TA.deleteMany({
        _listId
    }).then(() => {
        console.log("Tasks from " + _listId + " were deleted!");
    })
};

module.exports.dangerousRemoval = async (req, res, next) => {
    LIST.deleteMany({
        title: req.body.title
    }).then(() => {
        helper.sendJsonResponse(res,200, { 'message': `Tasks deleted!` });

        // delete all the tasks that are in the deleted list
        // deleteTasksFromList(removedListDoc._id);
    }).catch((err) => {
        helper.sendJsonResponse(res, 400, err);
    });
};
