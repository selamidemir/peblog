const express = require('express')

const tagControllers = require('../controllers/tagControllers')

const router = express.Router();

router.route('/').get(tagControllers.getTags)
router.route('/:id').get(tagControllers.getTabById)
router.route('/').post(tagControllers.createTag)
router.route('/:id').put(tagControllers.updateTagById)
router.route('/:id').delete(tagControllers.deleteTag)

module.exports = router;