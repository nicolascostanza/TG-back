import express from 'express';
import adminsControllers from '../controllers/admins';
import adminValidation from '../validations/admins';
import authMiddleware from '../validations/auth';

const router = express.Router();

router
  .post('/', authMiddleware, adminValidation.validateAdmin, adminsControllers.createAdmin)
  .patch('/:id', authMiddleware, adminsControllers.deleteAdmin)
  .get('/', authMiddleware, adminsControllers.getAllAdmins)
  .get('/:id', authMiddleware, adminsControllers.getAdminById)
  .put('/:id', authMiddleware, adminValidation.validateAdminUpd, adminsControllers.updateAdmin);

export default router;
