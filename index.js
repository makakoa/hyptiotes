// Hyptiotes spin webs known for speed, flexibility, and power
//
// Goal: Rework building web with little magic and little inconvenience
//
// Means: Leverage the best of vanilla, bridging only the least smooth interfaces. particularly:
//  - the separation of view, logic, and style
//  - abstract handling ƒor basic events (like click and hover)
//
// Concepts:
//  - Flip the paradigm of logic powered markup to be markup powered logic
//  - Web has quirks, don't hide them
//

hyptiotes = {
	mount: function (target, model) {
		const dom = spinWeb(model, target);
		target.innerHTML = "";
		target.appendChild(dom);
	},
};
window.hyptiotes = hyptiotes;

// Convert hyptiotes model to DOM
function spinWeb(model, parent) {
  const [tag, ...children] = model;

	const element = document.createElement(tag);
	children.forEach((item) => {
		if (Array.isArray(item)) {
			const nested = spinWeb(item, parent);
			element.appendChild(nested);
		} else if (item === null || item === undefined) {
			// skip
		} else if (typeof item === "object") {
			// process attributes
			applyAttributes(element, item);
		} else if (typeof item === "function") {
			// mount generator element
      const generator = generatorContent(item, parent);
      element.appendChild(generator.pendingUpdate || generator);
		} else {
			// content
			const textNode = document.createTextNode(item);
			element.appendChild(textNode);
		}
	});

	return element;
}

// Set attributes, handling special properties like style and handlers correctly
function applyAttributes(element, attributes) {
	for (const [attribute, value] of Object.entries(attributes)) {
		if (attribute === "style") {
			// stringify styles
			element.setAttribute(attribute, stringifyStyleObject(value));
		} else if (typeof value === "function") {
			// hook up handler
			element[attribute] = value;
		} else {
			// non-special property
			element.setAttribute(attribute, value);
		}
	}
}

function stringifyStyleObject(styleObject) {
	return Object.entries(styleObject).reduce((s, [property, value]) => {
		return s + `${property}: ${value}; `;
	}, "");
}

function generatorContent(fn, parent) {
  let onUpdate = () => {throw new Error('Called update inside render')}
  let ref = null
  const hooks = {
    update: (v) => onUpdate(v),
    onRef: (cb) => {
      if (ref !== null) console.warn('Called ref twice, only last is called');
      ref = (element) => {
        cb(element);
        ref = null;
      }
    }
  };

  const model = fn(hooks);
  let element = spinWeb(model);

  let calledByRef = false;
  onUpdate = function() {
    const model = fn(hooks);
    const updatedElement = spinWeb(model);
    
    // Swap in the updated element (or store if not mounted yet)
    const elParent = element.parentNode;
    if (elParent) {
      const next = element.nextSibling;
      elParent.removeChild(element);
      elParent.insertBefore(updatedElement, next);
    } else {
      // if no parent, we're being called from refs
      // if called twice before mounting we have a loop, abort
      if (calledByRef) {
        return console.error('Cyclical update + onRef. Aborting.');
      }
      calledByRef = true; 
      element.pendingUpdate = updatedElement;
    }
    if (ref) ref(updatedElement);

    lockUpdates = false;
    calledByRef = false;
    element = updatedElement;
  }
  
  if (ref) ref(element);

  return element;
}