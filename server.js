const app = require("./src/index");
const port = process.env.PORT || 3000;

app.listen(port, (req, res) => {
	console.log("Server running on port:", port);
});