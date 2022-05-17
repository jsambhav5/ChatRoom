import { UserDTO } from "../../dtos";
import { TokenService, UserService } from "../../services";

class RefreshController {
	async refresh(req, res) {
		// Get refresh token from header
		const { refreshToken: refreshTokenFromCookie } = req.cookies;

		// Check validity
		let userData;
		try {
			userData = await TokenService.verifyRefreshToken(
				refreshTokenFromCookie
			);
		} catch (error) {
			return res.status(401).json({ message: "Invalid Token" });
		}

		if (userData.email) {
			const { accessToken, refreshToken } = TokenService.generateTokens({
				email: userData.email,
			});

			// saving tokens in cookies
			res.cookie("refreshToken", refreshToken, {
				maxAge: 1000 * 60 * 60 * 24 * 30,
				httpOnly: true,
			});

			res.cookie("accessToken", accessToken, {
				maxAge: 1000 * 60 * 60 * 24 * 30,
				httpOnly: true,
			});
			return res.status(200).json({
				message: "Tokens refreshed",
				email: userData.email,
			});
		}

		// Check is token is in database
		try {
			const token = await TokenService.findRefreshToken(
				userData.id,
				refreshTokenFromCookie
			);
			if (!token) {
				return res.status(401).json({ message: "Invalid Token" });
			}
		} catch (error) {
			return res.status(500).json({ message: "Internal Server Error" });
		}

		// Check for user in Database
		let user;
		try {
			user = await UserService.findUser({ _id: userData.id });
			if (!user) {
				return res.status(404).json({ message: "User Not Found" });
			}
		} catch (error) {
			return res.status(500).json({ message: "Internal Server Error" });
		}

		// Generate new tokens
		const { accessToken, refreshToken } = TokenService.generateTokens({
			id: userData.id,
		});

		// Update Refresh Token in Database
		try {
			TokenService.updateRefreshToken(
				refreshTokenFromCookie,
				refreshToken
			);
		} catch (error) {
			return res.status(500).json({ message: "Internal Server Error" });
		}

		// saving tokens in cookies
		res.cookie("refreshToken", refreshToken, {
			maxAge: 1000 * 60 * 60 * 24 * 30,
			httpOnly: true,
		});

		res.cookie("accessToken", accessToken, {
			maxAge: 1000 * 60 * 60 * 24 * 30,
			httpOnly: true,
		});

		// sending tokens in response
		const userDTO = new UserDTO(user);
		return res.status(200).json({
			message: "Tokens refreshed",
			user: userDTO,
		});
	}
}

export default new RefreshController();
