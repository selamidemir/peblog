const express = require('express')
const userControllers = require('../controllers/userControllers');
const router = require('./categoryRoutes');
const router = express.Router();

router.route('/').get(userControllers.getUsers)
router.route('/:id').get(userControllers.getUserById)
router.route('/').post(userControllers.createUser)
router.route('/:d').put(userControllers.updataUserById)
router.route('/:id').delete(userControllers.deleteUserById)
router.route('/:id').get(userControllers.activateUser)

module.exports = router;