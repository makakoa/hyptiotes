// Don't need to require React since it's exposed in function call
// const React = require("react");
const TodoStore = require("../TodoStore");

module.exports = [
	":div",
	{ id: "main-content" },
	[":h1", "Hyptiotes To-Do"],
	[TodoList],
	[AddTodo],
];

function TodoList(_, { useEffect, useState }) {
	const [list, setList] = useState(TodoStore.get());
	useEffect(() => TodoStore.subscribe((v) => setList(v)));

	return [
		":ul",
		...list.map((todo) => {
			return [":li", todo];
		}),
	];
}

function AddTodo(_, { useState }) {
	const [val, setVal] = useState("");
	return [
		":div",
		[
			":input",
			{
				value: val,
				onChange: (e) => {
					setVal(e.target.value);
				},
			},
		],
		[
			":button",
			{
				onClick: () => {
					TodoStore.add(val);
					setVal("");
				},
			},
			"Add",
		],
	];
}
