class UserDTO {
	id;
	email;
	createdAt;

	constructor(user) {
		this.id = user._id;
		this.email = user.email;
		this.createdAt = user.createdAt;
	}
}

export default UserDTO;
