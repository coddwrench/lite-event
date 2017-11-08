import { LiteEvent, IEventHandler, IEvent, } from "../index";

interface IMyClassFireEventArgs {
	count: number;
}

class MyCounter {

	private _count = 0;
	private _fireEvent = new LiteEvent<MyCounter, IMyClassFireEventArgs>();

	public onIncrement(handler: IEventHandler<MyCounter, IMyClassFireEventArgs>) {
		this._fireEvent.on(handler);
		return this;
	}

	public offIncrement(handler: IEventHandler<MyCounter, IMyClassFireEventArgs>) {
		this._fireEvent.off(handler);
		return this;
	}

	public oneIncrement(handler: IEventHandler<MyCounter, IMyClassFireEventArgs>) {
		this._fireEvent.one(handler);
		return this;
	}

	public increment() {
		this._count++;
		this._fireEvent.trigger(this, {
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
		myCounter.offIncrement(heandler);
	}
};

myCounter.onIncrement((counter, args) => {
	console.log("always (count = " + args.count + ")");
}).oneIncrement((counter, args) => {
	console.log("one (count = " + args.count + ")");
}).onIncrement(heandler);

myCounter.increment();
myCounter.increment();
myCounter.increment();
myCounter.increment();