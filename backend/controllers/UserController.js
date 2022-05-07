import { UserService, HashService } from "../services";
import { UserDTO } from "../dtos";
import Jimp from "jimp";
import path from "path";

class UserController {
	async register(req, res) {
		const { email, name, password, avatar } = req.body;
		if (!email || !name || !password || !avatar) {
			return res
				.status(400)
				.json({ message: "All Fields are Required!" });
		}

		const user = await UserService.findUser({ email });

		if (user) {
			user.id = user._id;
			const response = UserService.loginUser(res, user);
			const userDTO = new UserDTO(user);
			response.status(200).send({
				message: "Login Successful",
				user: userDTO,
			});
		}

		const imagePath = `${Date.now()}-${Math.round(
			Math.random() * 1e9
		)}.png`;

		// Image Processing
		try {
			const buffer = Buffer.from(
				avatar.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
				"base64"
			);

			const jimResp = await Jimp.read(buffer);
			jimResp
				.resize(150, Jimp.AUTO)
				.write(path.resolve(__dirname, `../storage/${imagePath}`));
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.json({ message: "Could not process the image" });
		}

		try {
			const hashedPassword = HashService.hashPassword(
				`${password}${email}`
			);

			const user = await UserService.createUser({
				email,
				name,
				password: hashedPassword,
				avatar: `/storage/${imagePath}`,
			});

			const userDTO = new UserDTO(user);
			const response = await UserService.loginUser(res, user);
			response.status(201).send({
				message: "User Created",
				user: userDTO,
			});
		} catch (error) {
			return res.status(500).json({ message: "Could not Create User" });
		}
	}
}

export default new UserController();
