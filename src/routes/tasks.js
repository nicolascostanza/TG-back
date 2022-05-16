import express from 'express';
import tasksControllers from '../controllers/tasks';
import tasksValidations from '../validations/tasks';

const router = express.Router();

router
  .get('/', tasksControllers.getAllTasks)
  .get('/:id', tasksControllers.getTasksById)
  .post('/', tasksValidations.validateCreation, tasksControllers.createTask)
  .delete('/:id', tasksControllers.deleteTask);

export default router;
