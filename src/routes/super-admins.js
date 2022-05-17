import express from 'express';
import superAdminControllers from '../controllers/super-admins';
import superAdminValidation from '../validations/super-admins';

const router = express.Router();

router
  .get('/', superAdminControllers.getAllSuperA)
  .get('/:id', superAdminControllers.getSuperAById)
  .post('/', superAdminValidation.validateCreation, superAdminControllers.createSuperAdmin)
  .delete('/:id', superAdminControllers.deleteSuperAdmin);

export default router;
