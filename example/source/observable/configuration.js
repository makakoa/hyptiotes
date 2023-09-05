const hyptiotes = require("hyptiotes");
const LinkedObservable = require("./LinkedObservable");

// Hyptiotes base configuration with added observable to dom map
module.exports = {
	elementInitializer: hyptiotes.DEFAULT_ELEMENT_INITIALIZER,
	itemHandlers: [
    // Observable to dom handler
    {
      test: (item) => item instanceof LinkedObservable,
      handler: ({ item, parent, hyptiotes }) => {
        let element = null;
        item.map(model => {
          let updatedElement = hyptiotes.castWeb(model);
    
          const next = element && element.nextSibling;
          if (element) parent.removeChild(element);
          parent.insertBefore(updatedElement, next);
    
          element = updatedElement;
        }).terminate();
      },
    },
    ...hyptiotes.DEFAULT_ITEM_HANDLERS,
  ],
	attributeHandlers: hyptiotes.DEFAULT_ATTRIBUTE_HANDLERS,
	elementFinalizer: hyptiotes.DEFAULT_ELEMENT_FINALIZER,
};
