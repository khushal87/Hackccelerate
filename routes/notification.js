const express = require('express');
const notificationController = require('../controllers/notification');

const Router = express.Router();

Router.get('/get-user-notification/:id',notificationController.getAllNotification);

module.exports = Router;