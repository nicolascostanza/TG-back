import express from 'express';
import adminController from '../controllers/admins';

const router = express.Router();

router.post('/', adminController.createAdmin);
router.delete('/:id', adminController.deleteAdmin);

export default router;
