import crypto from "crypto";
import { OTP_HASH_SECRET, PASSWORD_HASH_SECRET } from "../config";

class HashService {
	hashOTP(data) {
		return crypto
			.createHmac("sha256", OTP_HASH_SECRET)
			.update(data)
			.digest("hex");
	}

	hashPassword(data) {
		return crypto
			.createHmac("sha256", PASSWORD_HASH_SECRET)
			.update(data)
			.digest("hex");
	}
}

export default new HashService();
