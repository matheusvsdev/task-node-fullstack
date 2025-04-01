import TaskModel, { ITask } from "../models/TaskModel";

export const createTask = async (
  userId: string,
  title: string,
  description?: string
): Promise<ITask> => {
  return await TaskModel.create({ userId, title, description });
};

export const getTasksByUser = async (userId: string): Promise<ITask[]> => {
  return await TaskModel.find({ userId }).sort({ createdAt: -1 });
};

export const updateTask = async (
  taskId: string,
  userId: string,
  data: Partial<ITask>
): Promise<ITask | null> => {
  return await TaskModel.findOneAndUpdate({ _id: taskId, userId }, data, {
    new: true,
  });
};

export const deleteTask = async (
  taskId: string,
  userId: string
): Promise<boolean> => {
  const deleted = await TaskModel.findOneAndDelete({ _id: taskId, userId });
  return !!deleted;
};
