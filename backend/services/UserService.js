import { UserModel } from "../models";
import { TokenService } from "./";

class UserService {
	async findUser(filter) {
		const user = await UserModel.findOne(filter);
		return user;
	}

	async createUser(data) {
		const user = await UserModel.create(data);
		return user;
	}

	async loginUser(res, user) {
		try {
			// Generating Tokens
			const { accessToken, refreshToken } = TokenService.generateTokens({
				id: user.id,
			});

			await TokenService.storeRefreshToken(refreshToken, user.id);

			// saving tokens in cookies
			res.cookie("refreshToken", refreshToken, {
				maxAge: 1000 * 60 * 60 * 24 * 30,
				httpOnly: true,
			});

			res.cookie("accessToken", accessToken, {
				maxAge: 1000 * 60 * 60 * 24 * 30,
				httpOnly: true,
			});

			return res;
		} catch (error) {
			console.log(error);
		}
	}
}

export default new UserService();
