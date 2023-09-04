module.exports = class LinkedObservable {
	parent;
	subscribers = [];
	current;

	constructor(initialValue) {
		this.current = initialValue;
	}

	map(fn) {
		const dest = new LinkedObservable(fn(this.current)); // create new observable
		this.subscribers.push((v) => dest.set(fn(v)));       // subscribe to parent
		dest.parent = this;                                  // point back (for debugging)
		return dest;
	}

	set(val) {
		this.current = val;
		if (this.subscribers.length === 0)
			console.warn("Observable updated with no subscribers", this);
		this.subscribers.forEach((fn) => fn(this.current));
	}

	terminate() {
		this.subscribers.push(() => {});
	}
}
