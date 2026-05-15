<script lang="ts">
	import { onMount } from 'svelte';
	import { T, useTask } from '@threlte/core';
	import { BackSide, type Mesh } from 'three';
	import { getPlanetSegments } from '../segments';
	import { loadEarthMaps, type EarthMaps } from '../materials/planetMaps';

	type Props = {
		radius?: number;
		isMobile?: boolean;
	};

	let { radius = 0.9, isMobile = false }: Props = $props();

	const segments = $derived(isMobile ? 24 : 40);

	let surfaceRef = $state<Mesh | undefined>();
	let cloudsRef = $state<Mesh | undefined>();
	let maps = $state<EarthMaps | undefined>();

	onMount(() => {
		let cancelled = false;
		loadEarthMaps().then((m) => {
			if (!cancelled) maps = m;
		});
		return () => {
			cancelled = true;
		};
	});

	useTask((delta) => {
		if (surfaceRef) surfaceRef.rotation.y += delta * 0.05;
		if (cloudsRef) cloudsRef.rotation.y += delta * 0.055;
	});
</script>

{#if maps}
	<T.Mesh bind:ref={surfaceRef}>
		<T.SphereGeometry args={[radius, segments, segments]} />
		<T.MeshStandardMaterial
			map={maps.color}
			normalMap={maps.normal}
			roughnessMap={maps.roughness}
			metalness={0.05}
			roughness={0.65}
		/>
	</T.Mesh>

	<T.Mesh bind:ref={cloudsRef}>
		<T.SphereGeometry args={[radius * 1.012, segments, segments]} />
		<T.MeshStandardMaterial
			map={maps.clouds}
			alphaMap={maps.clouds}
			transparent
			opacity={0.9}
			depthWrite={false}
			metalness={0}
			roughness={1}
		/>
	</T.Mesh>

	<T.Mesh>
		<T.SphereGeometry args={[radius * 1.06, segments, segments]} />
		<T.MeshPhysicalMaterial
			color="#1a2030"
			transparent
			opacity={0.1}
			roughness={0.2}
			metalness={0}
			depthWrite={false}
			side={BackSide}
		/>
	</T.Mesh>
{:else}
	<T.Mesh bind:ref={surfaceRef}>
		<T.SphereGeometry args={[radius, segments, segments]} />
		<T.MeshStandardMaterial color="#2a5a8a" roughness={0.8} metalness={0.05} />
	</T.Mesh>
{/if}

<T.Mesh position={[radius * 1.55, 0.15, 0.35]}>
	<T.SphereGeometry args={[0.05, 16, 16]} />
	<T.MeshStandardMaterial color="#b8b8b8" roughness={0.95} metalness={0.02} />
</T.Mesh>
