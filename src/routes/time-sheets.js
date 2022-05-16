import express from 'express';
import timesheetControllers from '../controllers/time-sheets';
import TimesheetValidation from '../validations/time-sheets';

const router = express.Router();

router
  .get('/', timesheetControllers.getAllTs)
  .get('/:id', timesheetControllers.getTsById)
  .put('/:id', timesheetControllers.updateTimesheet, TimesheetValidation);

export default router;
