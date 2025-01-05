import express from 'express'
import { createUser } from '../controllers/User.Controller/createUser.controller.js';
import { loginUser } from '../controllers/User.Controller/LoginUser.controller.js';

const router = express.Router();

router.post('/register',createUser)
router.post('/login',loginUser)


export default router;