import express from 'express';
import projectControllers from '../controllers/projects';
import projectValidations from '../validations/projects';

const router = express.Router();

router
  .post('/create', projectValidations.validateCreation, projectControllers.createProject)
  .delete('/:id', projectControllers.deleteProject)
  .put('/edit/:id', projectValidations.validateModification, projectControllers.updateProject)
  .get('/:id', projectControllers.getProjectById)
  .get('/', projectControllers.getAllProjects);

export default router;
