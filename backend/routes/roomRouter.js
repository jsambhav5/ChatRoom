import { Router } from "express";
import { RoomController } from "../controllers";

const router = Router();

router.post("/", RoomController.create);
router.get("/", RoomController.index);
router.get("/:roomId", RoomController.show);

export default router;
