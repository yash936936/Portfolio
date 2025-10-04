const express = require('express');
const router = express.Router();
const auth = require('./auth');
const Contact = require('../models/Contact');

router.get('/', async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

router.post('/', auth, async (req, res) => {
  const newContact = new Contact(req.body);
  await newContact.save();
  res.status(201).json(newContact);
});

module.exports = router;