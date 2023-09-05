const React = require("react");
const { useState, useEffect } = React;
const TodoStore = require("../TodoStore");

module.exports = [
	":div",
	{ id: "main-content" },
	[":h1", "Hyptiotes To-Do"],
	[TodoList],
	[AddTodo],
];

function TodoList() {
	const [list, setList] = useState(TodoStore.get());
	useEffect(() => TodoStore.subscribe((v) => setList(v)));
	return [
		":ul",
		...list.map((todo) => {
			return [":li", todo];
		}),
	];
}

function AddTodo() {
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
