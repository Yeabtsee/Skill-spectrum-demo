import express from 'express';
import { registerUser, loginUser, allUsers } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/',allUsers)


export default router;
