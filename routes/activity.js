const express = require('express');

const activityController = require('../controllers/activity');
const isAuth = require('../middleware/is-auth');
const { route } = require('./auth');


const router = express.Router();

router.post('/', isAuth, activityController.postActivity)
router.get('/',  activityController.getActivity)
router.delete('/:id', isAuth, activityController.deleteActivity)

module.exports = router;