import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "Acesso negado. Token não fornecido." });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    req.user = decoded.userId;
    next();
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "TokenExpiredError") {
        res.status(401).json({ message: "Token expirado." });
        return;
      }
      if (error.name === "JsonWebTokenError") {
        res.status(401).json({ message: "Token inválido." });
        return;
      }
      res.status(500).json({ message: `Erro interno: ${error.message}` });
      return;
    }
    res
      .status(500)
      .json({ message: "Erro desconhecido na validação do token." });
    return;
  }
};
