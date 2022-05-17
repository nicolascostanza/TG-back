import express from 'express';
import admins from './admins';
import projects from './projects';
import tasks from './tasks';
import superAdmins from './super-admins';
import employees from './employee';

const router = express.Router();

router.use('/admins', admins);
router.use('/projects', projects);
router.use('/employee', employees);
router.use('/tasks', tasks);
router.use('/super-admins', superAdmins);
router.use('/employees', employees);

export default router;
