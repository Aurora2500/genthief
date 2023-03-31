import { AppBar, Button, Container, Paper, Toolbar, Typography } from "@mui/material";
import { GenerationData, GeneticAlgorithm, GeneticAlgorithmOptions, roulette_wheel_selection } from "genetic_algorithm";
import { generate_items } from "item_generator";
import { fitness_factory, crossover, Situation, mutation_factory, initialize_population } from "knapsack";
import React, { useState } from "react";
import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

const transform_history = (history: GenerationData<boolean[]>[]): { generation: number, max: number, mean: number}[] => history.map(({top_fitness:max, mean_fitness:mean}, i) => ({ generation: i+1, max, mean }));

function App() {
	const [situation, setSituation] = useState<Situation>({
		items: generate_items(10),
		max_weight: 30,
	});
	const [options, setOptions] = useState<GeneticAlgorithmOptions<boolean[]>>({
		populationSize: 100,
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
					<LineChart width={600} height={300}
						data={transform_history(geneticAlgorithm.history)}
					>
						<XAxis dataKey="generation" />
						<YAxis />
						<Line type="monotone" dataKey="max" stroke="#8884d8" />
						<Line type="monotone" dataKey="mean" stroke="#82ca9d" />

						<Tooltip 
							labelFormatter={(label) => `Generation ${label}`}
						/>
					</LineChart>

					<Button variant="contained" onClick={() => {geneticAlgorithm.iterate(); setGeneticAlgorithm(geneticAlgorithm);}}>Next generation</Button>
				</Paper>
			</Container>
		</>
	);
}

export default App;
