// Configure hyptiotes for markup (string) generation
module.exports = {
	elementInitializer: hyptiotes.PLUGINS.initiateElementObject,
	itemHandlers: [
		hyptiotes.PLUGINS.skipEmpty,
		hyptiotes.PLUGINS.invokeFunction,
		hyptiotes.PLUGINS.textToChild,
		hyptiotes.PLUGINS.nestedToChild,
		hyptiotes.PLUGINS.childListsToChildren,
	],
	attributeHandlers: [
		hyptiotes.PLUGINS.styleToAttributeString,
		hyptiotes.PLUGINS.functionToBoundFunctionString,
		hyptiotes.PLUGINS.forwardAttribute,
	],
	elementFinalizer: hyptiotes.PLUGINS.elementObjectToString,
};
