// path hack to exposed aliased ./hyptiotes.js
process.env.NODE_PATH = __dirname;
require("module").Module._initPaths();
// end path hack

const hyptiotes = require("hyptiotes");
const fs = require("fs");
const path = require("path");

const configuration = require("./configuration");
const fromTemplate = require("./fromTemplate");

hyptiotes.setElementInitializer(configuration.elementInitializer);
hyptiotes.setItemHandlers(configuration.itemHandlers);
hyptiotes.setAttributeHandlers(configuration.attributeHandlers);
hyptiotes.setElementFinalizer(configuration.elementFinalizer);

const EXAMPLES = [
	{
		id: "index",
		name: "Directory (Markup)",
		content: "Wrapper, CSS, and sources rendered to markup",
		sources: [
			{
				name: "fromTemplate.js",
				val: readFile("./fromTemplate.js"),
			},
			{
				name: "Configuration for markup",
				val: prettyPrint(configuration),
			},
			{
				name: "index.js",
				val: readFile("./index.js"),
			},
		],
	},
	{
		id: "hook",
		name: "Hook (DOM Based)",
		bundled: true,
		content:
			"Rerender hooks exposed through functional interface to allow dynamic content",
		sources: [
			{
				name: "app.js",
				val: readFile("../hook/app.js"),
			},
			{
				name: "Configuration for hook functions",
				val: prettyPrint(require("../hook/configuration")),
			},
			{
				name: "index.js",
				val: readFile("../hook/index.js"),
			},
		],
	},
	{
		id: "observable",
		name: "Observable (DOM Based)",
		bundled: true,
		content: "Basic tree which maps observable subscriptions to dom mutations",
		sources: [
			{
				name: "app.js",
				val: readFile("../observable/app.js"),
			},
			{
				name: "Configuration for dom observables",
				val: prettyPrint(require("../observable/configuration")),
			},
			{
				name: "index.js",
				val: readFile("../observable/index.js"),
			},
		],
	},
	{
		id: "react",
		name: "React",
		bundled: true,
		content: "Mapping a Hyptiotes tree to a React tree",
		sources: [
			{
				name: "app.js",
				val: readFile("../react/app.js"),
			},
			{
				name: "Configuration for React trees",
				val: prettyPrint(require("../react/configuration")),
			},
			{
				name: "index.js",
				val: readFile("../react/index.js"),
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

EXAMPLES.forEach((example) => {
	const markup =
		"<!DOCTYPE html>" + hyptiotes.castWeb(fromTemplate(example, EXAMPLES));
	fs.writeFileSync(
		path.join(__dirname, "../../public/" + example.id + ".html"),
		markup
	);
});

console.log("HTML files genereated");
