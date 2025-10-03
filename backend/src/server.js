// npm install nodemon -D (dev dependency)
import express from "express";
import taskRouter from "./routes/tasksRouters.js";

const app = express();

app.use("/api/task", taskRouter);

app.listen(5001, () => {
  console.log("Server is running on http://localhost:5001");
});
