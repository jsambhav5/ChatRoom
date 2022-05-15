import crypto from "crypto";
import { MailService, HashService } from "./index";

class OtpService {
	async generateOTP() {
		const otp = crypto.randomInt(100000, 999999);
		return otp;
	}

	async sendOTP(email, OTP) {
		const subject = "ChatRoom OTP";
		const body = `<h4>Your Registration OTP for Chat-Room is ${OTP}</h4>`;

		try {
			const result = await MailService.sendMail(
				email,
				subject,
				body
			).catch((error) => console.log(error.message));

			return result;
		} catch (error) {
			console.log(error);
		}
	}

	checkOTP(hashedOTP, data) {
		const computedHash = HashService.hashOTP(data);
		return computedHash === hashedOTP;
	}
}

export default new OtpService();
