import {connectToMongo} from "./db.js";
import express from 'express';
import cors from 'cors';
import userRouter from "./routes/UserRoute.js";
import taskRouter from "./routes/TaskRoute.js";
import path from 'path';

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
app.get('/vite.svg', (req, res) => {
    res.type('image/svg+xml');
    res.sendFile(path.join(__dirname, '../Task-Management/public/vite.svg'));
});
// Serve other static files
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static('dist', {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  },
}));
app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
    console.log('Server is online');
});
