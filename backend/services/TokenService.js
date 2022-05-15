import jwt from "jsonwebtoken";
import { JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET } from "../config";
import { RefreshModel } from "../models";

class TokenService {
	generateTokens(payload) {
		const accessToken = jwt.sign(payload, JWT_ACCESS_TOKEN_SECRET, {
			expiresIn: "20m",
		});

		const refreshToken = jwt.sign(payload, JWT_REFRESH_TOKEN_SECRET, {
			expiresIn: "1y",
		});

		return { accessToken, refreshToken };
	}

	async storeRefreshToken(token, userId) {
		try {
			await RefreshModel.create({ token, userId });
		} catch (error) {
			console.log(error.message);
		}
	}

	async verifyAccessToken(accessToken) {
		return jwt.verify(accessToken, JWT_ACCESS_TOKEN_SECRET);
	}

	async verifyRefreshToken(refreshToken) {
		return jwt.verify(refreshToken, JWT_REFRESH_TOKEN_SECRET);
	}

	async findRefreshToken(userId, refreshToken) {
		return await RefreshModel.findOne({
			userId,
			token: refreshToken,
		});
	}

	async updateRefreshToken(oldRefreshToken, newRefreshToken) {
		return await RefreshModel.updateOne(
			{ token: oldRefreshToken },
			{ token: newRefreshToken }
		);
	}
}

export default new TokenService();
