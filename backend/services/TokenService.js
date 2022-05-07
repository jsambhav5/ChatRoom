import jwt from "jsonwebtoken";
import { JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET } from "../config";
import refreshModel from "../models/refreshModel";

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

	async storeRefreshToken(token, userId) {
		try {
			await refreshModel.create({ token, userId });
		} catch (error) {
			console.log(error.message);
		}
	}

	async verifyAccessToken(accessToken) {
		return jwt.verify(accessToken, JWT_ACCESS_TOKEN_SECRET);
	}

	async verifyRefreshToken(refreshToken) {
		return jwt.verify(refreshToken, JWT_ACCESS_TOKEN_SECRET);
	}
}

export default new TokenService();
