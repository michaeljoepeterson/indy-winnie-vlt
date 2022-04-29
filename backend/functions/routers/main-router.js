const express = require('express');
const router = express.Router();
const {router: userRouter} = require('./user-router');

router.use('/users', userRouter);

module.exports = {router};