
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
