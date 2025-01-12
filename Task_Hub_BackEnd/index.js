import {connectToMongo} from "./db.js";
import express from 'express';
import cors from 'cors';
import userRouter from "./routes/UserRoute.js";
import taskRouter from "./routes/TaskRoute.js";

const dbConnect = async () => {
    await connectToMongo();
};
dbConnect();
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
app.use("/api/auth",userRouter);
app.use("/api/tasks",taskRouter);
app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
    console.log('Server is online');
});