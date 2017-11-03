# lite-event
OOP Events based from [TypeScript LiteEvent Events](https://gist.github.com/JasonKleban/50cee44960c225ac1993c922563aa540)

## install for npm

Install package with NPM and add it to your dependencies:

`npm install typescript-lite-event`

Install definitions use **[tsd](https://www.npmjs.com/package/tsd)**:

`$ tsd init`


## Usage
import objects
```typescript
import { LiteEvent, IEventHandler } from "./LiteEvent";
```
use
```typescript
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
		if(args.count === 2) {
			console.log("stop if count equally 2 (count = " + args.count + ")");
		}
	};
myCounter
	.onIncrement((counter, args) => {
		console.log("always (count = " + args.count + ")");
	}).onIncrement().oneIncrement((counter, args) => {
		console.log("one (count = " + args.count + ")");
	});

myCounter.increment();
myCounter.increment();
myCounter.increment();
myCounter.increment();
```
