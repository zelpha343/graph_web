<script lang="ts">
	import Draggable from './../misc/Draggable.svelte';
	import { getNumberOfDigits, getRandomNumber } from '../misc/Misc';
	import { createEventDispatcher } from 'svelte';

	let dispatch = createEventDispatcher();

	export let vID: number;
	export let vValue: number;
	export let radius: number;
	export let x: number = 0;
	export let y: number = 0;

	const onDrag = (e: any) => {
		x = e.detail.left;
		y = e.detail.top;
		dispatch('positionChange', { vID, x, y });
	};
</script>

<Draggable left={x} top={y} on:drag={onDrag}>
	<div
		class="rounded-full bg-red-400 hover:bg-green-400 select-none"
		style={`height: ${radius}px; width: ${radius}px;`}
	>
		<div class="flex flex-col justify-center items-center text-white h-full w-full">
			<span class="text-xl">{vID}</span>
			<span class="text-xl">{vValue}</span>
		</div>
	</div>
</Draggable>
