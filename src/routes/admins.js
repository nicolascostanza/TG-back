import express from 'express';
import adminsControllers from '../controllers/admins';
import adminValidation from '../validations/admins';

const router = express.Router();

router
  .post('/', adminValidation.validateAdmin, adminsControllers.createAdmin)
  .delete('/:id', adminsControllers.deleteAdmin)
  .get('/', adminsControllers.getAllAdmins)
  .get('/:id', adminsControllers.getAdminById)
  .put('/:id', adminValidation.validateAdminUpd, adminsControllers.updateAdmin);

export default router;
