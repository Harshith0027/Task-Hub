import express from 'express';
import { fetchUser } from '../middlewares/fetchUser.js';
import { fetchTasks ,addTasks, deleteTasks, updateTasks } from '../controllers/TaskController.js';

const taskRouter = express.Router();
taskRouter.get("/fetchTasks", [fetchUser], fetchTasks);
taskRouter.post("/addTasks", [fetchUser], addTasks);
taskRouter.patch("/updateTasks/:id/:postId", [fetchUser], updateTasks);
taskRouter.delete("/deleteTasks/:id/:postId", [fetchUser], deleteTasks);

export default taskRouter;