import express from 'express';
import adminsControllers from '../controllers/admins';

const router = express.Router();

router
  .get('/', adminsControllers.getAllAdmins)
  .get('/:id', adminsControllers.getAdminById)
  .put('/:id', adminsControllers.updateAdmin);

export default router;
