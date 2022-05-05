import { Router } from "express";
import {
	OtpController,
	LoginController,
	RefreshController,
} from "../controllers";

const router = Router();

router.post("/sendOTP", OtpController.newOTP);
router.post("/verifyOTP", OtpController.verifyOTP);
router.post("/login", LoginController.login);
router.post("/hello", RefreshController.hello);

export default router;
