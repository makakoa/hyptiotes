const hyptiotes = require("../../index");
const HookExample = require("./HookExample");
const ObservableExample = require("./ObservableExample");

// Add some basic page styles
hyptiotes.style({
	body: {
		fontFamily: "system-ui",
	},
	"#main-content": {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
});

ObservableExample();
// HookExample();