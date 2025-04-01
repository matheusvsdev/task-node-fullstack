import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import UserModel, { IUser } from "../models/UserModel";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export const registerUser = async (
  name: string,
  email: string,
  password: string
): Promise<IUser | null> => {
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) return null;

  const newUser = new UserModel({ name, email, password });
  await newUser.save();
  return newUser;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<string | null> => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return null;
  };

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) return null;

  return jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "2h" });
};
