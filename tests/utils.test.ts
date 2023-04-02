import { describe, expect, it } from "vitest";
import {
	argsort,
	argmax,
	normalize,
	indexMany,
} from "../src/utils";

describe("argsort", () => {
	it("should return the correct indices", () => {
		expect(argsort([3, 1, 2])).toEqual([1, 2, 0]);
	});
	it("should return the correct indices", () => {
		expect(argsort([{ a: 3 }, { a: 1 }, { a: 2 }], (x) => x.a)).toEqual([1, 2, 0]);
	});
});

describe("argmax", () => {
	it("should return the correct index", () => {
		expect(argmax([3, 1, 2])).toEqual(0);
	});
});

describe("normalize", () => {
	it("should sum to 1", () => {
		expect(normalize([3, 1, 2]).reduce((a, x) => a + x, 0)).toEqual(1);
	});
	it("should return the correct values", () => {
		expect(normalize([3, 1, 2, 4])).toEqual([0.3, 0.1, 0.2, 0.4]);
	});
});

describe("indexMany", () => {
	it("should return the correct indices", () => {
		expect(indexMany([3, 1, 2], [1, 2])).toEqual([1, 2]);
	});
	it("should return the correct indices", () => {
		expect(indexMany([3, 1, 2], [1, 2, 2])).toEqual([1, 2, 2]);
	});
});