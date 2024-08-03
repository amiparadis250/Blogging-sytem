
import bcrypt from "bcrypt";
export async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
}
export async function comparePassword(plainPassword, hashedPassword) {
    try {
      const result = await bcrypt.compare(plainPassword, hashedPassword);
      return result;
    } catch (error) {
      console.error("Error comparing password:", error);
      throw error;
    }
  }