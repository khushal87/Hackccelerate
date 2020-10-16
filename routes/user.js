const express = require('express');
const { body } = require('express-validator');

const userController = require('../controllers/user');

const Router = express.Router();

Router.get('/get-all-user',userController.getAllUsers);
Router.get('/get-specific-user/:id',userController.getSpecificUser);
Router.put('/update-user/:id',userController.updateUser);
Router.delete('/delete-user/:id',userController.deleteUser);
Router.put('/update-user-points/:id',userController.updateUserPoints);

module.exports = Router;