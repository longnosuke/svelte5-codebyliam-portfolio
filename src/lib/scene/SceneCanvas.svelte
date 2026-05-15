<script lang="ts">
	import { browser } from '$app/environment';
	import { Canvas } from '@threlte/core';
	import GalaxyScene from './GalaxyScene.svelte';
	import ScrollCameraRig from './ScrollCameraRig.svelte';

	let starCount = $state(1200);
	let isMobile = $state(false);

	$effect(() => {
		if (!browser) return;
		const mobile = window.matchMedia('(max-width: 768px)').matches;
		isMobile = mobile;
		starCount = mobile ? 600 : 1200;
	});
</script>

<div class="canvas-host" aria-hidden="true">
	<Canvas dpr={[1, 1.5]}>
		<ScrollCameraRig />
		<GalaxyScene {starCount} {isMobile} />
	</Canvas>
</div>

<style>
	.canvas-host {
		position: fixed;
		inset: 0;
		z-index: var(--z-canvas);
		pointer-events: none;
	}

	.canvas-host :global(canvas) {
		display: block;
		width: 100% !important;
		height: 100% !important;
	}
</style>
