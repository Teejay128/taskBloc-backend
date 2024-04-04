const app = require("./src/index");
const dbConnect = require("./src/utils/database");

require("dotenv").config();

const port = process.env.PORT || 3000;
dbConnect();

app.listen(port, (req, res) => {
	console.log("Server running on port:", port);
});
