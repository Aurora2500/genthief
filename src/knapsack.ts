import type { FitnessFunction, MutationFunction } from "genetic_algorithm";

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

export const crossover = (parent1: boolean[], parent2: boolean[]): boolean[] => {
	const child = [];
	for (let i = 0; i < parent1.length; i++) {
		child.push(Math.random() < 0.5 ? parent1[i] : parent2[i]);
	}
	return child;
};

export const mutation_factory = (mutation_rate: number): MutationFunction<boolean[]> => {
	return (genotype: boolean[]): boolean[] => {
		return genotype.map((gene) => {
			return Math.random() < mutation_rate ? !gene : gene;
		});
	};
};

export const initialize_population = (length: number) => (size: number): boolean[][] => {
	const population = [];
	for (let i = 0; i < size; i++) {
		const genotype = [];
		for (let j = 0; j < length; j++) {
			genotype.push(Math.random() < 0.5);
		}
		population.push(genotype);
	}
	return population;
};

export const render_genotype = (genotype: boolean[]): string => genotype.reduce((str, gene) => str + (gene ? "1" : "0"), "");