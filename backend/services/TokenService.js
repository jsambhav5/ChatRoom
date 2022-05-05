import jwt from "jsonwebtoken";
import { JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET } from "../config";

class TokenService {
	generateTokens(payload) {
		const accessToken = jwt.sign(payload, JWT_ACCESS_TOKEN_SECRET, {
			expiresIn: "1h",
		});

		const refreshToken = jwt.sign(payload, JWT_REFRESH_TOKEN_SECRET, {
			expiresIn: "1y",
		});

		return { accessToken, refreshToken };
	}
}

export default new TokenService();
