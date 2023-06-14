<script lang="ts">
	export let x1: number;
	export let y1: number;
	export let x2: number;
	export let y2: number;
</script>

<svg class="h-screen w-screen absolute">
	<line {x1} {y1} {x2} {y2} stroke="black" />
</svg>
