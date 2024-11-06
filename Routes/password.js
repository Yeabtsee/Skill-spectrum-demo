import express from 'express';
import {updatePassword, verifyResetToken } from '../controllers/passwordController.js';

const router = express.Router();

router.get('/:token', verifyResetToken);
router.post('/:token', updatePassword);


export default router;
