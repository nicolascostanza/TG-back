import express from 'express';
import adminController from '../controllers/admins';
import adminValidation from '../validations/admins';

const router = express.Router();

router.post('/', adminValidation.validateAdmin, adminController.createAdmin);
router.delete('/:id', adminController.deleteAdmin);

export default router;
