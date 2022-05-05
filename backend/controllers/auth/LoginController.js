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

			// Generating Tokens
			const { accessToken, refreshToken } = TokenService.generateTokens({
				_id: user._id,
				email: user.email,
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
			const userDTO = new UserDTO(user);
			return res.status(200).send({
				message: "Login Successful",
				user: userDTO,
			});
		} catch (error) {
			console.log(error);
		}
	}

	async logout(req, res) {
		return res.status(200).send("Logout Successful");
	}
}

export default new LoginController();
