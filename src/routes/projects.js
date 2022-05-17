import express from 'express';
import projectControllers from '../controllers/projects';
import projectValidations from '../validations/projects';

const router = express.Router();

router
  .post('/', projectValidations.validateCreation, projectControllers.createProject)
  .delete('/:id', projectControllers.deleteProject)
  .put('/:id', projectControllers.updateProject)
  .get('/:id', projectControllers.getProjectById)
  .get('/', projectControllers.getAllProjects);

export default router;
