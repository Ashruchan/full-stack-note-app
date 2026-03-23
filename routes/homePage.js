const express = require('express');
const pages=require('../controller/homeController')
const router = express.Router();
router.get('/homePage.html',pages.deletepage);
module.exports=router;
