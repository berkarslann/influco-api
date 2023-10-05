const express = require('express')

const serieController = require('../controllers/serie')
const isAuth = require('../middleware/is-auth')

const router = express.Router();


router.post('/', isAuth, serieController.postSerie)
router.delete('/', isAuth, serieController.deleteSerie)

module.exports = router;