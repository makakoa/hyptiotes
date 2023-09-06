const hyptiotes = require("hyptiotes");

// Hyptiotes base configuration with added function hook interface
module.exports = {
	elementInitializer: hyptiotes.DEFAULT_ELEMENT_INITIALIZER,
	itemHandlers: [
    hyptiotes.PLUGINS.functionToHookInserts,
    ...hyptiotes.DEFAULT_ITEM_HANDLERS,
  ],
	attributeHandlers: hyptiotes.DEFAULT_ATTRIBUTE_HANDLERS,
	elementFinalizer: hyptiotes.DEFAULT_ELEMENT_FINALIZER,
};
