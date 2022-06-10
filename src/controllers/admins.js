import Admins from '../models/Admins';

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admins.find(req.query);
    if (admins.length < 1) {
      return res.status(404).json({
        message: 'Admins has not been found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'All admins are:',
      data: admins,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      data: error.message,
      error: true,
    });
  }
};

const getAdminById = async (req, res) => {
  try {
    const admin = await Admins.findById(req.params.id);
    if (admin) {
      return res.status(200).json({
        message: 'The admin is:',
        data: admin,
        error: false,
      });
    }
    return res.status(404).json({
      message: `The Admin with id ${req.params.id} has not been found`,
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      error: true,
    });
  }
};

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
      message: 'Admin successfully deleted',
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

const updateAdmin = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        message: 'Missing id parameter',
        data: undefined,
        error: true,
      });
    }
    const result = await Admins.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        message: `The Admin with id ${req.params.id} has not been found`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Admin successfully updated',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      error: true,
    });
  }
};

export default {
  getAllAdmins,
  getAdminById,
  createAdmin,
  deleteAdmin,
  updateAdmin,
};
