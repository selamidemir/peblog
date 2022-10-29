const express = require('express')
const pageController = require('../controllers/pageControllers');
const router = express.Router();

router.route('/').get(pageController.getIndexPage);

module.exports = router;