const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ''
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Task', TaskSchema);