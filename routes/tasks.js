const express = require('express');
const router = express.Router();
const Task = require('../models/Task')


router.post('/add-task', (req, res, next) => {
  const { body } = req;
  const { id, name } = body;
  const newTask = new Task();
  newTask.id = id;
  newTask.name = name;
  newTask.save((err, user) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Error: Server error'
      });
    }
    return res.send({
      success: true,
      message: 'Task saved!'
    });
  });
})

router.post('/remove-task', (req, res, next) => {
  const { id } = req.query;
  console.log('run remove route: ', id)
  Task.findByIdAndRemove(id, (err, task) => {
    // As always, handle any potential errors:
    if (err) return res.status(500).send(err);
    // We'll create a simple object to send back with a message and the id of the document that was removed
    // You can really do this however you want, though.
    const response = {
        message: "Todo successfully deleted",
        id: task._id
    };
    return res.status(200).send(response);
  });
})

router.get('/tasks', (req, res, next) => {
  Task.find((err, tasks) => {
    if (err) {
      console.log('err 2:', err);
      return res.send({
        success: false,
        message: 'Error: server error'
      });
    }
    if (tasks.length > 0) {
      return res.send({
        success: true,
        tasks: tasks,
        message: 'Success',
      });
    }
  })
})

module.exports = router;