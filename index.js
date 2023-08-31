const PLUGINS = require("./plugins");
const style = require("./style");

// web dom api defaults
let initFn = (tag) => document.createElement(tag);
let finalFn = (x) => x;
let itemHooks = [
	PLUGINS.ITEMS.skipEmpty,
	PLUGINS.ITEMS.forwardNodes,
	PLUGINS.ITEMS.textContent,
	PLUGINS.ITEMS.nestedWeb,
	PLUGINS.ITEMS.childLists,
];
let attributeHooks = [
	PLUGINS.ATTRIBUTES.inlineStyle,
	PLUGINS.ATTRIBUTES.eventHandler,
	PLUGINS.ATTRIBUTES.basicAttribute,
];

module.exports = hyptiotes = {
	style,
	castWeb,
	setElementInitiator: (fn) => (initFn = fn),
	setElementFinalizer: (fn) => (finalFn = fn),
	DEFAULT_ITEM_HANDLERS: [...itemHooks],
	DEFAULT_ATTRIBUTE_HANDLERS: [...attributeHooks],
	PLUGINS,
	addItemHandler: plugin => itemHooks.push(plugin),
	setItemHandlers: (plugins) => (itemHooks = plugins),
	addAttributeHandler: plugin => attributeHooks.push(plugin),
	setAttributeHandlers: (plugins) => (attributeHooks = plugins),
	mapItem,
	mapAttributes,
};

// maps entered array
function castWeb(model) {
	try {
		const [tag, ...children] = model;
		const base = initFn(tag.slice(1));
		children.forEach((item, index) => hyptiotes.mapItem(item, base, index));
		return finalFn(base);
	} catch (e) {
		console.error(
			"Error encountered rendering",
			`${JSON.stringify(e.item, (k, v) => v.toString ? v.toString().slice(0, 30) + '...' : v)} index(${e.index || "ROOT"})`,
			" with ",
			e.handler || "hyptiotes",
			" from model ",
			JSON.stringify(e.model || model),
			e.parent ? " inside of " + e.parent : "",
		);
		throw e;
	}
}

// processes items through hooks
function mapItem(item, parent, index) {
	const handler = itemHooks.find((h) => h.test(item));
	try {
		if (handler) {
			handler.handler({ item, parent, index, hyptiotes });
		} else if (
			typeof item === "object" &&
			item !== null &&
			!Array.isArray(item)
		) {
			hyptiotes.mapAttributes(item, parent);
		} else {
			throw new Error("Unhandled Item", item);
		}
	} catch (e) {
		e.handler = e.handler || handler;
		e.item = e.item || item;
		e.index = e.index || index;
		e.parent = e.parent || parent;
		throw e;
	}
}

// processes attributes within an item through hooks
function mapAttributes(obj, parent) {
	for (const [key, value] of Object.entries(obj)) {
		const hook = attributeHooks.find((h) => h.test(key, value));
		try {
			if (hook) {
				hook.handler({ key, value, parent, hyptiotes });
			} else {
				throw new Error("Unhandled Attribute");
			}
		} catch (e) {
			e.handler = e.handler || hook;
			e.item = e.item || obj;
			e.index = e.index || key;
			e.parent = e.parent || parent;
			throw e;
		}
	}
}
