import mongoose, { Schema } from "mongoose";

const roomSchema = new Schema(
	{},
	{
		timestamps: true,
	}
);

export default mongoose.model("Room", roomSchema, "rooms");
