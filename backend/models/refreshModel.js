import mongoose, { Schema } from "mongoose";

const refreshSchema = new Schema(
	{
		token: {
			type: String,
			requied: true,
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Refresh", refreshSchema, "tokens");
