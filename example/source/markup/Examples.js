const fs = require("fs");
const path = require("path");
const configuration = require("./configuration");

module.exports = [
	{
		id: "index",
		name: "Basics",
		bundled: true,
		sources: [
      {
        name: "index.js",
        val: readFile("../intro/index.js"),
      },
      {
        name: "app.js",
        val: readFile("../intro/app.js"),
      },
			{
				name: "arrayTrees.js",
				val: readFile("../intro/arrayTrees.js"),
			},
			{
				name: "richNodes.js",
				val: readFile("../intro/richNodes.js"),
			},
			{
				name: "treeGeneration.js",
				val: readFile("../intro/treeGeneration.js"),
			},
		],
	},
	{
		id: "advanced",
		name: "Configuration: Understanding Hyptiotes",
		bundled: true,
		sources: [
      {
        name: "index.js",
        val: readFile("../advanced/index.js"),
      },
      {
        name: "The Simplest Hyptiotes Configuration",
        val: readFile("../advanced/simplestConfiguration.js"),
      },
			{
        name: "More Complete Static DOM Tree Configuration",
				val: prettyPrint(require("../advanced/configuration")),
			},
		],
	},  
	{
		id: "hook",
		name: "Example: Hooks (DOM API)",
		bundled: true,
		sources: [
      {
        name: "index.js",
        val: readFile("../hook/index.js"),
      },
      {
        name: "configuration.js",
        val: readFile("../hook/configuration.js"),
      },
			{
				name: "app.js",
				val: readFile("../hook/app.js"),
			},
			{
				name: "Hook Function Plugin (functionToHookInserts.js)",
				val: readFile("../../../plugins/dom/functionToHookInserts.js"),
			},
			{
				name: "Full Configuration",
				val: prettyPrint(require("../hook/configuration")),
			},
		],
	},
	{
		id: "observable",
		name: "Example: Observable (DOM API)",
		bundled: true,
		sources: [
      {
      name: "index.js",
      val: readFile("../observable/index.js"),
      },
      {
        name: "configuration.js",
        val: readFile("../observable/configuration.js"),
      },
			{
				name: "app.js",
				val: readFile("../observable/app.js"),
			},
			{
				name: "Full Configuration",
				val: prettyPrint(require("../observable/configuration")),
			},
		],
	},
	{
		id: "react",
		name: "Example: Hyptiotes x React",
		bundled: true,
		sources: [
      {
        name: "index.js",
        val: readFile("../react/index.js"),
      },
			{
				name: "configuration.js",
        val: readFile("../react/configuration.js"),
			},
			{
				name: "app.js",
				val: readFile("../react/app.js"),
			},
			{
				name: "Full Configuration",
				val: prettyPrint(require("../react/configuration")),
			},
		],
	},
	{
		id: "markup",
		name: "Example: Demo Wrapper (Markup)",
		sources: [
      {
        name: "index.js",
        val: readFile("./index.js"),
      },
			{
				name: "configuration.js",
        val: readFile("./configuration.js"),
			},
			{
				name: "fromTemplate.js",
				val: readFile("./fromTemplate.js"),
			},
			{
				name: "Full Configuration",
				val: prettyPrint(configuration),
			},
		],
	},
];

function prettyPrint(obj) {
	return JSON.stringify(
		obj,
		(k, v) => (typeof v === "function" ? "__f" + v.toString() + "f__" : v), // mark fn string ends
		2
	)
		.replace(/("__f|f__")/g, "") // remove quotations around functions
		.replace(/\\"/g, '"') // remove quotation escapes
		.replace(/\\n/g, "\n") // fix newlines
		.replace(/\\t/g, "\t"); // fix tabs
}

function readFile(f) {
	return fs.readFileSync(path.join(__dirname, f), "utf-8");
}
