const express = require('express');

const fs = require('fs');

const router = express.Router();

const projects = require('../data/projects.json');

// Delete Project

router.delete('/delete/:id', (req, res) => {
  const projectId = req.params.id;
  const filteredProjects = projects.filter((project) => project.id !== projectId);
  if (projects.length === filteredProjects.length) {
    res.send(`No project with the id of ${req.params.id}`);
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

// Update Project

router.put('/:id', (req, res) => {
  const projectId = req.params.id;
  const filteredProjects = projects.find((project) => project.id === projectId);
  const updProject = req.body;

  if (filteredProjects) {
    projects.forEach((project) => {
      const newProject = project;
      if (project.id === projectId) {
        newProject.name = updProject.name ? updProject.name : project.name;
        newProject.description = updProject.description ? updProject.description
          : project.description;
        newProject.clientName = updProject.clientName ? updProject.clientName : project.clientName;
        newProject.startDate = updProject.startDate ? updProject.startDate : project.startDate;
        newProject.endDate = updProject.endDate ? updProject.endDate : project.endDate;
        newProject.projectManager = updProject.projectManager ? updProject.projectManager
          : project.projectManager;
        newProject.active = updProject.active ? updProject.active : project.active;
        newProject.adminId = updProject.adminId ? updProject.adminId : project.adminId;
      }
    });

    fs.writeFile('src/data/projects.json', JSON.stringify(filteredProjects), (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Project updated');
      }
    });
  } else {
    res.send(`No project with the id of ${req.params.id}`);
  }
});

// Filter list

module.exports = router;
