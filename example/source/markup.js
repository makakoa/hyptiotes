const hyptiotes = require("../../index.js");
const fs = require("fs");
const path = require("path");

// Configure for markup generation
hyptiotes.setElementInitiator(hyptiotes.PLUGINS.initiateElementObject);
hyptiotes.setItemHandlers([
	hyptiotes.PLUGINS.skipEmpty,
	hyptiotes.PLUGINS.invokeFunction,
	hyptiotes.PLUGINS.textToChild,
	hyptiotes.PLUGINS.nestedToChild,
	hyptiotes.PLUGINS.childListsToChildren,
]);
hyptiotes.setAttributeHandlers([
	hyptiotes.PLUGINS.styleToAttributeString,
	hyptiotes.PLUGINS.functionToBoundFunctionString,
	hyptiotes.PLUGINS.forwardAttribute,
]);
hyptiotes.setElementFinalizer(hyptiotes.PLUGINS.elementObjectToString);

const EXAMPLES = [
	{
		id: "index",
		name: "Directory (Markup)",
		content: "A selection of examples created using different paradigms."
	},
	{
		id: "hook",
		name: "Hook (DOM Based)",
		bundled: true,
		content: "Rerender hooks exposed through functional interface to allow dynamic content"
	},
	{
		id: "observable",
		name: "Observable (DOM Based)",
		bundled: true,
		content: "Mapping an observable subscription to dom mutations"
	},
	// {
	// 	id: "markup",
	// 	name: "Markup (SSR)",
	// },
	// {
	// 	id: "react",
	// 	name: "React",
	// },
];

function generateMarkupFor({ name, id, bundled, content }) {

	return [
		":html",
		[
			":head",
			[":title", "Hyptiotes " + name + " Example"],
			[":style", hyptiotes.PLUGINS.styleObjectToCSS({
				body: {
					fontFamily: "system-ui",
				},
				"#main-content": {
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				},
			})],
		],
		[
			":body",
			[":h1", name],
			[':div',
			{style: {margin: "10px 0"}},
			EXAMPLES.map(({ name, id }) => {
				return [":a", { href: "/" + id + ".html", style: {margin: "4px 6px"} }, name];
			}),
		],
			content,
			bundled
				? [
						[":div", { id: "root" }],
						[":script", { src: "./" + id + ".bundle.js" }],
				  ]
				: null,
		],
	];
}

EXAMPLES.forEach((example) => {
	const markup =
		"<!DOCTYPE html>" + hyptiotes.castWeb(generateMarkupFor(example));
	fs.writeFileSync(
		path.join(__dirname, "../public/" + example.id + ".html"),
		markup
	);
});

console.log("HTML files genereated");
