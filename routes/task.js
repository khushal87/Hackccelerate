const express = require('express');
const { body } = require('express-validator');

const taskController = require('../controllers/task');

const Router = express.Router();

Router.get('/get-user-tasks/:id',taskController.getUserTasks);
Router.post('/create-task/:id',taskController.createTask);
Router.delete('/delete-task/:id',taskController.deletetask);
Router.put('/update-task/:id',taskController.updateTask);
Router.put('/mark-task-completed/:id',taskController.markTaskAsCompleted);

module.exports = Router;