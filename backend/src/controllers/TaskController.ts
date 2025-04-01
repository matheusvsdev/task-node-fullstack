import { Request, Response } from "express";
import {
  createTask,
  getTasksByUser,
  updateTask,
  deleteTask,
} from "../services/TaskService";

export const create = async (req: Request, res: Response): Promise<void> => {
  const { title, description } = req.body;
  if (!req.user) {
    res.status(401).json({ message: "Usuário não autenticado." });
    return;
  }
  const task = await createTask(req.user, title, description);
  res.status(201).json(task);
};

export const getAll = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: "Usuário não autenticado." });
    return;
  }
  const tasks = await getTasksByUser(req.user);
  res.json(tasks);
};

export const update = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: "Usuário não autenticado." });
    return;
  }
  const updatedTask = await updateTask(req.params.id, req.user, req.body);
  if (!updatedTask) {
    res.status(404).json({ message: "Tarefa não encontrada" });
    return;
  }
  res.json(updatedTask);
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: "Usuário não autenticado." });
    return;
  }
  const success = await deleteTask(req.params.id, req.user);
  if (!success) {
    res.status(404).json({ message: "Tarefa não encontrada" });
    return;
  }
  res.json({ message: "Tarefa deletada com sucesso" });
};
