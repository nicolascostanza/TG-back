import express from 'express';
import projectControllers from '../controllers/projects';
import projectValidations from '../validations/projects';
import authMiddleware from '../validations/auth';

const router = express.Router();

router
  .post('/', authMiddleware, projectValidations.validateCreation, projectControllers.createProject)
  .patch('/:id', authMiddleware, projectControllers.deleteProject)
  .put('/:id', authMiddleware, projectValidations.validateModification, projectControllers.updateProject)
  .get('/', authMiddleware, projectControllers.getAllProjects)
  .get('/:id', authMiddleware, projectControllers.getProjectById);

export default router;
