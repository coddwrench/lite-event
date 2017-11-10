import { LiteEvent, IEventHandler, IEvent, } from "../index";

interface IMouseEventEventArgs extends MouseEvent { }

class MyMouse {

	private _mouseoverEvent = new LiteEvent<MyMouse, IMouseEventEventArgs>();
	private _onmouseoutEvent = new LiteEvent<MyMouse, IMouseEventEventArgs>();

	public get mouseover(): IEvent<MyMouse, IMouseEventEventArgs> {
		return this._mouseoverEvent;
	}

	public get onmouseout(): IEvent<MyMouse, IMouseEventEventArgs> {
		return this._onmouseoutEvent;
	}

	constructor() {
		var onmouseover = document.body.onmouseover;
		var onmouseout = document.body.onmouseout;
		document.body.onmouseover = (ev) => {
			onmouseover.call(ev.target, ev);
			this._mouseoverEvent.trigger(this, ev);
		};
		document.body.onmouseout = (ev) => {
			onmouseout.call(ev.target, ev);
			this._onmouseoutEvent.trigger(this, ev);
		};
	}
}

var myCounter = new MyMouse();

myCounter.mouseover.on((target, args) => {
	console.log(args.type);
});

myCounter.onmouseout.on((target, args) => {
	console.log(args.type);
});