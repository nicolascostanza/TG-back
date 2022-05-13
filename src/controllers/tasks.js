import { models } from 'mongoose';
// import tasks from '../models/tasks.json';

const getAllTasks = async (req, res) => {
  try {
    const allTasks = await models.Task.find({});
    res.status(200).json(allTasks);
  } catch (error) {
    res.status(500).json({
      msg: 'Internal server error',
    });
  }
};

const getTasksById = async (req, res) => {
  try {
    if (req.params.id) {
      const task = await models.Task.findById(req.params.id);
      res.status(200).json(task);
    } else {
      res.status(400).json({
        msg: `There are not task whit id ${req.params.id}`,
      });
    }
  } catch (error) {
    res.status(500)({
      msg: 'Internal server error',
    });
  }
};

export default {
  getAllTasks,
  getTasksById,
};
