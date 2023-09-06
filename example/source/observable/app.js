const TodoStore = require("../TodoStore");
const LinkedObservable = require("./LinkedObservable");

module.exports = [
	":div",
	{ id: "main-content" },
	[":h1", "Hyptiotes To-Do"],
	TodoList,
	AddTodo,
];

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
