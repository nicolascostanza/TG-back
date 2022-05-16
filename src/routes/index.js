import express from 'express';
import projects from './projects';
import timeSheets from './time-sheets';

const router = express.Router();
router.use('/projects', projects);
router.use('/time-sheets', timeSheets);

export default router;
