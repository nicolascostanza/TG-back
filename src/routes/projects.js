import express from 'express';
import projectsControllers from '../controllers/projects';

const router = express.Router();

router.get('/', projectsControllers.getAllTasks);
router.get('/id', projectsControllers.getTasksById);

export default router;
