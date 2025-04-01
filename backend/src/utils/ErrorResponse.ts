import { Response, Request } from "express";

export const errorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  req: Request
) => {
  return res.status(statusCode).json({
    message,
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
  });
};
