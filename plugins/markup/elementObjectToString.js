module.exports = ({ tag, attributes, children }) => {
	const elementName = tag.slice(1); // take off ':'
	return `<${elementName} ${stringifyAttributes(attributes)}>${children.join(
		""
	)}</${elementName}>`;
};

function stringifyAttributes(attributeObject) {
	return Object.entries(attributeObject).reduce((s, [property, value]) => {
		return s + `${property}="${value}" `;
	}, "");
}
