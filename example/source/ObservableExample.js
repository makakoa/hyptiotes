const hyptiotes = require("../../index");
const TodoStore = require("./TodoStore");
const LinkedObservable = require("./LinkedObservable");
const observableDom = require("./observableDom");

module.exports = function ObservableExample() {
	// Configure Hyptiotes for observable interface
	const observablePlugins = [
		...hyptiotes.DEFAULT_ITEM_HANDLERS,
		observableDom,
		hyptiotes.PLUGINS.ITEMS.invokeFunction,
	];
	hyptiotes.setItemHandlers(observablePlugins);
	ObservableExample.plugins = observablePlugins;

	// Create dom structure
	const domTree = hyptiotes.castWeb([
		":div",
		{ id: "main-content" },
		[":h1", "Hyptiotes To-Do"],
		TodoList,
		AddTodo,
	]);

	// Append to root element
	document.getElementById("root").appendChild(domTree);
};

function TodoList() {
	// Create observable
	const Todos = new LinkedObservable(TodoStore.get());
	// Plug into data store
	TodoStore.subscribe((v) => Todos.set(v));

	// Map observable to dom
	return Todos.map((todoList) => {
		return [
			":ul",
			...todoList.map((todo) => {
				return [":li", todo];
			}),
		];
	});
}

function AddTodo() {
	const inputValue = new LinkedObservable("");
	return [
		":div",
		inputValue.map((val) => {
			return [
				":input",
				{
					value: val,
					onchange: (e) => {
						inputValue.set(e.target.value);
					},
				},
			];
		}),
		[
			":button",
			{
				onclick: () => {
					TodoStore.add(inputValue.current);
					inputValue.set("");
				},
			},
			"Add",
		],
	];
}
