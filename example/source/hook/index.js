const hyptiotes = require("hyptiotes");

const configuration = require("./configuration");
const App = require("./app");

hyptiotes.setElementInitializer(configuration.elementInitializer);
hyptiotes.setItemHandlers(configuration.itemHandlers);
hyptiotes.setAttributeHandlers(configuration.attributeHandlers);
hyptiotes.setElementFinalizer(configuration.elementFinalizer);

// Create dom tree
const domTree = hyptiotes.castWeb(App);

// Append to root element
document.getElementById("root").appendChild(domTree);


