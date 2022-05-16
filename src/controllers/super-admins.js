import SuperAdmin from '../models/Superadmin';

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
    return res.status(500).json({
      message: error.details[0].message,
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
    } return res.status(204).json({
      message: 'The Super Admin has been successfully deleted',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.details[0].message,
      data: undefined,
      error: true,
    });
  }
};

export default {
  createSuperAdmin,
  deleteSuperAdmin,
};
