module.exports = function style(data) {
	const element = document.createElement("style");
	element.innerHTML = cssify(data);
	document.head.appendChild(element);
};

function cssify(obj, prefix = "") {
	var nested = "";
	var current = mapObj(obj, function (key, val) {
		// Nested styles
		if (val !== null && typeof val === "object") {
			if (key.startsWith("@media")) {
				nested += [key, "{", cssify(val, ""), "}"].join("");
			} else {
				nested += cssify(
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

function mapObj(object, cb) {
	return Object.entries(object).map(([key, value]) => cb(key, value));
}
