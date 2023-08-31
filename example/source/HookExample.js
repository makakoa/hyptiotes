const hyptiotes = require("../../index");
const TodoStore = require("./TodoStore");

module.exports = function HookExample() {
	// Configure Hyptiotes for hook function interface
	const hookPlugins = [
		...hyptiotes.DEFAULT_ITEM_HANDLERS,
		hyptiotes.PLUGINS.DYNAMIC.hookFunction,
	];
  hyptiotes.setItemHandlers(hookPlugins);
  HookExample.plugins = hookPlugins;

  // Create dom structure
	const domTree = hyptiotes.castWeb([
		":div",
		{ id: "main-content" },
		[":h1", "Hyptiotes To-Do"],
		TodoList,
		AddTodo
  ]);

  // Append to root element
	document.getElementById("root").appendChild(domTree);
};

function TodoList({ recast, onCleanup }) {
	onCleanup(TodoStore.subscribe(recast));
	return [
		":ul",
		...TodoStore.get().map((todo) => {
			return [":li", todo];
		}),
	];
}

function AddTodo({ recast }) {
	let inputValue = "";
	return [
		":div",
		[
			":input",
			{
				onchange: (e) => {
					inputValue = e.target.value;
				},
			},
		],
		[
			":button",
			{
				onclick: () => {
					TodoStore.add(inputValue);
					recast();
				},
			},
			"Add",
		],
	];
}
