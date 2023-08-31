const PLUGINS = require("./plugins");
const style = require("./style");

// web api defaults
let initFn = (tag) => document.createElement(tag);
let finalFn = (x) => x;
let itemHooks = [
	PLUGINS.ITEMS.skipEmpty,
	PLUGINS.ITEMS.forwardNodes,
	PLUGINS.ITEMS.updateFunction,
	PLUGINS.ITEMS.textContent,
	PLUGINS.ITEMS.nestedWeb,
	PLUGINS.ITEMS.childLists,
];
let attributeHooks = [
	PLUGINS.ATTRIBUTES.inlineStyle,
	PLUGINS.ATTRIBUTES.eventHandler,
	PLUGINS.ATTRIBUTES.basicAttribute,
];

// Declare globally
hyptiotes = {
	mount: function (target, model) {
		let dom = null;
		try {
			dom = hyptiotes.spinWeb(model);
		} catch (e) {
			console.error(
				"Error encountered rendering",
				`${JSON.stringify(e.item)} index(${e.index || "ROOT"})`,
				" with ",
				e.handler || "hyptiotes",
				" from model ",
				JSON.stringify(e.model || model),
				" inside of ",
				e.parent || target
			);
			throw e;
		}
		target.innerHTML = "";
		if (dom) target.appendChild(dom);
	},
	style,
	spinWeb: (model) => {
		const [tag, ...children] = model;
		const base = initFn(tag.slice(1));
		children.forEach((item, index) => hyptiotes.mapItem(item, index, base));
		return finalFn(base);
	},
	setElementInitiator: (fn) => (initFn = fn),
	setElementFinalizer: (fn) => (finalFn = fn),
	WEB_DEFAULT: [...itemHooks],
	PLUGINS,
	setItemHandlers: (plugins) => (itemHooks = plugins),
	setAttributeHandlers: (plugins) => (attributeHooks = plugins),
	mapItem: (item, ind, base) => {
		const handler = itemHooks.find((h) => h.test(item));
		try {
			if (handler) {
				handler.hook({ item, parent: base });
			} else if (
				typeof item === "object" &&
				item !== null &&
				!Array.isArray(item)
			) {
				hyptiotes.mapAttributes(item, base);
			} else {
				throw new Error("Unhandled Item");
			}
		} catch (e) {
			e.handler = e.handler || handler;
			e.item = e.item || item;
			e.index = e.index || ind;
			e.parent = e.parent || base;
			throw e;
		}
	},
	mapAttributes: (obj, base) => {
		for (const [key, value] of Object.entries(obj)) {
			const hook = attributeHooks.find((h) => h.test(key, value));
			try {
				if (hook) {
					hook.handler({ key, value, parent: base });
				} else {
					throw new Error("Unhandled Attribute");
				}
			} catch (e) {
				e.handler = e.handler || hook;
				e.item = e.item || obj;
				e.index = e.index || key;
				e.parent = e.parent || base;
				throw e;
			}
		}
	},
};
window.hyptiotes = hyptiotes;

module.exports = hyptiotes;
