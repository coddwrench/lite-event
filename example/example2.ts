import { LiteEvent, IEventHandler, IEvent } from "../index";

interface IMyClassFireEventArgs {
	count: number;
}

class MyCounter {

	private _count = 0;
	private _incrementEvent = new LiteEvent<MyCounter, IMyClassFireEventArgs>();

	public get incremented(): IEvent<MyCounter, IMyClassFireEventArgs> { return this._incrementEvent; }

	public increment() {
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