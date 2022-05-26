import mongoose, { Schema } from "mongoose";
import { BASE_URL, BACK_END_PORT } from "../config";

const userSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		avatar: {
			type: String,
			required: true,
			get: (avatar) => {
				return `${BASE_URL}:${BACK_END_PORT}${avatar}`;
			},
		},
	},
	{
		timestamps: true,
		toJSON: { getters: true },
	}
);

export default mongoose.model("User", userSchema, "users");
