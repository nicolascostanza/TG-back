import express from 'express';
import employeeControllers from '../controllers/employee';
import employeeValidations from '../validations/employee';

const router = express.Router();

router
  .post('/', employeeValidations.creationValidation, employeeControllers.createEmployee)
  .delete('/', employeeValidations.deletionValidation, employeeControllers.deleteEmployee);

export default router;
