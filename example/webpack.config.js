const path = require("path");

module.exports = {
	entry: path.join(__dirname, "source/index.js"),
	output: {
		path: __dirname,
		filename: "scripts.bundle.js"
	}
};
