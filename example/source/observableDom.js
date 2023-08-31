const LinkedObservable = require("./LinkedObservable");

// Maps observable items to web on change through dom api
module.exports = {
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
};
