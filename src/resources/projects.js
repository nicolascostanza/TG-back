const express = require('express');

const fs = require('fs');

const router = express.Router();

const projects = require('../data/projects.json');

/* router.put('/edit', (req, res) => {
    const projectData = req.body

    res.send (projects)
}); */

router.delete('/delete/:id', (req, res) => {
  const projectId = req.params.id;
  const filteredProjects = projects.filter((project) => project.id !== projectId);
  if (projects.length === filteredProjects.length) {
    res.send('Could not delete project because it was not found');
  } else {
    fs.writeFile('src/data/projects.json', JSON.stringify(filteredProjects), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Project deleted');
      }
    });
  }
});

module.exports = router;
