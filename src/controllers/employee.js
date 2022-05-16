import Employee from '../models/employee';

const createEmployee = async (req, res) => {
  try {
    console.log(req.body);
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
      error: error.details[0].message,
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).json({
        msg: 'missing Id param',
      });
    }

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
      error: error.details[0].message,
    });
  }
};

export default {
  createEmployee,
  deleteEmployee,
};
