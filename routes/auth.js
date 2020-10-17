const express = require('express');
const authController = require('../controllers/auth');

const Router = express.Router();

Router.post('/create-user',authController.createUser);
Router.post('/login',authController.loginUser);
Router.post('/social-login',authController.socialLogin);

module.exports = Router;
