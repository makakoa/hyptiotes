module.exports = [
	":div",
	{ id: "main-content", style: {alignItems: "flex-start"} },
	[":h1", "Hyptiotes Basics"],

	[':span', "Follow the sources along with each section for a guided intro to Hyptiotes patterns"],

	require("./arrayTrees"),
	require("./richNodes"),
	require("./treeGeneration"),
];
