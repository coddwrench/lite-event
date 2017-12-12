
/** Unique Event ID */
var guid = 1;

/**
 * Equivalence of handlers
 * @export
 * @template TSender Initializer
 * @template TArgs Arguments
 * @param {IEventHandler<TSender, TArgs>} handler1 handler
 * @param {IEventHandler<TSender, TArgs>} handler2 handler
 * @returns {boolean} true если эквивалентны
 */
export function eq<TSender, TArgs>(handler1: IEventHandler<TSender, TArgs>, handler2: IEventHandler<TSender, TArgs>): boolean {
	if (handler1.guid && handler2.guid) {
		return handler1.guid === handler2.guid;
	} else if (handler1.guid && !handler2.guid || !handler1.guid && handler2.guid) {
		return false;
	} else {
		return handler1 === handler2;
	}
}

/**
 * Proxies the function in without loss of context and assigning functions to the guid
 * @export
 * @template TSender Initializer
 * @template TArgs Arguments
 * @param {IEventHandler<TSender, TArgs>} handler handler
 * @param {*} context context
 * @returns {IEventHandler<TSender, TArgs>} proxy function
 */
export function proxy<TSender, TArgs>(handler: IEventHandler<TSender, TArgs>, context: any): IEventHandler<TSender, TArgs> {
	var proxy: IEventHandler<TSender, TArgs> = function () {
		return handler.apply(context || this, arguments);
	};
	// ToDo: add jqery friendly
	proxy.guid = handler.guid = handler.guid || guid++;
	return proxy;
}


/**
 * Event Handler
 * @export
 * @interface IEventHandler
 * @template TSender Event initializer
 * @template TArgs Event arguments
 */
export interface IEventHandler<TSender, TArgs> {
	(sender: TSender, args: TArgs): void;
	guid?: number; // support proxy
}

/**
 * Public event interface
 * @export
 * @interface IEvent
 * @template TSender
 * @template TArgs
 */
export interface IEvent<TSender, TArgs> {
	on(handler: IEventHandler<TSender, TArgs>): IEvent<TSender, TArgs>;
	off(handler: IEventHandler<TSender, TArgs>): IEvent<TSender, TArgs>;
	one(handler: IEventHandler<TSender, TArgs>): IEvent<TSender, TArgs>;
}

/**
 * Event class
 * @export
 * @class LiteEvent
 * @implements {IEvent<TSender, TArgs>}
 * @template TSender
 * @template TArgs
 */
export class LiteEvent<TSender, TArgs> implements IEvent<TSender, TArgs> {
	private _handlers: IEventHandler<TSender, TArgs>[] = [];

	/**
	 * Оne time subscribe to an event
	 * @param {IEventHandler<TSender, TArgs>} handler
	 * @returns Himself
	 * @memberof LiteEvent
	 */
	public one(handler: IEventHandler<TSender, TArgs>) {
		var oneHendler = (sender: TSender, args: TArgs) => {
			handler(sender, args);
			this.off(oneHendler);
		};
		this.on(oneHendler);
		return this;
	}

	/**
	 * Subscribe to an event
	 * @param {IEventHandler<TSender, TArgs>} handler Event handler
	 * @returns Himself
	 * @memberof LiteEvent
	 */
	public on(handler: IEventHandler<TSender, TArgs>) {
		this._handlers.push(handler);
		return this;
	}

	/**
	 * Off subscription
	 * @param {IEventHandler<TSender, TArgs>} handler Event handler
	 * @returns Himself
	 * @memberof LiteEvent
	 */
	public off(handler: IEventHandler<TSender, TArgs>) {
		if (!handler.guid) {
			this._handlers = this._handlers.filter(h => h !== handler);
		} else {
			this._handlers = this._handlers.filter(h => h.guid !== handler.guid);
		}
		return this;
	}

	/**
	 * Remove all handlers
	 * @param {IEventHandler<TSender, TArgs>} handler Event handler
	 * @returns Himself
	 * @memberof LiteEvent
	 */
	public clean(handler: IEventHandler<TSender, TArgs>) {
		this._handlers = [];
		return this;
	}

	/**
	 * contains a handler
	 * @param {IEventHandler<TSender, TArgs>} handler Event handler
	 * @returns if it contains handler, it return true
	 * @memberof LiteEvent
	 */
	public has(handler: IEventHandler<TSender, TArgs>): boolean {
		var result: IEventHandler<TSender, TArgs>[];
		if (!handler.guid) {
			result = this._handlers.filter(h => h !== handler);
		} else {
			result = this._handlers.filter(h => h.guid !== handler.guid);
		}
		return result.length > 0;
	}

	/**
	 * Trigger an event
	 * @param {TSender} [sender] Event initializer
	 * @param {TArgs} [args] Event arguments
	 * @returns Himself
	 * @memberof LiteEvent
	 */
	public trigger(sender?: TSender, args?: TArgs) {
		this._handlers.forEach(h => h(sender, args));
		return this;
	}
}
