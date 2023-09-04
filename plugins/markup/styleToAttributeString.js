module.exports = 	{
  test: (key) => key === "style",
  handler: ({ value, parent }) => {
    parent.attributes.style = stringifyStyleObject(value);
  },
};

function stringifyStyleObject(styleObject) {
	return Object.entries(styleObject).reduce((s, [property, value]) => {
		return s + `${hyphenate(property)}: ${value}; `;
	}, "");
}

// Replace any capital letter with "-<lowercase>"
function hyphenate(str) {
	return str.replace(/[A-Z]/, (match) => "-" + match.toLowerCase());
}