import express from 'express';
import superAdminControllers from '../controllers/super-admins';

const router = express.Router();

router
  .get('/', superAdminControllers.getAllSuperA)
  .get('/:id', superAdminControllers.getSuperAById);
export default router;
