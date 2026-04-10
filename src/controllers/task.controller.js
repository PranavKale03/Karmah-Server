import Task from "../models/task.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// GET /api/v1/tasks
export const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.json({ success: true, data: tasks });
});

// POST /api/v1/tasks
export const createTask = asyncHandler(async (req, res) => {
  const { title, description, status } = req.body;

  if (!title) {
    res.status(400);
    throw new Error("Title is required");
  }

  const task = await Task.create({
    title,
    description,
    status,
  });

  res.status(201).json({
    success: true,
    data: task,
  });
});

// PATCH /api/v1/tasks/:id
export const updateTask = asyncHandler(async (req, res) => {
  const { title, description, status } = req.body;

  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  // Update provided fields
  if (title) task.title = title;
  task.description = description || "";
  if (status) task.status = status;

  await task.save();

  res.json({ success: true, data: task });
});

// DELETE /api/v1/tasks/:id
export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  res.json({ success: true, message: "Task deleted" });
});