import SuperAdmin from '../models/Superadmin';

const getAllSuperA = async (req, res) => {
  try {
    const allSuperA = await SuperAdmin.find({});
    return res.status(200).json({
      message: 'The list has been found',
      data: allSuperA,
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

const createSuperAdmin = async (req, res) => {
  try {
    const superAdmin = new SuperAdmin({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      active: req.body.active,
    });

    const result = await superAdmin.save();
    return res.status(201).json({
      message: 'Super Admin created',
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

const getSuperAById = async (req, res) => {
  try {
    const superAdmin = await SuperAdmin.findById(req.params.id);
    if (superAdmin) {
      return res.status(200).json({
        message: 'This ID has been found',
        data: superAdmin,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'this ID has not been found',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

const deleteSuperAdmin = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        message: 'Missing Id parameter',
        data: undefined,
        error: true,
      });
    }
    const result = await SuperAdmin.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        message: `The Super Admin with ID ${req.params.id} has not been found`,
        data: undefined,
        error: true,
      });
    } return res.status(200).json({
      message: 'The Super Admin has been successfully deleted',
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

const updateSuperAdmin = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(404).json({
        message: 'Missing id parameter',
        data: undefined,
        error: true,
      });
    }
    const result = await SuperAdmin.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    if (!result) {
      return res.status(404).json({
        message: 'Super Admin has not been found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Super Admin succesfully updated',
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

export default {
  getAllSuperA,
  getSuperAById,
  createSuperAdmin,
  deleteSuperAdmin,
  updateSuperAdmin,
};
