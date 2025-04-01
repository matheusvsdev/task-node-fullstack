import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

interface AuthRequest extends Request {
  user?: string;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token)
    return res
      .status(401)
      .json({ message: "Acesso negado. Token não fornecido." });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    req.user = decoded.userId;
    next();
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expirado." });
      }
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Token inválido." });
      }
      return res
        .status(500)
        .json({ message: `Erro interno: ${error.message}` });
    }
    return res
      .status(500)
      .json({ message: "Erro desconhecido na validação do token." });
  }
};
