const express = require('express')
const router = express.Router()
const {verifyAccessToken} = require('../middlewares/jwt_helper')
// api 
router.use('/uploads', express.static('uploads'))  // for image and pdf reading

router.use('/pupils',verifyAccessToken, require('./pupils'))

router.use('/remarks',verifyAccessToken, require('./remarks'))

router.use('/comments',verifyAccessToken, require('./comments'))

router.use('/calender',verifyAccessToken, require('./calender'))


router.use('/announcements',verifyAccessToken, require('./announcements'))


router.use('/auth', require('./auth'))




module.exports = router