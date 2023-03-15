import express from "express";
import { getDayMealPlanner } from "../src/controllers/mealplanner_controller";
import { router } from "./routes/mealPlanner";

// import { router } from './routes/routes';

export const app = express();
app.use(express.json());

// handlers
app.get("/health", (req, res) =>
  res.send("The eXtraordinary meal planner is alive and well!")
);

app.use("/api/v1/", router);
