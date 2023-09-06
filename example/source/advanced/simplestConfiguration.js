// Initialize element as dom element given the first item in array
hyptiotes.setElementInitializer(tag => document.createElement(tag.slice(1)));

hyptiotes.setItemHandlers([
  // If the current child item is a string: append a text node
  {
    test: item => typeof item === "string",
    handler: ({ item, parent }) => {
      const textNode = document.createTextNode(item);
      parent.appendChild(textNode);
    },
  },

  // If the current child item is a nested hyptiotes array: 
  // recursively cast it with Hyptiotes and append
  {
    test: item => Array.isArray(item) && typeof item[0] === "string" && item[0][0] === ":",
    handler: ({item, parent, hyptiotes}) => {
      const nested = hyptiotes.castWeb(item);
      if (nested) parent.appendChild(nested);
    }
  },
]);
hyptiotes.setAttributeHandlers([
  // For each attribute, simply call setAttribute api
  {
    test: () => true,
    handler: ({key, value, parent}) => {
      parent.setAttribute(key, value);
    }
  }
]);

// Element is already ready
hyptiotes.setElementFinalizer(el => el);