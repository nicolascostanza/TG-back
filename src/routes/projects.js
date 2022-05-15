import express from 'express';
import projectControllers from '../controllers/projects';

const router = express.Router();

router
  .post('/', projectControllers.createProject)
  .delete('/:id', projectControllers.deleteProject);

export default router;
