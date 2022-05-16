import model from '../models/Admins';

const getAllAdmins = async (req, res) => {
  try {
    const allAdmins = await model.find({});
    res.status(200).json({
      msg: 'All admins are:',
      data: allAdmins,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      msg: 'There was an error',
      error: true,
    });
  }
};

const getAdminById = async (req, res) => {
  try {
    if (req.params.id) {
      const admin = await model.findById(req.params.id);
      res.status(200).json({
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
    return res.status(500).json({
      msg: 'There was an error',
      error: true,
    });
  }
};

export default {
  getAllAdmins,
  getAdminById,
};
