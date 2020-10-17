const express = require('express');
const { body } = require('express-validator');

const foodController = require('../controllers/food');

const Router = express.Router();

Router.post('/create-food/:id',foodController.createFood);
Router.post('/get-daily-food',foodController.getFoodByDate);
Router.post('/get-daily-calories-sum',foodController.getDailyCalorieIntakeTotal);

module.exports = Router;