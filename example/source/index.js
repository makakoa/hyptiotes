const hyptiotes = require("../../index");

const root = document.getElementById("root");

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

const TodoStore = {
	data: ["Rework dynamic component update interface", "Figure out parent update memo"],
	subscriptions: [],
	get: () => TodoStore.data,
	add: (todo) => (TodoStore.data.push(todo), TodoStore.emit()),
	emit: () => TodoStore.subscriptions.forEach((cb) => cb()),
	subscribe: (fn) => TodoStore.subscriptions.push(fn),
};

hyptiotes.mount(root, [
	":div",
	{ id: "main-content" },
	[":h1", "Hyptiotes To-Do"],
	TodoList,
	AddTodo,
]);

function TodoList({ update }) {
  // will subscribe every call
	TodoStore.subscribe(update);
	return [
		":ul",
		...TodoStore.get().map((todo) => {
			return [":li", todo];
		}),
	];
}

function AddTodo({ update }) {
	let inputValue = "";
	return [
		":div",
		[
			":input",
			{
				onkeyup: (e) => {
					inputValue = e.target.value;
				},
			},
		],
		[
			":button",
			{
				onclick: () => {
					TodoStore.add(inputValue);
					update();
				},
			},
			"Add",
		],
	];
}
