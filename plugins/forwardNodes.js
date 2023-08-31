module.exports = {
	test: (item) => item instanceof HTMLElement,
	handler: ({item, parent}) => parent.appendChild(item),
};
