module.exports = {
	test: item => typeof item === "string",
	handler: ({ item, parent }) => {
		const textNode = document.createTextNode(item);
		parent.appendChild(textNode);
	},
};
