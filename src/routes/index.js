import express from 'express';
import Timesheet from './time-sheets';

const router = express.Router();
router.use('/time-sheets', Timesheet);

export default router;
