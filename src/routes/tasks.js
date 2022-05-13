import express from 'express';
import tasks from '../controllers/tasks';

const router = express.Router();

router.get('/', tasks.getAllTasks);
router.get('/id', tasks.getTasksById);

export default router;
