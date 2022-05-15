import { TokenService } from "../services";

class AuthMiddleware {
	async registerAuth(req, res, next) {
		try {
			const { accessToken } = req.cookies;
			if (!accessToken) {
				throw new Error();
			}
			const userData = await TokenService.verifyAccessToken(accessToken);

			if (!userData.email) {
				throw new Error();
			}
			console.log(!userData.email);
			req.user = userData;
			next();
		} catch (error) {
			res.status(401).json({ message: "Invalid Token" });
		}
	}

	async userAuth(req, res, next) {
		try {
			const { accessToken } = req.cookies;
			if (!accessToken) {
				throw new Error();
			}
			const userData = await TokenService.verifyAccessToken(accessToken);
			if (!userData.id) {
				throw new Error();
			}
			req.user = userData;
			next();
		} catch (error) {
			res.status(401).json({ message: "Invalid Token" });
		}
	}
}

export default new AuthMiddleware();
