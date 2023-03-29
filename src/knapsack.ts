import type { FitnessFunction } from "genetic_algorithm";

export interface Item {
	name: string;
	weight: number;
	value: number;
}

export interface Situation {
	max_weight: number;
	items: Item[];
}

export const fitness_factory = (situation: Situation): FitnessFunction<boolean[]> => {
	const { items, max_weight } = situation;

	return (genotype: boolean[]): number => {
		const weight = genotype.reduce((sum, selected, index) => {
			if (selected) {
				return sum + items[index].weight;
			}
			return sum;
		}, 0);

		const value = genotype.reduce((sum, selected, index) => {
			if (selected) {
				return sum + items[index].value;
			}
			return sum;
		}, 0);

		return weight <= max_weight ? value : 0;
	};
};