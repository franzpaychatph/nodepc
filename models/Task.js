const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide name.'],
        trim: true,
        maxlength: [20, 'name cannot be more than equal to 20 chars.']
    },
    completed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Task', TaskSchema);//1st param should be singular