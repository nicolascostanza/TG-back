import Admin from '../models/Admins';

const getAllAdmins = async (req, res) => {
  const allAdmins = await Admin.find({});
  try {
    return res.status(200).json({
      message: 'All admins are:',
      data: allAdmins,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
      error: true,
    });
  }
};

const getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (admin) {
      return res.status(200).json({
        message: 'The admin is:',
        data: admin,
        error: false,
      });
    }
    return res.status(400).json({
      message: 'Missing id parameter',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
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
    const result = await Admin.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        message: 'Admin not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Admin succesfully updated',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
      error: true,
    });
  }
};

export default {
  getAllAdmins,
  getAdminById,
  updateAdmin,
};
