import { argsort } from "utils";
import type { GeneticAlgorithm, GeneticAlgorithmOptions, GenerationData } from "./types";

export const createGeneticAlgorithm = <Genotype>(options: GeneticAlgorithmOptions<Genotype>): GeneticAlgorithm<Genotype> => {
	const { fitness, init, populationSize } = options;
	const currPopulation = init(populationSize);
	const populationFitness = currPopulation.map(fitness);
	const history: GenerationData<Genotype>[] = [agregateData(currPopulation, populationFitness)];
	return {
		currPopulation,
		populationFitness,
		history,
		options,
	};
};

export const nextGeneration = <Genotype>(ga: GeneticAlgorithm<Genotype>): GeneticAlgorithm<Genotype> => {
	const { currPopulation, populationFitness, options } = ga;
	const { fitness, selection, crossover, mutation } = options;
	const newPopulation: Genotype[] = [];
	const newPopulationFitness: number[] = [];

	for (let i = 0; i < currPopulation.length; i++) {
		const parent1 = selection(currPopulation, populationFitness);
		const parent2 = selection(currPopulation, populationFitness);
		const child = crossover(parent1, parent2);
		const mutatedChild = mutation(child);
		newPopulation.push(mutatedChild);
		newPopulationFitness.push(fitness(mutatedChild));
	}
	
	const newHistory = [...ga.history, agregateData(newPopulation, newPopulationFitness)];

	return {
		currPopulation: newPopulation,
		populationFitness: newPopulationFitness,
		history: newHistory,
		options,
	};
};

export const agregateData = <Genotype>(population: Genotype[], fitness: number[]): GenerationData<Genotype> => {
	const fitness_order = argsort(fitness);
	const max_fitness = fitness[fitness_order[fitness_order.length - 1]];
	const mean_fitness = fitness.reduce((a, b) => a + b, 0) / fitness.length;
	const best_genotypes = fitness_order.slice(-5).reverse().map((index) => population[index]);
	return {
		max_fitness,
		mean_fitness,
		best_genotypes,
	};
};