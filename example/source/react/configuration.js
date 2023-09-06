const React = require("react");
const hyptiotes = require("hyptiotes");

// Hyptiotes configuration to create React trees
module.exports = {
	elementInitializer: hyptiotes.PLUGINS.initiateElementObject,
	itemHandlers: [
		hyptiotes.PLUGINS.skipEmpty,
		hyptiotes.PLUGINS.textToChild,
		// modified nested to child, allows functions as tags
		{
			test: (item) =>
				Array.isArray(item) &&
				((typeof item[0] === "string" && item[0][0] === ":") ||
					typeof item[0] === "function"),
			handler: ({ item, parent, hyptiotes }) => {
				const nested = hyptiotes.castWeb(item);
				if (nested) parent.children.push(nested);
			},
		},
	],
	attributeHandlers: [hyptiotes.PLUGINS.forwardAttribute],
	elementFinalizer: ({ tag, attributes, children }) => {
		const component =
			typeof tag === "string"
				? tag.slice(1)
        // wrap render fn in hyptiotes cast to map returned tree, expose React
				: (props) => hyptiotes.castWeb(tag(props, React));
		return React.createElement(component, attributes, ...children);
	},
};
