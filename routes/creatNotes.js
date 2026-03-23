const express = require('express');
const pages=require('../controller/homeController')
const router = express.Router();
router.get('/addNotes.ejs',pages.addnotes);
router.post('/notes',pages.saveNote);
module.exports=router;