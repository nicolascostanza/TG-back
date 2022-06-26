import express from 'express';
import register from '../controllers/auth';
import authMiddleware from '../validations/auth';

const router = express.Router();

router.post('/', authMiddleware, register);

export default router;
