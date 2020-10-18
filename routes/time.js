const express = require('express');
const timeController = require('../controllers/time');

const Router = express.Router();

Router.post('/get-user-time/:id',timeController.getTimeForUser);
Router.post('/create-time-for-user/:id',timeController.createTimeForUser);
Router.put('/update-time-for-user/:id',timeController.updateTimeForUser);

module.exports = Router;