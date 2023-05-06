const express = require("express");
const router = express.Router();
const PUPIL = require("../models/pupil");
const { imgUpload } = require("../middlewares/multer");
const moment = require("moment");
// Adding pupil data
// !if you dont use multer as middleware then formdata will be empty!!
router.post("/", imgUpload, async (req, res) => {
  try {
    if (req.body == null) throw "No data"; //error if data is null

    let item = {
      fullName: req.body.fullName,
      dateOfBirth: moment(req.body.dateOfBirth).format("MMM Do YYYY"),
      gender: req.body.gender,
      address: req.body.address,
      email: req.body.email,
      password: req.body.password,
      photo: req.files?.image[0].path,

      emergencyName: req.body.emergencyName,
      emergencyPhoneNumber: req.body.emergencyPhoneNumber,
      emergencyRelationship: req.body.emergencyRelationship,
      teacher: true,
      admin: false,
    };
    const data = new PUPIL(item);
    await data.save();

    res.json({ message: "Data saved successfully", status: true }).status(201);
  } catch (error) {
    console.log(error);
    res.json({ message: error, status: false }).status(400);
  }
});

module.exports = router;
