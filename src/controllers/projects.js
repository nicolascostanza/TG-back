import models from '../models/projects.json';

const getAllProjects = async (req, res) => {
  try {
    const allProjects = await models.Project.find({});
    res.status(200).json({
      message: ' Data for all projects sended',
      data: allProjects,
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

const getProjectById = async (req, res) => {
  try {
    if (req.params.id) {
      const project = await models.Project.findById(req.params.id);
      res.status(200).json({
        message: `The data fot the project whit id ${req.params.id} has been sent`,
        data: project,
        error: false,
      });
    } else {
      res.status(400).json({
        message: `There are not project whit id ${req.params.id}`,
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
  getAllProjects,
  getProjectById,
};
