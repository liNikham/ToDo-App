
const express = require('express');
const jwt = require('jsonwebtoken');
const {signup} = require('../controllers/auth.controller');


const router  = express.Router();

router.post('/signup',signup);


module.exports= router;