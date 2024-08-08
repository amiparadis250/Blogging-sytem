import express from 'express';
import { userLogin,createUser } from '../controllers/user.controller';
const userRoutes = express.Router();
import validateUser from '../validations/user.validations';

userRoutes.post('/signup',validateUser,createUser);
userRoutes.post('/login',userLogin);

export default userRoutes;