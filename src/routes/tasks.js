import express from 'express';
import tasksControllers from '../controllers/tasks';

const router = express.Router();

router.get('/', tasksControllers.getAllTasks);
router.get('/:id', tasksControllers.getTasksById);

export default router;
