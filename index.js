// Declare globally
hyptiotes = {
	mount: function (target, model) {
		let dom = null;
		try {
			dom = spinWeb(model, target);
		} catch (e) {
			console.error(
				"Error encountered rendering",
				e.model,
				" inside of ",
				e.parent
			);
			throw e;
		}
		target.innerHTML = "";
		if (dom) target.appendChild(dom);
	},
	style,
};
window.hyptiotes = hyptiotes;

// Convert hyptiotes model to DOM, wrapped for error handling
function spinWeb(model, parent) {
	try {
		return spinWebInternal(model, parent);
	} catch (e) {
		e.model = e.model || model;
		e.parent = e.parent || parent;
		throw e;
	}
}

function spinWebInternal(model, parent) {
	const [tag, ...children] = model;

	// Don't love that these can be anywhere, but that's how it is
	if (tag === "style") {
		style(children[0]);
		return null;
	}

	const element = document.createElement(tag);
	children.forEach((item) => {
		if (Array.isArray(item)) {
			const nested = spinWeb(item, parent);
			if (nested) element.appendChild(nested);
		} else if (item === null || item === undefined) {
			// skip
		} else if (item instanceof HTMLElement) {
      // just add
      element.appendChild(item);
		} else if (typeof item === "object") {
			// process attributes
			applyAttributes(element, item);
		} else if (typeof item === "function") {
			// mount generator element
			const generator = generatorContent(item, parent);
			element.appendChild(generator.pendingUpdate || generator);
		} else {
			// content
			const textNode = document.createTextNode(item);
			element.appendChild(textNode);
		}
	});

	return element;
}

// Set attributes, handling special properties like style and handlers correctly
function applyAttributes(element, attributes) {
	for (const [attribute, value] of Object.entries(attributes)) {
		if (attribute === "style") {
			// stringify styles
			element.setAttribute(attribute, stringifyStyleObject(value));
		} else if (typeof value === "function") {
			// hook up handler
			element[attribute] = value;
		} else {
			// non-special property
			element.setAttribute(attribute, value);
		}
	}
}

function stringifyStyleObject(styleObject) {
	return Object.entries(styleObject).reduce((s, [property, value]) => {
		return s + `${property}: ${value}; `;
	}, "");
}

function generatorContent(fn, parent) {
	let onUpdate = () => {
		throw new Error("Called update inside render");
	};
	let ref = null;
	const hooks = {
		update: (v) => onUpdate(v),
		onRef: (cb) => {
			if (ref !== null) console.warn("Called ref twice, only last is called");
			ref = (element) => {
				cb(element);
				ref = null;
			};
		},
	};

	const model = fn(hooks);
	let element = spinWeb(model);

	let calledByRef = false;
	onUpdate = function () {
		const model = fn(hooks);
		const updatedElement = spinWeb(model);

		// Swap in the updated element (or store if not mounted yet)
		const elParent = element.parentNode;
		if (elParent) {
			const next = element.nextSibling;
			elParent.removeChild(element);
			elParent.insertBefore(updatedElement, next);
		} else {
			// if no parent, we're being called from refs
			// if called twice before mounting we have a loop, abort
			if (calledByRef) {
				return console.error("Cyclical update + onRef. Aborting.");
			}
			calledByRef = true;
			element.pendingUpdate = updatedElement;
		}
		if (ref) ref(updatedElement);

		lockUpdates = false;
		calledByRef = false;
		element = updatedElement;
	};

	if (ref) ref(element);

	return element;
}

function style(data) {
	const element = document.createElement("style");
	element.innerHTML = cssify(data);
	document.head.appendChild(element);
}

function cssify(obj, prefix = "") {
	var nested = "";
	var current = mapObj(obj, function (key, val) {
		// Nested styles
		if (val !== null && typeof val === "object") {
			if (key.startsWith("@media")) {
				nested += [key, "{", cssify(val, ""), "}"].join("");
			} else {
				nested += cssify(
					val,
					key.startsWith("&") ? prefix + key.slice(1) : prefix + " " + key
				);
			}
			return "";
		}
		return [hyphenate(key), ":", val, ";"].join("");
	}).join("");
	if (!current) return nested;
	return [prefix, "{", current, "}", nested].join("");
}

// Replace any capital letter with "-<lowercase>"
function hyphenate(str) {
	return str.replace(/[A-Z]/, (match) => "-" + match.toLowerCase());
}

function mapObj(object, cb) {
	return Object.entries(object).map(([key, value]) => cb(key, value));
}

module.exports = hyptiotes;
