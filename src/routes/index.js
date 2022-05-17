import express from 'express';
import tasks from './tasks';
import projects from './projects';
import employees from './employee';

const router = express.Router();

router.use('/tasks', tasks);
router.use('/projects', projects);
router.use('/employee', employees);

export default router;
