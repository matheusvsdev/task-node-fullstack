import { Request } from "express";

declare module "express" {
  export interface Request {
    user?: string; // O TypeScript agora reconhece req.user em qualquer lugar!
  }
}
