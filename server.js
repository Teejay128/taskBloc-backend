const app = require("./src/index");
const dbConnect = require("./src/utils/database");
const port = process.env.PORT || 3000;
require("dotenv").config();

dbConnect();

app.listen(port, (req, res) => {
	console.log("Server running on port:", port);
});
