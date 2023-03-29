export type { FitnessFunction, CrossoverFunction, MutationFunction, InitialPopulationFunction, GeneticAlgorithmOptions, GenerationData } from "./types";
export { roulette_wheel_selection } from "./selection";
import type { GeneticAlgorithmOptions, GenerationData } from "./types";

export class GeneticAlgorithm<Genotype> {
	populationOptions: GeneticAlgorithmOptions<Genotype>;

	currPopulation: Genotype[] = [];
	populationFitness: number[] = [];

	genData: GenerationData<Genotype>[] = [];

	constructor(options: GeneticAlgorithmOptions<Genotype>) {
		this.populationOptions = options;

		this.init();
	}

	init() {
		this.currPopulation = this.populationOptions.init(this.populationOptions.populationSize);
		this.populationFitness = this.currPopulation.map(this.populationOptions.fitness);

		const data: GenerationData<Genotype> = {
			top_fitness: Math.max(...this.populationFitness),
			mean_fitness: this.populationFitness.reduce((a, b) => a + b, 0) / this.populationFitness.length,
			best_genotype: this.bestGenotype,
		};

		this.genData = [data];
	}

	iterate() {
		const { populationSize, fitness, selection, crossover, mutation } = this.populationOptions;

		const newPopulation = [];
		for (let i = 0; i < populationSize; i++) {
			const parent1 = selection(this.currPopulation, this.populationFitness);
			const parent2 = selection(this.currPopulation, this.populationFitness);
			const child = crossover(parent1, parent2);
			newPopulation.push(mutation(child));
		}

		this.currPopulation = newPopulation;
		this.populationFitness = this.currPopulation.map(fitness);
	}

	get bestGenotype() {
		const bestIndex = this.populationFitness.indexOf(Math.max(...this.populationFitness));
		return this.currPopulation[bestIndex];
	}

	get generation() {
		return this.genData.length;
	}
}