<script lang="ts">
	import { Canvas, T } from '@threlte/core';
	import type { PerspectiveCamera } from 'three';
	import SceneContent from './SceneContent.svelte';

	type Props = {
		scrollProgress?: number;
	};

	let { scrollProgress = 0 }: Props = $props();

	let camera = $state<PerspectiveCamera | undefined>();

	$effect(() => {
		if (!camera) return;
		const t = scrollProgress;
		camera.position.set(
			Math.sin(t * Math.PI) * 2.5,
			1.2 + t * 1.8,
			9 - t * 5.5
		);
		camera.lookAt(0, -t * 0.8, -5 - t * 2);
	});
</script>

<div class="canvas-host" aria-hidden="true">
	<Canvas dpr={[1, 1.75]}>
		<T.PerspectiveCamera bind:ref={camera} makeDefault position={[0, 1.5, 9]} fov={50} />
		<SceneContent {scrollProgress} />
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
