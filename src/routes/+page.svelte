<script lang="ts">
	import Vertex from './../components/Vertex.svelte';
	import { getVertexIDs, getVertexValues, getVertexPaths } from '../api/fetch_data';
	import { getRandomNumber, getNumberOfDigits, getIndexFromID } from '../misc/Misc';
	import Line from '../components/Line.svelte';

	let vertexIDs: any;
	let vertexValues: any;
	let vertexPaths: any;
	let render = false;
	let positions: any = [];
	let lines: any = [];

	async function fetchData() {
		try {
			// Fetch vertex IDs, values, and paths
			vertexIDs = await getVertexIDs();
			vertexValues = await getVertexValues();
			vertexPaths = await getVertexPaths();

			// Set render flag to true
			render = true;

			// Calculate positions for vertices
			for (let i = 0; i < vertexIDs.length; i++) {
				const radius =
					10 * getNumberOfDigits(vertexIDs[i] >= vertexValues[i] ? vertexIDs[i] : vertexValues[i]) +
					50;
				const x = getRandomNumber(0, window.innerWidth - 2 * radius);
				const y = getRandomNumber(0, window.innerHeight - 2 * radius);
				positions.push([vertexIDs[i], x, y, radius]);
			}

			// Calculate line coordinates for each vertex path
			lines = vertexPaths.map((path: any) => {
				return {
					path,
					coordinates: calculateLineCoordinates(path)
				};
			});
		} catch (error) {
			console.error(error);
		}
	}

	fetchData();

	const onPositionChange = (e: any) => {
		const vertexID = e.detail.vID;
		const x = e.detail.x;
		const y = e.detail.y;

		for (let i = 0; i < positions.length; i++) {
			if (positions[i][0] === vertexID) {
				positions[i][1] = x;
				positions[i][2] = y;
			}
		}

		// Recalculate line coordinates for each vertex path
		lines = vertexPaths.map((path: any) => {
			return {
				path,
				coordinates: calculateLineCoordinates(path)
			};
		});
	};

	function calculateLineCoordinates(path: any) {
		const startVertex = positions.find((v: any) => v[0] === path[0]);
		const endVertex = positions.find((v: any) => v[0] === path[1]);

		if (startVertex && endVertex) {
			const x1 = startVertex[1] + startVertex[3] / 2; // Start x-coordinate
			const y1 = startVertex[2] + startVertex[3] / 2; // Start y-coordinate
			const x2 = endVertex[1] + endVertex[3] / 2; // End x-coordinate
			const y2 = endVertex[2] + endVertex[3] / 2; // End y-coordinate

			return [x1, y1, x2, y2];
		}

		return null;
	}
</script>

{#if !render}
	<span class="text-6xl">Loading...</span>
{:else}
	{#each lines as { path, coordinates }}
		{#if coordinates}
			<Line x1={coordinates[0]} y1={coordinates[1]} x2={coordinates[2]} y2={coordinates[3]} />
		{/if}
	{/each}
	{#each vertexIDs as id, i}
		<Vertex
			vID={id}
			vValue={vertexValues[i]}
			x={positions[i][1]}
			y={positions[i][2]}
			radius={positions[i][3]}
			on:positionChange={onPositionChange}
		/>
	{/each}
{/if}
