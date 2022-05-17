import express from 'express';
import employeeControllers from '../controllers/employee';
import employeeValidations from '../validations/employee';

const router = express.Router();

router
  .get('/', employeeControllers.getAllEmployees)
  .get('/:id', employeeControllers.getEmployeeById)
  .post('/', employeeValidations.creationValidation, employeeControllers.createEmployee)
  .delete('/:id', employeeControllers.deleteEmployee)
  .put('/:id', employeeValidations.updateValidation, employeeControllers.updateEmployee);

export default router;
