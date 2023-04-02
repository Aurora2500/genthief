import { normalize } from "utils";

export const roulette_wheel_selection = <T>(population: T[], fitness: number[]): T => {
	const normalized_fitness = normalize(fitness);
	const random = Math.random();

	let sum = 0;
	for (let i = 0; i < population.length; i++) {
		sum += normalized_fitness[i];
		if (random < sum) {
			return population[i];
		}
	}

	return population[population.length - 1];
};