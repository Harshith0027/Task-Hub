import express from 'express';
import { fetchUser } from '../middlewares/fetchUser.js';
import { createUser, loginUser, getUser } from '../controllers/UserController.js';

const userRouter = express.Router();
userRouter.post("/createUser", createUser);
userRouter.post("/userLogin", loginUser);
userRouter.post("/getUserData", fetchUser, getUser );

export default userRouter;