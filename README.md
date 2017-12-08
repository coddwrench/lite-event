# lite-event
OOP Events 
based from [TypeScript LiteEvent](https://gist.github.com/JasonKleban/50cee44960c225ac1993c922563aa540)

## install for npm

Install package with NPM and add it to your dependencies:

`npm install lite-event --save`

* [Functions lite-event](#lite-event-functions)
    * [Subscribe](#subscribe)
    * [Unsubscribe](#unsubscribe)
    * [Remove all subscribe](#remove-all-subscribe)
    * [Trigger event](#trigger-event)
* [Usage from typescript](#usage-from-typescript)
    * [Syntactic sugar](#syntactic-sugar)
    * [Default example](#default-example)
* [Usage from javascript](#usage-from-javascript)
    * [ES6](#es6)
    * [ES3](#es3-)

## lite-event functions

### Initialization
```javascript
var event = new LiteEvent();
var handler = (sender, args)=>{
	// reaction to an event
}
```
### Subscribe
```javascript
event.on(handler);
```
### Unsubscribe
by on/off subscribe
```javascript
event.on(handler);
// some code
event.off(handler);
```
or one time subscribe
```javascript
event.one(handler);
```

### Remove all subscribe
```javascript
event.clean();
```

### Trigger event
```javascript
var args = {
	//some args
};
event.trigger(this, args);
```

## Usage from typescript
### Syntactic sugar
import objects
```javascript
import { LiteEvent, IEventHandler, IEventHandler } from "lite-event";
```
use
```javascript
interface IMyClassFireEventArgs extends IEventHandler {
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

### Default example
import objects
```javascript
import { LiteEvent, IEventHandler, IEventHandler } from "lite-event";
```
use
```javascript
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
```

## Usage from javascript
### ES6
import objects
```javascript
import { LiteEvent, IEventHandler, IEventHandler } from "lite-event";
```
use
```javascript
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
```
### ES3
import objects
```javascript
var LiteEvent = require("lite-event").LiteEvent;
```
use
```javascript
var MyCounter = (function () {
    function MyCounter() {
        this._count = 0;
        this._incrementEvent = new LiteEvent();
    }

    LiteEvent.prototype.increment = function () {
        var oneHendler = function (sender, args) {
            this._count++;
            this._incrementEvent.trigger(this, {
                count: this._count
            });
            return this;
        };
    };
    return MyCounter;
}());

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
```