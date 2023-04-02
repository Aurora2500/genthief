export function argsort(array: number[]): number[];
export function argsort<T>(array: T[], key: (x: T) => number): number[];
export function argsort<T>(array: (T | number)[], key?: (x: T) => number): number[] {
	const k = key || ((x: T) => x as unknown as number);

	return array.map((x, i) => [k(x as T), i])
		.sort(([a], [b]) => a - b)
		.map(([, i]) => i);
}

export function argmax(array: number[]): number;
export function argmax<T>(array: T[], key: (x: T) => number): number;
export function argmax<T>(array: T[], key?: (x: T) => number): number {
	let max = -Infinity;
	let maxIndex = -1;
	for (let i = 0; i < array.length; i++) {
		const value = key ? key(array[i]) : array[i] as number;
		if (value > max) {
			max = value;
			maxIndex = i;
		}
	}
	return maxIndex;
}

export const indexMany = <T>(array: T[], indices: number[]): T[] => indices.map((i) => array[i]);

export const choose = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)];

export const sum = (array: number[]): number => array.reduce((a, b) => a + b, 0);

export const normalize = (array: number[]): number[] => {
	const s = sum(array);
	return array.map((value) => value / s);
};