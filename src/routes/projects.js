import express from 'express';
import projectControllers from '../controllers/projects';
import projectValidations from '../validations/projects';

const router = express.Router();

router
  .post('/', projectValidations.validateCreation, projectControllers.createProject)
  .patch('/:id', projectControllers.deleteProject)
  .put('/:id/employee', projectControllers.pushEmployee)
  .put('/:id/task', projectControllers.pushTask)
  .put('/:id', projectValidations.validateModification, projectControllers.updateProject)
  .get('/', projectControllers.getAllProjects)
  .get('/:id', projectControllers.getProjectById);

export default router;
