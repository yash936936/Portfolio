const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const auth = require('./auth');

router.get('/', async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

router.post('/', auth, async (req, res) => {
  const newProject = new Project(req.body);
  await newProject.save();
  res.status(201).json(newProject);
});

module.exports = router;