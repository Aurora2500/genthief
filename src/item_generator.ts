import { Item } from "./knapsack";

export const generate_items = (length: number): Item[] => {
	const items = [];
	for (let i = 0; i < length; i++) {
		items.push({
			name: `item_${i}`,
			weight: Math.floor(Math.random() * 10) + 1,
			value: Math.floor(Math.random() * 10) + 1,
		});
	}
	return items;
};