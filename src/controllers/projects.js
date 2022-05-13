import { models } from 'mongoose';
// import projetcs from '../models/projetcs.json';

const getAllProjects = async (req, res) => {
  try {
    const allProjects = await models.Project.find({});
    res.status(200).json(allProjects);
  } catch (error) {
    res.status(500).json({
      msg: 'Internal server error',
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    if (req.params.id) {
      const project = await models.Project.findById(req.params.id);
      res.status(200).json(project);
    } else {
      res.status(400).json({
        msg: `There are not project whit id ${req.params.id}`,
      });
    }
  } catch (error) {
    res.status(500)({
      msg: 'Internal server error',
    });
  }
};

export default {
  getAllProjects,
  getProjectById,
};
