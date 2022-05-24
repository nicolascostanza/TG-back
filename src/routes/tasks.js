import express from 'express';
import tasksControllers from '../controllers/tasks';
import tasksValidations from '../validations/tasks';

const router = express.Router();

router.get('/', tasksControllers.getAllTasks);
router.get('/:id', tasksControllers.getTasksById);
router.post('/', tasksValidations.validateCreation, tasksControllers.createTask);
router.delete('/:id', tasksControllers.deleteTask);
router.put('/:id', tasksValidations.validateCreation, tasksControllers.updateTask);

export default router;
