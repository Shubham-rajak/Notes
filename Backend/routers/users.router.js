import express from 'express'

import { getUser, createUser, login, register, deleteUser, getUserById, updateUser } from '../controllers/users.controller.js'
import { auth, authenticateToken } from '../middleware/tokens.js';

const router = express.Router()

router.get('/getuser', authenticateToken ,getUser);
router.post('/createuser', createUser);
router.post('/login', login);
router.post('/signup', register);
router.delete('/deleteuser/:id', deleteUser);
router.get('/getuserbyid/:id', getUserById);
router.put('/updateuser', authenticateToken, updateUser)

export default router