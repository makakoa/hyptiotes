module.exports = (({ tag, attributes, children }) => {
	return `<${tag} ${stringifyAttributes(attributes)}>${children.join(
		""
	)}</${tag}>`;
});

function stringifyAttributes(attributeObject) {
	return Object.entries(attributeObject).reduce((s, [property, value]) => {
		return s + `${property}="${value}" `;
	}, "");
}