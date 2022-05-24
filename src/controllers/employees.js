import Employee from '../models/Employees';

const getAllEmployees = async (req, res) => {
  const allEmployees = await Employee.find({});
  try {
    return res.status(200).json({
      msg: 'All employees are:',
      data: allEmployees,
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
    return res.status(400).json({
      message: 'error',
      data: undefined,
      error: true,
    });
  }
};

const createEmployee = async (req, res) => {
  try {
    const employee = new Employee({
      firstName: req.body.firstName,
      surname: req.body.surname,
      email: req.body.email,
      gender: req.body.gender,
      adress: req.body.adress,
      dob: req.body.dob,
      password: req.body.password,
      phone: req.body.phone,
      active: req.body.active,
    });

    const result = await employee.save();
    return res.status(201).json({
      msg: 'Employee has been successfuly created',
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      msg: 'There has been an error',
      error: `the error is: ${error}`,
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const result = await Employee.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).json({
        msg: `The employee with an id of ${req.params.id} has not been found or does not exist`,
      });
    }
    return res.status(200).json({
      msg: `The employee with former id of ${req.params.id} has been succesfully deleted`,
    });
  } catch (error) {
    return res.json({
      msg: 'There has been an error',
      error: `the error is: ${error}`,
    });
  }
};

const updateEmployee = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        message: 'Missing id parameter',
        data: undefined,
        error: true,
      });
    }
    const result = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    if (!result) {
      return res.status(404).json({
        message: 'Employee not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(202).json({
      message: 'Employee succesfully updated',
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
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  deleteEmployee,
  updateEmployee,
};
