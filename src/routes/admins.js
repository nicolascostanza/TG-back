import express from 'express';
import adminsControllers from '../controllers/admins';

const router = express.Router();

router
  .get('/', adminsControllers.getAllAdmins)
  .get('/:id', adminsControllers.getAdminById);

export default router;
