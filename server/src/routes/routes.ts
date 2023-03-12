import express from "express";
import * as userController from "../controllers/user_controller";

export const router = express.Router();

router.post("/user", userController.createUser);
router.get("/user", userController.getUser);
