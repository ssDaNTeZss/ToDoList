const mongoose = require("mongoose");

module.exports.sendJsonResponse = (res, status, content) => {
    res.status(status);
    res.json(content);
};
