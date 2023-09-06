module.exports = function styelObjectToCSS(obj, prefix = "") {
	var nested = "";
	var current = Object.entries(obj).map(([key, val]) => {
		// Nested styles
		if (val !== null && typeof val === "object") {
			if (key.startsWith("@media")) {
				nested += [key, "{", styelObjectToCSS(val, ""), "}"].join("");
			} else {
				nested += styelObjectToCSS(
					val,
					key.startsWith("&") ? prefix + key.slice(1) : prefix + " " + key
				);
			}
			return "";
		}
		return [hyphenate(key), ":", val, ";"].join("");
	}).join("");
	if (!current) return nested;
	return [prefix, "{", current, "}", nested].join("");
}

// Replace any capital letter with "-<lowercase>"
function hyphenate(str) {
	return str.replace(/[A-Z]/, (match) => "-" + match.toLowerCase());
}
