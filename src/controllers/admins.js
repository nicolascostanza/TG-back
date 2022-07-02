import Admins from '../models/Admins';

const Firebase = require('../helper/firebase');

const getAllAdmins = async (req, res) => {
  try {
    const {
      firstName, lastName, email, active,
    } = req.query;
    const admins = await Admins.find({
      firstName: { $regex: new RegExp(firstName || '', 'i') },
      lastName: { $regex: new RegExp(lastName || '', 'i') },
      email: { $regex: new RegExp(email || '', 'i') },
      active: active ?? { $in: [false, true] },
    });
    if (admins.length < 1) {
      return res.status(404).json({
        message: 'Admins has not been found',
        data: {},
        error: true,
      });
    }
    return res.status(200).json({
      message: 'All admins are:',
      data: admins,
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

const getAdminById = async (req, res) => {
  try {
    const admin = await Admins.findById(req.params.id);
    if (admin) {
      return res.status(200).json({
        message: `Admin with ID:${req.params.id} sent:`,
        data: admin,
        error: false,
      });
    }
    return res.status(404).json({
      message: `Admin with ID:${req.params.id} not found`,
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

const createAdmin = async (req, res) => {
  let firebaseUid;
  try {
    const newFirebaseUser = await Firebase.default.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });
    firebaseUid = newFirebaseUser.uid;
    await Firebase.default.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'ADMIN' });
    const admin = new Admins({
      firebaseUid,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      active: req.body.active,
    });
    const result = await admin.save();
    return res.status(201).json({
      message: 'Admin has been created',
      data: result,
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

const updateAdmin = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        message: 'Missing ID parameter',
        data: {},
        error: true,
      });
    }
    const result = await Admins.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        message: `Admin with ID:${req.params.id} not found`,
        data: {},
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Admin successfully updated',
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

const deleteAdmin = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        message: 'Missing ID parameter',
        data: {},
        error: true,
      });
    }
    const result = await Admins
      .findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
    if (!result) {
      return res.status(404).json({
        message: `Admin with ID:${req.params.id} not found`,
        data: {},
        error: true,
      });
    } return res.status(200).json({
      message: 'Admin successfully deleted',
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

export default {
  getAllAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin,
};
