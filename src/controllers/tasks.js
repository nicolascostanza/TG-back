import Task from '../models/tasks.json';

const getAllTasks = async (req, res) => {
  try {
    const allTasks = await Task.find({});
    res.status(200).json({
      message: 'Tasks data sended',
      data: allTasks,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      data: undefined,
      error: true,
    });
  }
};

const getTasksById = async (req, res) => {
  try {
    if (req.params.id) {
      const task = await Task.findById(req.params.id);
      res.status(200).json({
        message: 'Filtered tasks by id has been sent',
        data: task,
        error: false,
      });
    } else {
      res.status(400).json({
        message: `There are not task whit id ${req.params.id}`,
        data: undefined,
        error: true,
      });
    }
  } catch (error) {
    res.status(500)({
      message: 'Internal server error',
      data: undefined,
      error: true,
    });
  }
};

export default {
  getAllTasks,
  getTasksById,
};
