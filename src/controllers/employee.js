import Employee from '../models/employee';

const getAllEmployees = async (req, res) => {
  const allEmployees = await Employee.find({});
  try {
    return res.status(200).json({
      msg: 'All employees are:',
      data: allEmployees,
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

const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (employee) {
      return res.status(200).json({
        msg: `The employee with id ${req.params.id} is:`,
        data: employee,
        error: false,
      });
    }
    return res.status(400).json({
      msg: `No employee with id ${req.params.id} has been found`,
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
  getAllEmployees,
  getEmployeeById,
};
