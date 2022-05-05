import mongoose from "mongoose";
import { DB_BASE_URL, DB_PORT, DB_NAME } from "../config";

const DB_URL = `mongodb://${DB_BASE_URL}:${DB_PORT}/${DB_NAME}`;

class DatabaseService {
	async connect() {
		mongoose.connect(DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		const db = mongoose.connection;

		db.on("error", console.error.bind(console, "connection error:"));
		db.once("open", () => {
			console.log("Databse Connected");
		});
	}
}

export default new DatabaseService();
