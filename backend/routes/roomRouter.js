import { Router } from "express";
import { RoomController } from "../controllers";

const router = Router();

router.get("/hello", RoomController.hello);

export default router;
