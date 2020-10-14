const express = require('express');
const { celebrate, Joi } = require('celebrate');

const router = express.Router();
const { getMyProfile} = require('../controllers/users');


router.get('/me', getMyProfile);


module.exports = router;
