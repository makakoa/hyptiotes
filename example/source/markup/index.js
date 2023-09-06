// Script for generation of example wrapper markup using Hyptiotes

// path hack to expose otherwise aliased ./hyptiotes.js inside example sources
process.env.NODE_PATH = __dirname;
require("module").Module._initPaths();
// end path hack

const hyptiotes = require("hyptiotes");
const fs = require("fs");
const path = require("path");

const configuration = require("./configuration");
const fromTemplate = require("./fromTemplate");
const EXAMPLES = require("./Examples");

hyptiotes.setElementInitializer(configuration.elementInitializer);
hyptiotes.setItemHandlers(configuration.itemHandlers);
hyptiotes.setAttributeHandlers(configuration.attributeHandlers);
hyptiotes.setElementFinalizer(configuration.elementFinalizer);

EXAMPLES.forEach((example) => {
	const markup =
		"<!DOCTYPE html>" + hyptiotes.castWeb(fromTemplate(example));
	fs.writeFileSync(
		path.join(__dirname, "../../public/" + example.id + ".html"),
		markup
	);
});

console.log("HTML files genereated");
