import Task from "../models/task.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// @desc    Get all tasks
// @route   GET /api/v1/tasks
// @access  Private
export const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json({ success: true, data: tasks });
});

// @desc    Create a new task
// @route   POST /api/v1/tasks
// @access  Private
export const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, dueDate } = req.body;

  if (!title) {
    res.status(400);
    throw new Error("Title is required");
  }

  const task = await Task.create({
    title,
    description,
    status,
    dueDate,
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    data: task,
  });
});

// @desc    Update a task
// @route   PATCH /api/v1/tasks/:id
// @access  Private
export const updateTask = asyncHandler(async (req, res) => {
  const { title, description, status, dueDate } = req.body;

  const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

  if (!task) {
    res.status(404);
    throw new Error("Task not found or unauthorized");
  }

  if (title) task.title = title;
  task.description = description || "";
  if (status) task.status = status;
  if (dueDate !== undefined) task.dueDate = dueDate;

  await task.save();

  res.json({ success: true, data: task });
});

// @desc    Delete a task
// @route   DELETE /api/v1/tasks/:id
// @access  Private
export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  res.json({ success: true, message: "Task deleted" });
});