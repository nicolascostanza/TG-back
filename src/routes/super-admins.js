import express from 'express';
import superAdminControllers from '../controllers/super-admins';
import superAdminValidation from '../validations/super-admins';
import authMiddleware from '../validations/auth';

const router = express.Router();

router
  .get('/', authMiddleware, superAdminControllers.getAllSuperA)
  .get('/:id', authMiddleware, superAdminControllers.getSuperAById)
  .post('/', authMiddleware, superAdminValidation.validateCreation, superAdminControllers.createSuperAdmin)
  .patch('/:id', authMiddleware, superAdminControllers.deleteSuperAdmin)
  .put('/:id', authMiddleware, superAdminValidation.validateUpdate, superAdminControllers.updateSuperAdmin);

export default router;
