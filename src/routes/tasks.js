import express from 'express';
import tasksControllers from '../controllers/tasks';
import tasksValidations from '../validations/tasks';

const router = express.Router();

router.post('/', tasksValidations.validateCreation, tasksControllers.createTask);
router.delete('/:id', tasksControllers.deleteTask);
router.put('/:id', tasksValidations.validateUpdate, tasksControllers.updateTask);

export default router;
