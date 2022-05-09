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
    res.status(200).json(
      'Project not found',
    );
  }
});

router.post('/add', (req, res) => {
  const projectData = req.body;
  projects.push(projectData);
  fs.writeFile('src/data/projects.json', JSON.stringify(projects), (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('Project created');
    }
  });
  res.send('ok');
});

module.exports = router;
