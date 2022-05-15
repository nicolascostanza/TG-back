import express from 'express';
import taskController from '../controllers/tasks';
import taskValidation from '../validations/tasks';

const router = express.Router();

router.post('/', taskValidation.validateCreation, taskController.createTask);
router.delete('/:id', taskController.deleteTask);

export default router;
