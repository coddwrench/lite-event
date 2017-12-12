import { LiteEvent, proxy, IEvent, IEventHandler, eq } from "../index";
import { expect } from "chai";

describe("Comparison of functions via eq", () => {
	var a: any = function (x) { return x; };
	var b: any = a;
	var c: any = function (x) { return x; };
	var d: any = function (x) { return x; };
	d.guid = 1;
	var e: any = function (x) { return x; };
	e.guid = 1;
	var f: any = function (x) { return x; };
	f.guid = 2;

	it("the result of all functions is equivalent", () => {
		expect(a("1"))
			.to.equal(b("1"))
			.to.equal(c("1"))
			.to.equal(d("1"))
			.to.equal(e("1"))
			.to.equal(f("1"))
			.to.equal("1");
	});

	it("a and b must be equivalent", () => {
		expect(eq(a, b)).to.equal(true);
	});

	it("a and d should not be equivalent", () => {
		expect(eq(a, d)).to.equal(false);
	});

	it("d and e must be equivalent", () => {
		expect(eq(d, e)).to.equal(true);
	});

	it("d and f should not be equivalent", () => {
		expect(eq(e, f)).to.equal(false);
	});

});

describe("Equivalence of functions received through proxy", () => {
	var obj = {
		a: 0,
		b: 0,
		c: 0,
	};
	var obj2 = {
		a: 0,
		b: 1,
		c: 1
	};

	var a = <IEventHandler<any, any>>function (a, b) {
		return this.a + a + this.b + b - this.c;
	};

	var b = proxy(a, obj);
	var c = proxy(a, obj);
	var d = proxy(a, obj2);

	// a(1, 1)

	it("the result of all functions is equivalent", () => {
		expect(2)
			.to.equal(b(1, 1))
			.to.equal(c(1, 1))
			.to.equal(d(1, 1));
	});

	it("a and b must be equivalent", () => {
		expect(eq(a, b)).to.equal(true);
	});

	it("b and c must be equivalent", () => {
		expect(eq(b, c)).to.equal(true);
	});

	it("b and d must be equivalent", () => {
		expect(eq(b, d)).to.equal(true);
	});
});