const catchAsync = require('../utils/catchAsync');
const mongoose = require('mongoose');
const AppError = require('../utils/appError');

exports.createOne = catchAsync(async (req, res, next) => {
  const { itemBody } = req.body;
  if (!itemBody) {
    res.status(500).json({
      status: 'fail',
      message: 'Invalid Body Provided',
    });
  }
  const items = {
    Fish: 600,
    Meat: 700,
    Chicken: 550,
    Egg: 100,
    Milk: 300,
    Butter: 900,
    Noodles: 350,
    Fruit: 450,
    Vegetable: 250,
    Snacks: 650,
  };
  let sum = 0;
  Object.keys(items).map((item) => {
    itemBody.map((item1) => {
      if (item1 === item) {
        sum += items[item];
      }
    });
  });
  if (sum < 1000) {
    res.status(201).json({
      status: 'success',
      message: 'Insufficient',
    });
  } else if (sum > 1000 && sum < 1500) {
    res.status(201).json({
      status: 'success',
      message: 'Sufficient',
    });
  } else {
    res.status(201).json({
      status: 'success',
      message: 'overconsumption',
    });
  }
});
