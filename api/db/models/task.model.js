const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    date_of_creation: {
        type: String,
        required: true
    },
    date_of_change: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: false,
        minlength: 1,
        trim: true
    },
    date_of_completion: {
        type: String,
        required: false
    },
    _listId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    important: {
        type: Boolean,
        default: false
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = { Task };
