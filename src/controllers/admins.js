import Admins from '../models/Admins';

const getAllAdmins = async (req, res) => {
  const allAdmins = await Admins.find({});
  try {
    return res.status(200).json({
      message: 'All admins are:',
      data: allAdmins,
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

const getAdminById = async (req, res) => {
  try {
    const admin = await Admins.findById(req.params.id);
    if (admin) {
      return res.status(200).json({
        message: `Admin with ID:${req.params.id} sent:`,
        data: admin,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Admin with ID:${req.params.id} not found`,
      data: {},
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: {},
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
      message: error.message,
      data: {},
      error: true,
    });
  }
};

const updateAdmin = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        message: 'Missing ID parameter',
        data: {},
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
        message: `Admin with ID:${req.params.id} not found`,
        data: {},
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
      message: error.message,
      data: {},
      error: true,
    });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        message: 'Missing ID parameter',
        data: {},
        error: true,
      });
    }
    const result = await Admins.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        message: `Admin with ID:${req.params.id} not found`,
        data: {},
        error: true,
      });
    } return res.json({
      message: 'Admin successfully deleted',
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
  getAllAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin,
};
