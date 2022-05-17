import SuperAdminsSchema from '../models/Superadmin';

const getAllSuperA = async (req, res) => {
  try {
    const allSuperA = await SuperAdminsSchema.find({});
    return res.status(200).json({
      msg: 'The list has been found',
      data: allSuperA,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      msg: error,
      data: undefined,
      error: true,
    });
  }
};

const getSuperAById = async (req, res) => {
  try {
    const superAdmin = await SuperAdminsSchema.findById(req.params.id);
    if (superAdmin) {
      return res.status(200).json({
        msg: 'This ID has been found',
        data: superAdmin,
        error: false,
      });
    }
    return res.status(404).json({
      msg: 'this ID has not been found',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status().json({
      msg: error,
      data: undefined,
      error: true,
    });
  }
};

export default {
  getAllSuperA,
  getSuperAById,
};
