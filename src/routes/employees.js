import express from 'express';
import employeeControllers from '../controllers/employees';
import employeeValidations from '../validations/employees';
import authMiddleware from '../validations/auth';

const router = express.Router();

router
  .get('/', authMiddleware, employeeControllers.getAllEmployees)
  .get('/:id', authMiddleware, employeeControllers.getEmployeeById)
  .post('/', employeeValidations.creationValidation, employeeControllers.createEmployee)
  .patch('/:id', authMiddleware, employeeControllers.deleteEmployee)
  .put('/:id', authMiddleware, employeeValidations.updateValidation, employeeControllers.updateEmployee);

export default router;
