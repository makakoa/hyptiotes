const hyptiotes = require("hyptiotes");
const { createRoot } = require("react-dom/client");

const configuration = require("./configuration");
const App = require("./app");

hyptiotes.setElementInitializer(configuration.elementInitializer);
hyptiotes.setItemHandlers(configuration.itemHandlers);
hyptiotes.setAttributeHandlers(configuration.attributeHandlers);
hyptiotes.setElementFinalizer(configuration.elementFinalizer);

// Cast hyptiotes tree to React tree
const reactTree = hyptiotes.castWeb(App);

// Append to root element
const root = createRoot(document.getElementById("root"));
root.render(reactTree);
