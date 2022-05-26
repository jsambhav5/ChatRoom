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
		this.avatar = user.avatar;
		this.createdAt = user.createdAt;
	}
}

export default UserDTO;
