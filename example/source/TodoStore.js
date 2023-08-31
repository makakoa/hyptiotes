const TodoStore = {
	data: ["Add some memo patterns", "Use mutation observer for cleanup hooks"],
	subscriptions: [],
	get: () => TodoStore.data,
	add: (todo) => (TodoStore.data.push(todo), TodoStore.emit()),
	emit: () => TodoStore.subscriptions.forEach((cb) => cb(TodoStore.data)),
	subscribe: (fn) => {
		TodoStore.subscriptions.push(fn);
		return () => TodoStore.subscriptions.splice(TodoStore.subscriptions.indexOf(fn), 1);
	},
};
module.exports = TodoStore;