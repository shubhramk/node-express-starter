const express = require('express');
const router = express.Router();
const { list , create ,remove} = require('../controllers/category');


// validators
const { runValidation } = require('../utils/utility');
const { categoryCreateValidator } = require('../validators/category');

router.post('/category', categoryCreateValidator, runValidation, create);
router.get('/category', list);
router.delete('/category/:slug', remove);


module.exports = router;
