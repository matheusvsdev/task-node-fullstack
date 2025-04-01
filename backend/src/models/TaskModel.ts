import mongoose from "mongoose";

export interface ITask extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  status: "pending" | "completed";
  createdAt: Date;
}

const TaskSchema = new mongoose.Schema<ITask>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const TaskModel = mongoose.model<ITask>("Task", TaskSchema);

export default TaskModel;
