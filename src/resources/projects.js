const express = require('express');

const router = express.Router();
const fs = require('fs');
const projects = require('../data/projects.json');

router.get('/', (req, res) => {
  res.status(200).json({
    data: projects,
  });
});

router.get('/:id', (req, res) => {
  const projectId = req.params.id;
  const project = projects.find((projectRequested) => projectId === projectRequested.id.toString());
  if (project) {
    res.status(200).json({
      project,
    });
  } else {
    res.status(404).send('Project not found');
  }
});

router.post('/add', (req, res) => {
  const projectData = req.body;
  const neededKeys = ['id', 'name', 'description', 'clientName', 'startDate', 'endDate', 'projectManager', 'active', 'adminId', 'team'];
  if (neededKeys.every((key) => Object.keys(projectData).includes(key))
   && Object.values(projectData).every((value) => value !== '')
   && projects.every((repeatedId) => projectData.id !== repeatedId.id)) {
    projects.push(projectData);
    fs.writeFile('src/data/projects.json', JSON.stringify(projects), (err) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(201).send('Project created');
      }
    });
  } else if (projects.some((repeatedId) => projectData.id === repeatedId.id)) {
    res.status(400).send(`ID: ${projectData.id} already exists`);
  } else {
    res.status(400).send('Complete all fields with valid inputs');
  }
});

module.exports = router;
