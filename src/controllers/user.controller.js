import User from "../models/user.model";
import { generateToken } from "../utils/token.generator";
import { hashPassword,comparePassword } from "../utils/password.util";

export const createUser = async (req, res) => {
    try {
        const { names,  password, email } = req.body;
        const hashedPassword = await hashPassword(password);
        const user = await User.create({ names, password: hashedPassword, email });
        const token = generateToken(user);
        res.status(201).json({ 
            message:"User created successfully",
            data:{token} });
    } catch (error) {
        res.status(500).json({ 
            message:"failed to create user",
            error: error.message
         });
    }
}
export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        const token = generateToken(user);
        res.status(201).json({ 
            message:"User logged in successfully",
            data:{ token}});
    } catch (error) {
        res.status(500).json({ 
            message: "internal server error",
            error: error.message
         });
    }
}