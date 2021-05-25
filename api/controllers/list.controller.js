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
