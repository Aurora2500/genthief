export type FitnessFunction<Genotype> = (genotype: Genotype) => number;
export type SelectionFunction<Genotype> = (population: Genotype[], fitness: number[]) => Genotype;
export type CrossoverFunction<Genotype> = (parent1: Genotype, parent2: Genotype) => Genotype;
export type MutationFunction<Genotype> = (genotype: Genotype) => Genotype;
export type InitialPopulationFunction<Genotype> = (size: number) => Genotype[];

export type GeneticAlgorithmOptions<Genotype> = {
	fitness: FitnessFunction<Genotype>;
	populationSize: number;
	init: InitialPopulationFunction<Genotype>;
	selection: SelectionFunction<Genotype>;
	crossover: CrossoverFunction<Genotype>;
	mutation: MutationFunction<Genotype>;
}

export type GenerationData<Genotype> = {
	max_fitness: number;
	mean_fitness: number;
	best_genotype: Genotype;
}

export type History<Genotype> = GenerationData<Genotype>[];

export type GeneticAlgorithm<Genotype> = {
	currPopulation: Genotype[];
	populationFitness: number[];
	history: History<Genotype>;
	options: GeneticAlgorithmOptions<Genotype>;
}