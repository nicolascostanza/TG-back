import models from '../models/Time-sheets';

const getAllTs = async (req, res) => {
  try {
    const getAllT = await models.find({});
    res.status(200).json({
      message: ' Data for all Time-sheets sended',
      data: getAllT,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.details[0].message,
      data: undefined,
      error: true,
    });
  }
};

const getTsById = async (req, res) => {
  try {
    if (req.params.employeeId) {
      const empId = await models.findById(req.params.employeeId);
      res.status(200).json({
        message: `The data fot the employee whit id ${req.params.employeeId} has been sent`,
        data: empId,
        error: false,
      });
    } else {
      res.status(400).json({
        message: `There are not employee whit id ${req.params.employeeId}`,
        data: undefined,
        error: true,
      });
    }
  } catch (error) {
    res.status(500)({
      message: error.details[0].message,
      data: undefined,
      error: true,
    });
  }
};

export default {
  getAllTs,
  getTsById,
};
