import express from 'express';
import timesheetControllers from '../controllers/time-sheets';

const router = express.Router();

router
  .get('/', timesheetControllers.getAllTs)
  .get('/:id', timesheetControllers.getTsById);

export default router;
