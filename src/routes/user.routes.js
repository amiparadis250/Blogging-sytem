import express from 'express';
import { userLogin,createUser } from '../controllers/user.controller';
const userRoutes = express.Router();

userRoutes.post('/signup',createUser);
userRoutes.post('/login',userLogin);

export default userRoutes;