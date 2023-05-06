const express = require("express");
const router = express.Router();
const NOTICE = require("../models/announcement");

const PUPIL = require("../models/pupil");
const { sendMailNotice } = require("../helpers/mail");

router.post("/", async (req, res) => {
  try {
    if (req.body == null) throw "No data"; //error if data is null

    let item = {
      description: req.body.description,
      type: req.body.type,
    };
    const data = new NOTICE(item);

    const savedData = await data.save();
    if (savedData) {
      let lists = await PUPIL.find({});

      for (const pupil of lists) {
        let result = await sendMailNotice(pupil.email, item);
        console.log(result);
      }
    }

    res.json({ message: "Data saved successfully", status: true }).status(201);
  } catch (error) {
    console.log(error);
    res.json({ message: error, status: false }).status(400);
  }
});

// Reading all NOTICE data
router.get("/", async (req, res) => {
  try {
    let list = await NOTICE.find({}).sort({ _id: -1 });
    res.json({ message: "success", data: list, status: true }).status(200);
  } catch (error) {
    console.log(error);
    res.json({ message: error }).status(400);
  }
});

// Reading one NOTICE data

router.get("/:_id", async (req, res) => {
  try {
    let _id = req.params._id;
    let userOne = await NOTICE.find({ _id: _id });
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
    await NOTICE.findByIdAndUpdate(_id, updatedData, { new: true });
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
    await NOTICE.findByIdAndDelete({ _id });
    res.json({ message: "deleted successfully!!", status: true }).status(200);
  } catch (error) {
    console.log(error);
    res.json({ message: error }).status(400);
  }
});

// to volunteer
router.patch("/:_id", async (req, res) => {
  try {
    let _id = req.params._id;
    let user_id = req.body.user_id;

    // const doesExist = await NOTICE.find({ volunteers:{ $in: [user_id]} })
    // if (doesExist) throw ('Already Signed in')

    await NOTICE.updateOne({ _id: _id }, { $push: { volunteers: user_id } });
    res.json({ message: "signed up successfully!!", status: true }).status(200);
  } catch (error) {
    console.log(error);
    res.json({ message: error }).status(400);
  }
});

// optOut
router.patch("/optOut/:_id", async (req, res) => {
  try {
    let _id = req.params._id;
    let user_id = req.body.user_id;

    // const doesExist = await NOTICE.find({ volunteers:{ $in: [user_id]} })
    // if (doesExist) throw ('Already Signed in')

    await NOTICE.updateOne({ _id: _id }, { $pull: { volunteers: user_id } });
    res.json({ message: "opted successfully!!", status: true }).status(200);
  } catch (error) {
    console.log(error);
    res.json({ message: error }).status(400);
  }
});

module.exports = router;
