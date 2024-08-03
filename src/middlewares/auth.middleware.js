import jwt from 'jsonwebtoken';
import { generateToken } from '../utils/token.generator';

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET,
      async (err, user) => {
        if (err)
          return res.status(401).json({
            message: 'Unauthorized request, try again',
          });
        else {
          req.user = user;
          next();
        }
      }
    );
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong',
      error: error?.message,
    });
  }
};