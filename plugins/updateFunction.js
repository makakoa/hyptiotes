module.exports = {
	test: item => typeof item === "function",
	hook: ({ item, parent }) => {
		const generator = contentGenerator(item, parent);
		parent.appendChild(contentGenerator.pendingUpdate || generator);
	},
};

function contentGenerator(fn, parent) {
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
	let element = hyptiotes.spinWeb(model);

	let calledByRef = false;
	onUpdate = function () {
		const model = fn(hooks);
		const updatedElement = hyptiotes.spinWeb(model);

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