const express = require('express')
const router = express.Router()
const COMMENTS = require('../models/comments')


router.post('/', async (req, res) => {
    try {
        let item = {
           text: req.body.text,
           userId: req.body.userId ,
           postId: req.body.postId
        }

        const data = new COMMENTS(item)
        await data.save()
        let comments = await COMMENTS.find({ postId: item.postId }).sort({_id:-1})

        res.json({ comments:comments,status:true }).status(201)
    }
    catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})






module.exports = router