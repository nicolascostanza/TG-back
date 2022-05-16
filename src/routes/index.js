import express from 'express';
import tasks from './tasks';
import projects from './projects';

const router = express.Router();

router.use('/tasks', tasks);
router.use('/projects', projects);

export default router;
