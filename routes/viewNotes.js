const express = require('express');
const pages = require('../controller/homeController');
const router = express.Router();
router.get('/viewNotes', pages.viewnotes);
router.get('/viewNotes.ejs', pages.viewnotes);
module.exports = router;
