const express = require('express');

const feedController = require('../controllers/feed');
const isAuth = require('../middleware/is-auth')

const router = express.Router();

//GET Influencers
router.get('/influencer', feedController.getInfluencers)
router.get('/influencer/:id', feedController.getSingleInfluencer)

//GET Brands
router.get('/brands', feedController.getBrands)
router.get('/brand/:id', feedController.getSingleBrand)

//follow an influencer as an user
router.post('/influencer/:id', isAuth, feedController.postFollow)

//subscribe to a serie as an user
router.post('/serie/:id', isAuth, feedController.postSubsSerie)

module.exports = router;