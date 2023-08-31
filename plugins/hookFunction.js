// Interface to integrate dynamic function powered dom
// Function items are called with functional hooks provided as params
// These hooks (recast, onRefChange, onCleanup) handle dom access
module.exports = {
	test: (item) => typeof item === "function",
	handler: ({ item, parent, hyptiotes }) => {
		contentGenerator(item, parent, hyptiotes.castWeb);
	},
};

function contentGenerator(generate, parent, cast) {
	let onUpdate;
	let cleanupCbs = [];
	let refCb = null;

	// Define exposed hooks
	const hooks = {
		recast: (v) => onUpdate(v),
		onRefChange: (cb) => {
			if (refCb !== null) console.warn("Called onRefChange twice, only last is called");
			refCb = (element) => {
				cb(element);
				refCb = null;
			};
		},
		onCleanup: (fn) => cleanupCbs.push(fn),
	};

	let element = null;
	function renderer() {
		onUpdate = lockedUpdate;
		cleanupCbs.forEach((fn) => fn()); // this should be a mutationobserver to catch removed in subtree
		cleanupCbs = [];

		const model = generate(hooks);
		const updatedElement = cast(model);

		const next = element && element.nextSibling;
		if (element) parent.removeChild(element);
		parent.insertBefore(updatedElement, next);

		if (refCb) refCb(updatedElement);

		onUpdate = renderer;
		element = updatedElement;
	}

	function lockedUpdate() {
		throw new Error("Called update inside render (update is cyclical)");
	}

	// Initial render
	renderer();
}
