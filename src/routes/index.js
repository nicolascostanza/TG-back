import express from 'express';
import employeeRoutes from './employee';
import tasks from './tasks';
import projects from './projects';

const router = express.Router();

router.use('/employee', employeeRoutes);
router.use('/tasks', tasks);
router.use('/projects', projects);

export default router;
