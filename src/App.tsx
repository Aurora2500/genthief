import { AppBar, Container, Paper, Toolbar, Typography } from "@mui/material";
import { GeneticAlgorithm, GeneticAlgorithmOptions, roulette_wheel_selection } from "genetic_algorithm";
import { fitness_factory, crossover, Situation, mutation_factory, initialize_population } from "knapsack";
import React, { useState } from "react";

function App() {
	const [situation, setSituation] = useState<Situation>({
		items: [
			{ name: "item1", weight: 1, value: 1 },
			{ name: "item2", weight: 2, value: 2 },
			{ name: "item3", weight: 3, value: 3 },
		],
		max_weight: 5,
	});
	const [options, setOptions] = useState<GeneticAlgorithmOptions<boolean[]>>({
		populationSize: 10,
		fitness: fitness_factory(situation),
		crossover,
		mutation: mutation_factory(0.1),
		selection: roulette_wheel_selection,
		init: initialize_population(situation.items.length) 
	});
	const [geneticAlgorithm, setGeneticAlgorithm] = useState<GeneticAlgorithm<boolean[]>>(new GeneticAlgorithm(options));

	return (
		<>
			<AppBar position="sticky">
				<Toolbar>
					<Typography variant="h3">Genthief </Typography>
				</Toolbar>
			</AppBar>
			<Container>
				<Paper sx={{mt: 5, p: 3}}>
					<Typography variant="h4">Current generation</Typography>
					<Typography>generation {geneticAlgorithm.generation}</Typography>
				</Paper>
			</Container>
		</>
	);
}

export default App;
