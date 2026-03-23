const express = require('express');
const pages=require('../controller/homeController')
const router = express.Router();
router.get('/deletePage', pages.deletepage);
router.get('/deletePage.html', pages.deletepage);
router.get('/delete',pages.deleteNotes);
module.exports=router;