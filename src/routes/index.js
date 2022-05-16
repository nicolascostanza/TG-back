import express from 'express';
import superAdminRoutes from './super-admins';
import tasks from './tasks';
import projects from './projects';

const router = express.Router();

router.use('/super-admins', superAdminRoutes);
router.use('/tasks', tasks);
router.use('/projects', projects);

export default router;
