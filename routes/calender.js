const express = require("express");
const router = express.Router();
const CALENDER = require("../models/calender");
const PUPIL = require("../models/pupil");
const { sendMailCalender } = require("../helpers/mail");
// Adding pupil data
// !if you dont use multer as middleware then formdata will be empty!!
router.post("/", async (req, res) => {
  try {
    if (req.body == null) throw "No data"; //error if data is null

    let item = {
      title: req.body.title,
      start: req.body.start,
      end: req.body.end,
    };
    const data = new CALENDER(item);
    const savedData = await data.save();

    if (savedData) {
      let lists = await PUPIL.find({});

      for (const pupil of lists) {
        let result = await sendMailCalender(pupil.email, item);
        console.log(result);
      }
    }

    res.json({ message: "Data saved successfully", status: true }).status(201);
  } catch (error) {
    console.log(error);
    res.json({ message: error, status: false }).status(400);
  }
});

// Reading all CALENDER data
router.get("/", async (req, res) => {
  try {
    let list = await CALENDER.find({});
    res.json({ message: "success", data: list, status: true }).status(200);
  } catch (error) {
    console.log(error);
    res.json({ message: error }).status(400);
  }
});

// Reading one CALENDER data

router.get("/:_id", async (req, res) => {
  try {
    let _id = req.params._id;
    let userOne = await CALENDER.find({ _id: _id });
    res.json({ message: "success", data: userOne, status: true }).status(200);
  } catch (error) {
    console.log(error);
    res.json({ message: error }).status(400);
  }
});

// Updating one

router.put("/:_id", async (req, res) => {
  try {
    let _id = req.params._id;
    let body = req.body;
    let updatedData = { $set: body };
    await CALENDER.findByIdAndUpdate(_id, updatedData, { new: true });
    res.json({ message: "updated successfully!!", status: true }).status(200);
  } catch (error) {
    console.log(error);
    res.json({ message: error }).status(400);
  }
});

// deleting one
router.delete("/:_id", async (req, res) => {
  try {
    let _id = req.params._id;
    await CALENDER.findByIdAndDelete({ _id });
    res.json({ message: "deleted successfully!!", status: true }).status(200);
  } catch (error) {
    console.log(error);
    res.json({ message: error }).status(400);
  }
});

module.exports = router;
