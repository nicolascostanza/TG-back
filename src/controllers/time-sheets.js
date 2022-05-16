import models from '../models/Time-sheets';

const getAllTs = async (req, res) => {
  try {
    const getAllT = await models.find({});
    if (getAllT.length <= 0) {
      return res.status(400).json({
        message: ' No Time-sheets found',
        data: null,
        error: true,
      });
    }
    return res.status(200).json({
      message: ' Data for all Time-sheets sended',
      data: getAllT,
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

const getTsById = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        message: 'Missing id parameters',
        data: null,
        error: false,
      });
    }
    const empId = await models.findById(req.params.id);
    if (empId) {
      return res.status(200).json({
        message: `The data fot the employee whit id ${req.params.id} has been sent`,
        data: empId,
        error: false,
      });
    }
    return res.status(400).json({
      message: `There are not employee whit id ${req.params.id}`,
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

const updateTimesheet = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        success: false,
        msg: 'Missing id',
      });
    }
    const result = await models.IdUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        success: false,
        msg: 'The Timesheet has not been found',
      });
    }
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: 'There was an error',
    });
  }
};

export default {
  getAllTs,
  getTsById,
  updateTimesheet,
};
