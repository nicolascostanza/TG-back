import Employee from '../models/Employees';

const Firebase = require('../helper/firebase');

const getAllEmployees = async (req, res) => {
  // PENDING: IMPLEMENT A DOB FILTER
  const {
    firstName, lastName, email, gender, address, phone, active,
  } = req.query;
  try {
    const allEmployees = await Employee.find({
      firstName: { $regex: new RegExp(firstName || '', 'i') },
      lastName: { $regex: new RegExp(lastName || '', 'i') },
      email: { $regex: new RegExp(email || '', 'i') },
      gender: gender ?? { $in: ['Male', 'Female', 'Other'] },
      address: { $regex: new RegExp(address || '', 'i') },
      phone: { $regex: new RegExp(phone || '', 'i') },
      active: active ?? { $in: [false, true] },
      isDeleted: { $ne: true },
    }).populate('associatedProjects.projectId');
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
    const employee = await Employee.findById(req.params.id)
      .populate('associatedProjects.projectId');
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
  let firebaseUid;
  try {
    const newFirebaseUser = await Firebase.default.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });
    firebaseUid = newFirebaseUser.uid;
    await Firebase.default.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'EMPLOYEE' });
    const employee = new Employee({
      firebaseUid,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      gender: req.body.gender,
      address: req.body.address,
      dob: req.body.dob,
      password: req.body.password,
      phone: req.body.phone,
      active: req.body.active,
      associatedProjects: req.body.associatedProjects,
    });

    const result = await employee.save();
    return res.status(201).json({
      message: 'Employee has been created',
      data: result,
      fire: firebaseUid,
      error: false,
    });
  } catch (error) {
    if (firebaseUid) {
      await Firebase.default.auth().deleteUser(firebaseUid);
    }
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
    ).populate('associatedProjects.projectId');

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
    const result = await Employee
      .findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });

    if (!result) {
      return res.status(404).json({
        message: `Employee with ID:${req.params.id} not found`,
        data: {},
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Employee successfully deleted',
      data: result,
      error: false,
    });
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
