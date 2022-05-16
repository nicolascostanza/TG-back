import TimeSheets from '../models/Time-sheets';

const getAllTs = async (req, res) => {
  try {
    const getAllT = await TimeSheets.find({});
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
    const empId = await TimeSheets.findById(req.params.id);
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

export default {
  getAllTs,
  getTsById,
};
