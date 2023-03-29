export type FitnessFunction<Genotype> = (genotype: Genotype) => number;
export type SelectionFunction<Genotype> = (population: Genotype[], fitness: number[]) => Genotype;
export type CrossoverFunction<Genotype> = (parent1: Genotype, parent2: Genotype) => Genotype;
export type MutationFunction<Genotype> = (genotype: Genotype) => Genotype;
export type InitialPopulationFunction<Genotype> = (size: number) => Genotype[];

export interface GeneticAlgorithmOptions<Genotype> {
	fitness: FitnessFunction<Genotype>;
	populationSize: number;
	init: InitialPopulationFunction<Genotype>;
  selection: SelectionFunction<Genotype>;
	crossover: CrossoverFunction<Genotype>;
	mutation: MutationFunction<Genotype>;
}

export interface GenerationData<Genotype> {
	top_fitness: number;
	mean_fitness: number;
	best_genotype: Genotype;
}
