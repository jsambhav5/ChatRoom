import { OtpService, HashService } from "../../services";
import { UserService, TokenService } from "../../services";
import { UserDTO } from "../../dtos";
import { GMAIL_EMAIL_FROM } from "../../config";

class OtpController {
	async newOTP(req, res) {
		const { email } = req.body;
		if (!email) {
			return res.status(400).json({ message: "Email is Required" });
		}

		// Generating OTP
		const otp = await OtpService.generateOTP();

		// Hashing OTP
		const ttl = 1000 * 60 * 2;
		const expires = Date.now() + ttl;
		const data = `${email}.${otp}.${expires}`;
		const hash = HashService.hashOTP(data);

		// send-OTP
		try {
			const result = await OtpService.sendOTP(email, otp);

			if (result.envelope.from !== GMAIL_EMAIL_FROM) {
				return res.status(500).json({
					message: "Unable to send OTP",
				});
			}

			return res.status(200).json({
				email,
				hash: `${hash}.${expires}`,
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: "Failed to send OTP" });
		}
	}

	async verifyOTP(req, res) {
		const { otp, hash, email } = req.body;
		if (!otp || !hash || !email) {
			return res
				.status(400)
				.json({ message: "All Fields are Required!" });
		}

		const [hashedOTP, expires] = hash.split(".");
		if (Date.now() > +expires) {
			return res.status(400).json({ message: "OTP Expired!" });
		}

		try {
			// Verifying OTP
			const data = `${email}.${otp}.${expires}`;
			const isValid = OtpService.checkOTP(hashedOTP, data);

			if (!isValid) {
				return res.status(401).json({ message: "Invalid OTP" });
			}

			const user = await UserService.findUser({ email });
			if (!user) {
				// Generating Tokens
				const { accessToken, refreshToken } =
					TokenService.generateTokens({ email });

				// saving tokens in cookies
				res.cookie("refreshToken", refreshToken, {
					maxAge: 1000 * 60 * 60 * 24 * 30,
					httpOnly: true,
				});

				res.cookie("accessToken", accessToken, {
					maxAge: 1000 * 60 * 60 * 24 * 30,
					httpOnly: true,
				});
				return res.status(200).json({ message: "OTP Verified" });
			}

			const userDTO = new UserDTO(user);
			const response = await UserService.loginUser(res, user);
			response.status(200).send({
				message: "Login Successful",
				user: userDTO,
			});
		} catch (error) {
			console.log(error);
		}
	}
}

export default new OtpController();
