import Admins from '../models/Admins';

const createAdmin = async (req, res) => {
  try {
    const admin = new Admins({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      active: req.body.active,
    });
    const result = await admin.save();
    return res.status(201).json({
      message: 'Admin has been created',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

const getAllAdmins = async (req, res) => {
  const allAdmins = await Admins.find({});
  try {
    return res.status(200).json({
      msg: 'All admins are:',
      data: allAdmins,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};
const deleteAdmin = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        message: 'Missing Id parameter',
        data: undefined,
        error: true,
      });
    }
    const result = await Admins.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        message: `The Admin with id ${req.params.id} has not been found`,
        data: undefined,
        error: true,
      });
    } return res.status(200).json({
      message: 'The Admin has been successfully deleted',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Internal server Error',
      data: undefined,
      error: true,
    });
  }
};
const getAdminById = async (req, res) => {
  try {
    const admin = await Admins.findById(req.params.id);
    if (admin) {
      return res.status(200).json({
        msg: `The admin with id ${req.params.id} is:`,
        data: admin,
        error: false,
      });
    }
    return res.status(400).json({
      msg: `No admin with id ${req.params.id}`,
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Internal server Error',
      data: undefined,
      error: true,
    });
  }
};

export default {
  createAdmin,
  deleteAdmin,
  getAllAdmins,
  getAdminById,
};
