const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URL = process.env.DB_URL;

const dbConnect = async () => {
	try {
		await mongoose.connect(MONGODB_URL);
		console.log("Connected to database...");
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
	}
};

module.exports = dbConnect;
