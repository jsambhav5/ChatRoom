import mongoose, { Schema } from "mongoose";

const refreshSchema = new Schema(
	{},
	{
		timestamps: true,
	}
);

export default mongoose.model("Refresh", refreshSchema, "tokens");
