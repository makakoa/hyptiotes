module.exports = {
	test: item => typeof item === "string",
	hook: ({ item, parent }) => {
		const textNode = document.createTextNode(item);
		parent.appendChild(textNode);
	},
};
