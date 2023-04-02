import { AppBar, Button, Card, CardContent, Container, Divider, Paper, Stack, Toolbar, Typography } from "@mui/material";
import { createGeneticAlgorithm, GenerationData, GeneticAlgorithm, GeneticAlgorithmOptions, nextGeneration, roulette_wheel_selection } from "genetic_algorithm";
import { generate_items } from "item_generator";
import { fitness_factory, crossover, Situation, mutation_factory, initialize_population, render_genotype } from "knapsack";
import React, { useState } from "react";
import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

const transform_history = (history: GenerationData<boolean[]>[]): { generation: number, max: number, mean: number}[] => history.map(({max_fitness:max, mean_fitness:mean}, i) => ({ generation: i+1, max, mean }));

function App() {
	const [situation, setSituation] = useState<Situation>({
		items: generate_items(10),
		max_weight: 30,
	});
	const [options, setOptions] = useState<GeneticAlgorithmOptions<boolean[]>>({
		populationSize: 15,
		fitness: fitness_factory(situation),
		crossover,
		mutation: mutation_factory(0.1),
		selection: roulette_wheel_selection,
		init: initialize_population(situation.items.length) 
	});
	const [geneticAlgorithm, setGeneticAlgorithm] = useState<GeneticAlgorithm<boolean[]>>(createGeneticAlgorithm(options));

	const lastData = geneticAlgorithm.history[geneticAlgorithm.history.length-1];

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
					<Typography>generation {geneticAlgorithm.history.length}</Typography>
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

					<Typography>Best thief of the generation</Typography>
					<Stack gap={4}>
						<Stack direction="row" gap={2}>
							{
								lastData.best_genotypes.map((genotype, i) => (
									<Card key={i + render_genotype(genotype)}>
										<CardContent>{render_genotype(genotype)}</CardContent>
										<CardContent>fitness: {fitness_factory(situation)(genotype)}</CardContent>
									</Card>
								))
							}
						</Stack>
						<Stack direction="row" gap={2}>
							<Button variant="contained" onClick={() => setGeneticAlgorithm(ga => nextGeneration(ga))}>Next generation</Button>
							<Button variant="contained" onClick={() => setGeneticAlgorithm(createGeneticAlgorithm(options))}>Reset</Button>
						</Stack>
					</Stack>
					<Divider sx={{py: 1}}/>
					<Typography variant="h4">Settings</Typography>
					You can currently hold {situation.max_weight}kg of items.
					<Typography>Items</Typography>
					<Stack direction="row">
						{
							situation.items.map((item, i) => (
								<Card key={i + item.name}>
									<CardContent>{item.name}</CardContent>
									<CardContent>weight: {item.weight}</CardContent>
									<CardContent>value: {item.value}</CardContent>
								</Card>
							))
						}
					</Stack>
				</Paper>
			</Container>
		</>
	);
}

export default App;
