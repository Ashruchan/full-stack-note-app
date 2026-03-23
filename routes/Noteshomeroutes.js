const express = require('express');
const pages=require('../controller/homeController')
const router = express.Router();
router.get('/', pages.home);
router.get('/note/:id', pages.noteDetail);
module.exports = router;