
import { Router } from "express";
import { createTask, deleteTask, updateTask } from "../controllers/task.controller.js";
import { getTaskById } from "../controllers/task.controller.js";  
import { getAllTasks,  } from "../controllers/task.controller.js";
import { toggleTaskCompletion } from "../controllers/task.controller.js";

const router = Router();

// Define routes for task management
router.get("/", getAllTasks); // Get all tasks
router.get("/:id", getTaskById); // Get a single task by ID
router.post("/", createTask); // Create a new task
router.put("/:id", updateTask); // Update a task by ID
router.delete("/:id", deleteTask); // Delete a task by ID
router.patch("/:id/toggle", toggleTaskCompletion); // Toggle task completion status

// Export the router to be used in the main server file
export default router;