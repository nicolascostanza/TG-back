import Project from '../models/Projects';

const getAllProjects = async (req, res) => {
  try {
    const allProjects = await Project.find({})
      .populate('team', { firstName: 1, surname: 1 })
      .populate('tasks', { taskName: 1, taskDescription: 1 });
    return res.status(200).json({
      message: 'All Projects are:',
      data: allProjects,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: {},
      error: true,
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findOne({ _id: projectId })
      .populate('team', { firstName: 1, surname: 1 })
      .populate('tasks', { taskName: 1 });
    if (project) {
      res.status(200).json({
        message: `Project with ID:${req.params.id} sent:`,
        data: project,
        error: false,
      });
    } else {
      res.status(404).json({
        message: `Project with ID:${req.params.id} not found`,
        data: {},
        error: true,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
      data: {},
      error: true,
    });
  }
};

const createProject = async (req, res) => {
  try {
    const project = new Project({
      name: req.body.name,
      description: req.body.description,
      clientName: req.body.clientName,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      projectManager: req.body.projectManager,
      team: req.body.team,
      tasks: req.body.tasks,
    });

    const result = await project.save();
    return res.status(201).json({
      message: 'Project has been created',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: {},
      error: true,
    });
  }
};

const updateProject = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        message: 'Missing id parameter',
        data: {},
        error: true,
      });
    }
    const result = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    ).populate('team', { firstName: 1, surname: 1 }).populate('tasks', { taskName: 1 });

    if (!result) {
      return res.status(404).json({
        message: `Project with ID:${req.params.id} not found`,
        data: {},
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Project succesfully updated',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: {},
      error: true,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        message: 'Missing ID parameter',
        data: {},
        error: true,
      });
    }
    const result = await Project.findByIdAndDelete(req.params.id)
      .populate('team', { firstName: 1, surname: 1 })
      .populate('tasks', { taskName: 1 });
    if (!result) {
      return res.status(404).json({
        message: `Project with ID:${req.params.id} not found`,
        data: {},
        error: true,
      });
    }
    return res.json({
      message: 'Project successfully deleted',
      data: result,
      error: false,
    }).status(204);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: {},
      error: true,
    });
  }
};

export default {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
