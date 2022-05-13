import express from 'express';
import tasksControllers from '../controllers/tasksControllers';

const router = express.Router();

router.get('/', tasksControllers.getAllTasks);
router.get('/id', tasksControllers.getTasksById);

export default router;
