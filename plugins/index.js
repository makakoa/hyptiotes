module.exports = {
	// dom
	appendDeepChildren: require("./dom/appendDeepChildren"),
	appendNested: require("./dom/appendNested"),
	appendNodes: require("./dom/appendNodes"),
	appendTextNodes: require("./dom/appendTextNodes"),
	functionToHookInserts: require("./dom/functionToHookInserts"),
	setInlineStyle: require("./dom/setInlineStyle"),
	setAttributeFunction: require("./dom/setAttributeFunction"),
	setAttribute: require("./dom/setAttribute"),

	// util
	childListsToChildren: require("./util/childListsToChildren"),
	forwardAttribute: require("./util/forwardAttribute"),
	initiateElementObject: require("./util/initiateElementObject"),
	invokeFunction: require("./util/invokeFunction"),
	nestedToChild: require("./util/nestedToChild"),
	skipEmpty: require("./util/skipEmpty"),
	styleObjectToCSS: require("./util/styleObjectToCSS"),
	textToChild: require("./util/textToChild"),

	// markup
	elementObjectToString: require("./markup/elementObjectToString"),
	functionToBoundFunctionString: require("./markup/functionToBoundFunctionString"),
	styleToAttributeString: require("./markup/styleToAttributeString"),
};
