import Project from '../models/Projects';

const getAllProjects = async (req, res) => {
  const {
    name,
    description,
    clientName,
    startDate = new Date('1900-01-01'),
    endDate = new Date('2100-12-31'),
    projectManager,
  } = req.query;
  try {
    const allProjects = await Project
      .find({
        name: { $regex: new RegExp(name || '', 'i') },
        description: { $regex: new RegExp(description || '', 'i') },
        clientName: { $regex: new RegExp(clientName || '', 'i') },
        startDate: { $gte: new Date(startDate) },
        endDate: { $lte: new Date(endDate) },
        projectManager: { $regex: new RegExp(projectManager || '', 'i') },
      })
      .populate('team', { firstName: 1, surname: 1 })
      .populate('tasks', { taskName: 1, taskDescription: 1 });
    return res.status(200).json({
      message: ' Data for all projects has been sent',
      data: allProjects,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findOne({ _id: projectId }).populate('team', { firstName: 1, surname: 1 }).populate('tasks', { taskName: 1 });
    if (project) {
      res.status(200).json({
        message: `Data for project with id ${req.params.id} has been sent`,
        data: project,
        error: false,
      });
    } else {
      res.status(404).json({
        message: `Project not whit id ${req.params.id} found`,
        data: undefined,
        error: true,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: undefined,
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
    return res.status(500).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const result = await Project.findByIdAndDelete(req.params.id)
      .populate('team', { firstName: 1, surname: 1 })
      .populate('tasks', { taskName: 1 });
    if (!result) {
      return res.status(404).json({
        message: 'Project not found',
        data: undefined,
        error: true,
      });
    }
    return res.json({
      message: 'Project succesfully deleted',
      data: result,
      error: false,
    }).status(204);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const updateProject = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        message: 'Missing id parameter',
        data: undefined,
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
        message: 'Project not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(202).json({
      message: 'Project succesfully updated',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

export default {
  getAllProjects,
  getProjectById,
  createProject,
  deleteProject,
  updateProject,
};
