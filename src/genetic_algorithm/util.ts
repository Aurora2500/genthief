export const normalize = (values: number[]): number[] => {
	const sum = values.reduce((a, b) => a + b, 0);
	return values.map((value) => value / sum);
};