import { BASE_URL, BACK_END_PORT } from "../config";

class UserDTO {
	id;
	email;
	name;
	avatar;
	createdAt;

	constructor(user) {
		this.id = user._id;
		this.email = user.email;
		this.name = user.name;
		this.avatar = user.avatar
			? `${BASE_URL}:${BACK_END_PORT}${user.avatar}`
			: null;
		this.createdAt = user.createdAt;
	}
}

export default UserDTO;
