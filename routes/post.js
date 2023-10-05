const express = require('express');


const postController = require('../controllers/post');
const isAuth = require('../middleware/is-auth')
// const isInfluencer = require('../middleware/is-influencer')
// const isInfluencer = require('../middleware/is-influencer')

const router = express.Router();


router.post('/',  isAuth , postController.createPost)
router.delete('/', isAuth, postController.deletePost)


module.exports = router;