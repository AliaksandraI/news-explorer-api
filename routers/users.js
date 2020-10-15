const express = require('express');

const router = express.Router();
const { getMyProfile} = require('../controllers/users');


router.get('/me', getMyProfile);


module.exports = router;
