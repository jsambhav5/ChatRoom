import { Router } from "express";
import { UserController } from "../controllers";
const router = Router();

router.get("/hello", UserController.hello);

export default router;
