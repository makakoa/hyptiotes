module.exports = {
	test: (item) => item instanceof HTMLElement,
	hook: ({item, parent}) => parent.appendChild(item),
};
