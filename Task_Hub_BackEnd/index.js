import { connectToMongo } from "./db.js";
import express from "express";
import cors from "cors";
import userRouter from "./routes/UserRoute.js";
import taskRouter from "./routes/TaskRoute.js";
import path from "path";
import { fileURLToPath } from "url";

// Define __dirname manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
const dbConnect = async () => {
  await connectToMongo();
};
dbConnect();

// Initialize Express App
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", userRouter);
app.use("/api/tasks", taskRouter);

// Serve the vite.svg file
app.get("/vite.svg", (req, res) => {
  res.type("image/svg+xml");
  res.sendFile(path.join(__dirname, "../Task-Management/public/vite.svg"));
});

// Serve static files
app.use(express.static(path.join(__dirname, "dist")));
app.use(
  express.static("dist", {
    setHeaders: (res, path) => {
      if (path.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
      }
    },
  })
);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port} for local instance and if it is deployed it will run in backEnd endpoint of that site.`);
  console.log("Server is online");
});
