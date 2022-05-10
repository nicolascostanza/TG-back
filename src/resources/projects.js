import express from 'express';
import fs from 'fs';
import projects from '../data/projects.json';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    data: projects,
  });
});

router.get('/:id', (req, res) => {
  const projectId = req.params.id;
  const project = projects.find((projectRequested) => projectId === projectRequested.id.toString());
  const validIds = projects.map((pro) => pro.id);
  if (project) {
    res.status(200).json({ project });
  } else {
    res.status(404).send(`Project with ID: ${projectId} not found. Valid IDs: ${validIds}`);
  }
});

router.post('/add', (req, res) => {
  const projectData = req.body;
  const neededKeys = ['id', 'name', 'description', 'clientName', 'startDate', 'endDate', 'projectManager', 'active',
    'adminId', 'team'];
  // Check every submitted key exists
  if (neededKeys.every((key) => Object.keys(projectData).includes(key))
  // Check every submitted key has a value
   && Object.values(projectData).every((value) => value !== '')
   // Check the project ID doesn't exist already
   && projects.every((project) => projectData.id !== project.id)) {
    projects.push(projectData);
    fs.writeFile('src/data/projects.json', JSON.stringify(projects), (err) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(201).send('Project created');
      }
    });
  } else if (projects.some((repeatedId) => projectData.id === repeatedId.id)) {
    res.status(409).send(`Project ID: ${projectData.id} already exists`);
  } else {
    res.status(400).send('Complete all fields with valid inputs');
  }
});

router.post('/:projectId/addEmployee', (req, res) => {
  const employeeData = req.body;
  const { projectId } = req.params;
  const projectToBoost = projects.find((project) => projectId === project.id.toString());
  const validIds = projects.map((pro) => pro.id);
  const neededKeys = ['employeeId', 'employeeName', 'role', 'hours', 'rate'];
  const roles = ['QA', 'PM', 'DEV', 'TL'];
  // Check if project exists
  if (!projectToBoost) {
    res.status(404).send(`Project with ID: ${projectId} not found. Valid IDs: ${validIds}`);
  }
  // Check every submitted key exists
  if (neededKeys.every((key) => Object.keys(employeeData).includes(key))
  // Check every submitted key has a value
   && Object.values(employeeData).every((value) => value !== '')
   // Check the employee ID doesn't exist already inside the team
   && projectToBoost.team.every((employee) => employeeData.employeeId !== employee.employeeId)
   // Check for valid role submitted
   && roles.some((key) => employeeData.role === key)) {
    // Check if PM and TL roles exist already inside the team
    if ((employeeData.role === 'TL' || employeeData.role === 'PM')
      && projectToBoost.team.some((e) => e.role === 'TL' || e.role === 'PM')) {
      res.status(409).send(`Role: ${employeeData.role} already exists in this team, and there can be only 1`);
    } else {
      projectToBoost.team.push(employeeData);
      fs.writeFile('src/data/projects.json', JSON.stringify(projects), (err) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(201).send('Employee added');
        }
      });
    }
  } else if (projectToBoost.team.some((team) => employeeData.employeeId === team.employeeId)) {
    res.status(409).send(`Employee ID: ${employeeData.employeeId} already exists`);
  } else if (roles.every((key) => employeeData.role !== key)) {
    res.status(406).send('Role not acceptable. Use QA, PM, DEV or TL');
  } else {
    res.status(400).send('Complete all fields with valid inputs');
  }
});

export default router;
