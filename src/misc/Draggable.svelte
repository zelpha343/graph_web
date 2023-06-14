<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	let dispatch = createEventDispatcher();

	export let left = 100;
	export let top = 100;

	let moving = false;

	function onMouseDown() {
		moving = true;
	}

	function onMouseMove(e: MouseEvent) {
		if (moving) {
			left += e.movementX;
			top += e.movementY;
			dispatch('drag', { left, top });
		}
	}

	function onMouseUp() {
		moving = false;
	}
</script>

<section on:mousedown={onMouseDown} style="left: {left}px; top: {top}px;" class="draggable">
	<slot />
</section>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

<style>
	.draggable {
		user-select: none;
		cursor: move;
		position: absolute;
	}
</style>
