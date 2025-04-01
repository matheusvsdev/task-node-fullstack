import { Router } from "express";
import { create, getAll, update, remove } from "../controllers/TaskController";
import { authMiddleware } from "../middlewares/AuthMiddleware";

const router = Router();

router.post("/", authMiddleware, create);
router.get("/", authMiddleware, getAll);
router.put("/:id", authMiddleware, update);
router.delete("/:id", authMiddleware, remove);

export default router;