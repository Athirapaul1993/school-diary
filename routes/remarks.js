const express = require('express')
const router = express.Router()
// const path = require('path')
const REMARK = require('../models/remarks')
const COMMENT = require('../models/comments')

router.post('/', async (req, res) => {
    try {
        let item = {
            remark: req.body.remark,
            studentId: req.body.studentId
        }

        const doesExist = await REMARK.findOne({ studentId: item.studentId })
        if (doesExist) {
            let newData = { $set: item }
            let existId = doesExist._id
            await REMARK.findByIdAndUpdate(existId, newData, { new: true })
            await COMMENT.deleteMany({postId:existId})
            res.json({ message: 'success',status:true }).status(200)
        }
        else {
            const data = new REMARK(item)
            await data.save()
            res.json({ message: 'Data saved successfully', status: true }).status(201)

        }
    }
    catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})



router.get('/:student_id', async (req, res) => {
    try {
       
        let _id = req.params.student_id
        let remarks = await REMARK.findOne({ studentId: _id })

        let comments = await COMMENT.find({ postId: remarks._id }).sort({_id:-1})
        res.json({data:remarks,comments:comments}).status(200)
    }
    catch (error) {
        res.status(400).send(error)
    }
})



module.exports = router