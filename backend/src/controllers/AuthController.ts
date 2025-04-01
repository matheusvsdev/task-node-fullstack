import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/AuthService";
import { userSchema } from "../validators/UserValidator";
import { errorResponse } from "../utils/ErrorResponse";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      errorResponse(res, 400, error.details[0].message, req);
    }
    const { name, email, password } = req.body;
    const user = await registerUser(name, email, password);

    if (!user) {
      errorResponse(res, 409, "Email já está em uso.", req);
    }

    const { password: _, __v, updatedAt, ...userResponse } = user?.toObject();

    res.status(201).json({
      message: "Usuário registrado com sucesso!",
      user: userResponse,
    });
  } catch (error) {
    errorResponse(res, 500, "Erro interno no servidor.", req);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const token = await loginUser(email, password);

    if (!token) {
      errorResponse(res, 401, "Credenciais inválidas.", req);
      return;
    }

    res.json({ token });
  } catch (error) {
    errorResponse(res, 500, "Erro interno no servidor.", req);
  }
};
