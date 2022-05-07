import { Router } from "express";
import { UserController } from "../controllers";
import { authMiddleware } from "../middlewares";

const router = Router();

router.post("/register", authMiddleware, UserController.register);

export default router;
