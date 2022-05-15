import { Router } from "express";
import { UserController } from "../controllers";
import { AuthMiddleware } from "../middlewares";

const router = Router();

router.post("/register", AuthMiddleware.registerAuth, UserController.register);

export default router;
