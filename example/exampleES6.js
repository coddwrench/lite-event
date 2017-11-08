import { LiteEvent, IEventHandler, IEvent, } from "../dist/index";

class MyCounter {
	constructor() {
		this._count = 0;
		this._incrementEvent = new LiteEvent();
	}
	get incremented() { return this._incrementEvent; }
	increment() {
		this._count++;
		this._incrementEvent.trigger(this, {
			count: this._count
		});
		return this;
	}
}

var myCounter = new MyCounter();
var heandler = (counter, args) => {
	if (args.count === 2) {
		console.log("stop if count equally 2 (count = " + args.count + ")");
	} else {
		myCounter.incremented.off(heandler);
	}
};

myCounter.incremented.on((counter, args) => {
	console.log("always (count = " + args.count + ")");
});

myCounter.incremented.one((counter, args) => {
	console.log("one (count = " + args.count + ")");
});

myCounter.incremented.on(heandler);

myCounter.increment();
myCounter.increment();
myCounter.increment();
myCounter.increment();