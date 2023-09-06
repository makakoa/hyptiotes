const STEPS = [
	"Initialize Element",
	"Item Mapping",
	"Attribute Mapping",
	"Finalize Element",
];

module.exports = [
	":div",
	[":h3", "Tree Generation: Node Mapping"],

	"Hyptiotes facilitates tree generation as a 4 step array to node reduction for each 'element': ",

  // Variables and functional mapping
	[":ol", STEPS.map((step) => [":li", step])],

	"Each step provides an open plugin architecture which allows essentially limitless capabilities. ",

  // Inline function call
	Bonus(),

	[":h3", '"Build your own framework"'],
	"By leveraging configuration, hyptiotes makes it easy to essentially build or plug in your own framework. ",
	"Check out the other examples to see different example configurations for different app building paradigms like ",
	[
		":ul",
		[
			"generating markup",
			"creating and manipulating DOM via the DOM API",
			"creating a React tree",
		].map((paradigm) => [":li", paradigm]),
	],
  "If you want to know more about what Hyptiotes can do, check out the README"
];

function Bonus() {
	return [
		":div",
		"And since you're just dealing with JS, you can use any JS functionality available like variables, functions, or modules. ",
	];
}
