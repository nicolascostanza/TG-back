import express from 'express';
import projectControllers from './controllers/projects';
import projectValidations from './validations/projects';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app
  .post('/projects/create', projectValidations.validateCreation, projectControllers.createProject)
  .delete('/projects/:id', projectControllers.deleteProject)
  .put('/projects/edit/:id', projectValidations.validateModification, projectControllers.updateProject)
  .get('/projects/:id', projectControllers.getProjectById)
  .get('/projects/', projectControllers.getAllProjects);

export default app;
