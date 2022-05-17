import express from 'express';
import timesheetControllers from '../controllers/time-sheets';
import TimesheetValid from '../validations/time-sheets';

const router = express.Router();

router
  .post('/', TimesheetValid.TimesheetValidation, timesheetControllers.createTimeSheet)
  .delete('/:id', timesheetControllers.deleteTimesheet);

export default router;
