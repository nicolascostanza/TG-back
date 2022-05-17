import express from 'express';
import adminsControllers from '../controllers/admins';
import adminValidation from '../validations/admins';

const router = express.Router();

router.post('/', adminValidation.validateCreation, adminsControllers.createAdmin);
router.delete('/:id', adminsControllers.deleteAdmin);

router
  .get('/', adminsControllers.getAllAdmins)
  .get('/:id', adminsControllers.getAdminById);

export default router;
