import Employee from '../models/Employees';

const getAllEmployees = async (req, res) => {
  const allEmployees = await Employee.find({});
  try {
    return res.status(200).json({
      message: 'All employees are:',
      data: allEmployees,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: {},
      error: true,
    });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (employee) {
      return res.status(200).json({
        message: `Employee with ID:${req.params.id} sent:`,
        data: employee,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Employee with ID:${req.params.id} not found`,
      data: {},
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: {},
      error: true,
    });
  }
};

const createEmployee = async (req, res) => {
  try {
    const employee = new Employee({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      gender: req.body.gender,
      address: req.body.address,
      dob: req.body.dob,
      password: req.body.password,
      phone: req.body.phone,
      active: req.body.active,
    });

    const result = await employee.save();
    return res.status(201).json({
      message: 'Employee has been created',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: {},
      error: true,
    });
  }
};

const updateEmployee = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        message: 'Missing ID parameter',
        data: {},
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
        message: `Employee with ID:${req.params.id} not found`,
        data: {},
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Employee succesfully updated',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: {},
      error: true,
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        message: 'Missing ID parameter',
        data: {},
        error: true,
      });
    }
    const result = await Employee.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).json({
        message: `Employee with ID:${req.params.id} not found`,
        data: {},
        error: true,
      });
    }
    return res.json({
      message: 'Employee successfully deleted',
      data: result,
      error: false,
    }).status(204);
  } catch (error) {
    return res.json({
      message: error.message,
      data: {},
      error: true,
    });
  }
};

export default {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
