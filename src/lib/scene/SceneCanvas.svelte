<script lang="ts">
	import { browser } from '$app/environment';
	import { Canvas, T } from '@threlte/core';
	import type { PerspectiveCamera } from 'three';
	import GalaxyScene from './GalaxyScene.svelte';

	type Props = {
		scrollProgress?: number;
	};

	let { scrollProgress = 0 }: Props = $props();

	const fogFar = $derived(32 - scrollProgress * 8);

	let camera = $state<PerspectiveCamera | undefined>();
	let starCount = $state(1200);
	let isMobile = $state(false);

	$effect(() => {
		if (!browser) return;
		const mobile = window.matchMedia('(max-width: 768px)').matches;
		isMobile = mobile;
		starCount = mobile ? 600 : 1200;
	});

	$effect(() => {
		if (!camera) return;
		const t = scrollProgress;
		camera.position.set(
			Math.sin(t * Math.PI) * 1.8,
			0.8 + t * 1.2,
			7 - t * 3.5
		);
		camera.lookAt(0, 0, -2 - t * 1.5);
	});
</script>

<div class="canvas-host" aria-hidden="true">
	<Canvas dpr={[1, 1.5]}>
		<T.PerspectiveCamera bind:ref={camera} makeDefault position={[0, 0.8, 7]} fov={55} />
		<T.Fog color="#020203" near={10} far={fogFar} />
		<GalaxyScene {scrollProgress} {starCount} {isMobile} />
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
