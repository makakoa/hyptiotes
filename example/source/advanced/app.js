const intro = [
	":div",
	"Configuration is really the secret sauce of Hyptiotes. ",
	"To fully understand what Hyptiotes can do and does do, you first ",
	"need to understand how it works and how configuration plays in. ",
];

const mapping = [
	":div",
	[":h3", "Element (Array) Reduction"],
	"As mentioned in Basics, Hyptiotes is essentially a configured tree ",
	"mapper which breaks the process down into 4 simple steps. ",
	[
		":ol",
		[
			"Initialize Element",
			"Item Mapping",
			"Attribute Mapping",
			"Finalize Element",
		].map((s) => [":li", s]),
	],
	'Where "items" are ',
	[":b", "handled"],
	' children in the array besides tags. And "attributes" are ',
	[":b", "unhandled plain"],
	' objects in the array. And "mapping" is simply deciding what to with each ',
	"relative to the parent element by running ",
	[":i", "handlers"],
	" on each item. ",

	[":br"],
	[":br"],

	"What makes this element reduction a tree mapping, is the inclusion of an ",
	"item mapper which calls the hyptiotes reduction (castWeb) on nested elements. ",
];

const simplestConfiguration = [
	":div",
	[":h3", "Simplest Configuration: Static DOM Tree Mapping"],

	[":h4", "1. Initialize Element"],
	"Basically ",
	[":code", "document.createElement"],
	" but with an added ",
	[":code", "tag.slice(1)"],
	' to remove the ":" prefix. Hyptiotes provides the first element in the ',
	'element array as the "tag".',

	[":h4", "2. Item Mapping"],
	"We define two item handlers. Each handler has a ",
	[":code", "test"],
	" function which hyptiotes calls to check if the ",
	[":code", "handler"],
	" should be used. ",

	[":br"],
	[":br"],

	"The first handler checks for strings in the children ",
	"and appends them as text nodes. ",

	[":br"],
	[":br"],

	"The second handler checks for nested hyptiotes arrays and ",
	"recursively casts them to elements with hyptiotes before appending them.",

	[":h4", "3. Attribute Mapping"],
	"The simplest attribute map is to simply call ",
	[":code", "element.setAttribute"],

	[":h4", "4. Finalize Element"],
	"Finally, since our element is finished we don't need to do anything and ",
	"can just forwrad the element. ",
];

const moreComplete = [
	":div",
	[":h3", "A Better Static Tree Configuration"],
	"From here we can add any number of handlers to make our arrays a little more ",
	"flexible. Some additions we might consider: ",
	[
		":ul",
		[
			"Skip null items",
			"Directly append child HTMLElements",
			"Invoke function items",
			"Unnest arrays that aren't hyptiotes arrays",
			"Convert style attribute object values to strings",
			"Set function attributes directly on the element",
		].map((i) => [":li", i]),
	],
	"The beauty of configuration is you decide what pattern works for you!",
];

const dynamicTree = [
	":div",
	[":h3", "Dynamic Trees?"],
	"The trick with hyptiotes is that reduction pieces can be as complex as you wish. ",
	"Including handlers which may do further dom manipulations at a later time! ",
	"Now that you understand the basics, try to see if you can understand how the ",
	"other examples are working. ",
];

module.exports = [
	":div",
	{ id: "main-content", style: {alignItems: "flex-start"} },
	[":h1", "Configuration: Understanding Hyptiotes"],

	intro,
	mapping,
	simplestConfiguration,
	moreComplete,
	dynamicTree,
];
