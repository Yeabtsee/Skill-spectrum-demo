import express from 'express';
import { registerUser, loginUser, allUsers, myCourse } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/',allUsers);
router.post('/mycourse', myCourse);


export default router;
