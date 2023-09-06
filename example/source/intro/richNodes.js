module.exports = [
	":div",
	[":h3", "Rich Nodes: Tags + Attributes + Children"],

	[
		// Tag
		":span",

		// Children
		"In typical UI trees, in addition to ",
		[
			":span",
			// Attributes
			{ style: { fontWeight: "bold" } },
			"children",
		],
		", nodes also have ",
		[":span", { style: { fontWeight: "bold" } }, "tags"],
		" and ",
		[":span", { style: { fontWeight: "bold" } }, "attributes"],
		". ",

		[":br"],
		[":br"],

		"In the basic hyptiotes convention, tags are always ",
		[":span", { style: { textDecoration: "underline" } }, "the first item"],
		" in an array and attributes are ",
		[":span", { style: { fontStyle: "italic" } }, "plain objects"],
		" within the tree. ",

		[":br"],
		[":br"],

		[
			":i",
			'Note: the default convention for hyptiotes is to prefix tag names with ":". ',
			"This is just to improve the readability of array trees and can be configured. ",
		],
	],
];
