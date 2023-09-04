// Just invokes any function provided as an item with no side effects
// Useful for utilizing functions to contain logic in place within tree
module.exports = {
	test: (item) => typeof item === "function",
	handler: ({ item, parent, index, hyptiotes }) => {
		hyptiotes.mapItem(item({ parent, hyptiotes }), parent, index);
	},
};
