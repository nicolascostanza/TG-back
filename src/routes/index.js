import express from 'express';
import admins from './admins';

const router = express.Router();

router.use('/admins', admins);

export default router;
