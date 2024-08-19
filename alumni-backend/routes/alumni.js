const express = require('express');
const router = express.Router();
const Alumni = require('../models/Alumni');

router.post('/', async (req, res) => {
  try {
    const newAlumni = new Alumni(req.body);
    await newAlumni.save();
    res.status(201).send(newAlumni);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const alumni = await Alumni.find();
    res.status(200).send(alumni);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
