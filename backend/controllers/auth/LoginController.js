import { HashService, TokenService, UserService } from "../../services";
import { UserDTO } from "../../dtos";

class LoginController {
	async login(req, res) {
		const { email, password } = req.body;
		if (!email || !password) {
			return res
				.status(400)
				.json({ message: "All Fields are Required!" });
		}

		try {
			const user = await UserService.findUser({ email });
			if (!user) {
				return res
					.status(401)
					.json({ message: "Invalid username or password" });
			}

			const hashedPassword = HashService.hashPassword(
				`${password}${email}`
			);

			if (user.password != hashedPassword) {
				return res
					.status(401)
					.json({ message: "Invalid username or password" });
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

	async logout(req, res) {
		const { refreshToken } = req.cookies;
		try {
			await TokenService.removeToken(refreshToken);
			res.clearCookie("refreshToken");
			res.clearCookie("accessToken");
		} catch (error) {
			return res.status(500).send("Internal Server Error");
		}

		return res.status(200).send("Logout Successful");
	}
}

export default new LoginController();
