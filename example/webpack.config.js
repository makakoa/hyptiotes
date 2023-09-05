const path = require("path");

const isDev = process.env.NODE_ENV === "development";

const extended = isDev
	? {
			mode: "development",
			devtool: "eval-cheap-source-map",
			devServer: {
				static: {
					directory: path.join(__dirname, "public"),
				},
				compress: true,
				port: 9000,
			},
	  }
	: {};

module.exports = {
	entry: {
		hook: path.join(__dirname, "source/hook/index.js"),
		observable: path.join(__dirname, "source/observable/index.js"),
		react: path.join(__dirname, "source/react/index.js"),
	},
	output: {
		path: path.join(__dirname, "public"),
		filename: "[name].bundle.js",
	},
  resolve: {
    alias: {
      hyptiotes$: path.resolve(__dirname, '../index.js'),
		}
	},	
	...extended,
};