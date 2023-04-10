const express = require('express')
const router = express.Router()
const PUPIL = require('../models/pupil')
const imgUpload = require('../middlewares/multer')
const moment = require('moment')
// Adding pupil data 
// !if you dont use multer as middleware then formdata will be empty!! 
router.post('/', imgUpload, async (req, res) => {
    try {
        if (req.body == null) throw ('No data') //error if data is null


        let item = {
            fullName: req.body.fullName,
            dateOfBirth: moment(req.body.dateOfBirth).format("MMM Do YYYY"),
            gender: req.body.gender,
            address: req.body.address,
            email: req.body.email,
            password: req.body.password,
            photo: req.files?.image[0].path,
            parentName: req.body.parentName,
            parentPhoneNumber: req.body.parentPhoneNumber,
            emergencyName: req.body.emergencyName,
            emergencyPhoneNumber: req.body.emergencyPhoneNumber,
            emergencyRelationship: req.body.emergencyRelationship
        }
        const data = new PUPIL(item)
        await data.save()

        res.json({ message: 'Data saved successfully', status: true }).status(201)
    }
    catch (error) {
        console.log(error)
        res.json({ message: error, status: false }).status(400)
    }
})


// Reading all pupil data 
router.get('/', async (req, res) => {
    try {
        let list = await PUPIL.find({})
        res.json({ message: 'success', data: list, status: true }).status(200)
    }
    catch (error) {
        console.log(error)
        res.json({ message: error }).status(400)
    }
})

// Reading one pupil data 

router.get('/:_id', async (req, res) => {
    try {
        let _id = req.params._id
        let userOne = await PUPIL.find({ _id: _id })
        res.json({ message: 'success', data: userOne, status: true }).status(200)
    }
    catch (error) {
        console.log(error)
        res.json({ message: error }).status(400)
    }
})

// Updating one 

router.put('/:_id', imgUpload, async (req, res) => {
    try {
        let _id = req.params._id
        let body = req.body
        let updatedData = { $set: body }
        await PUPIL.findByIdAndUpdate(_id, updatedData, { new: true })
        res.json({ message: 'updated successfully!!', status: true }).status(200)
    }
    catch (error) {
        console.log(error)
        res.json({ message: error }).status(400)
    }
})


// deleting one 
router.delete('/:_id', async (req, res) => {
    try {
        let _id = req.params._id
        let deleted = await PUPIL.findByIdAndDelete({ _id })
        res.json({ message: 'deleted successfully!!', status: true }).status(200)
    }
    catch (error) {
        console.log(error)
        res.json({ message: error }).status(400)
    }
})


//get volunteers details
// Reading all NOTICE data 
router.post('/volunteer', async (req, res) => {
    try {

        let value = req.body.value;
        const data = await PUPIL.find({ _id: { $in: value } })
        res.status(200).json({ message: 'success', data: data });

    }
    catch (error) {
        console.log(error)
        res.json({ message: error }).status(400)
    }
})

module.exports = router