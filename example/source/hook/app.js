const TodoStore = require("../TodoStore");

module.exports = [
	":div",
	{ id: "main-content" },
	[":h1", "Hyptiotes To-Do"],
	TodoList,
	AddTodo,
];

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