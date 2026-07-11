<script lang="ts">
	import { onMount } from 'svelte';
	import { T, useTask } from '@threlte/core';
	import { AdditiveBlending } from 'three';
	import * as THREE from 'three';
	import type { Group, Points } from 'three';
	import Planet from './objects/Planet.svelte';
	import { getGlowSpriteTexture } from './materials/glowSprite';

	import { homeScroll } from './home-scroll';

	type Props = {
		starCount?: number;
		isMobile?: boolean;
	};

	let { starCount = 1200, isMobile = false }: Props = $props();

	let starsRef = $state<Points | undefined>();
	let coreGroupRef = $state<Group | undefined>();
	let starGlowMap = $state<THREE.CanvasTexture | undefined>();

	onMount(() => {
		starGlowMap = getGlowSpriteTexture();
	});

	let starGeometry = $state<THREE.BufferGeometry | undefined>();

	$effect(() => {
		const count = starCount;
		const geo = new THREE.BufferGeometry();
		const positions = new Float32Array(count * 3);
		for (let i = 0; i < count; i++) {
			const r = 8 + Math.random() * 22;
			const theta = Math.random() * Math.PI * 2;
			const phi = Math.acos(2 * Math.random() - 1);
			positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
			positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
			positions[i * 3 + 2] = r * Math.cos(phi) - 6;
		}
		geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		starGeometry = geo;

		return () => {
			geo.dispose();
		};
	});

	useTask((delta) => {
		const scrollProgress = homeScroll.progress;

		if (starsRef) {
			starsRef.rotation.y += delta * 0.02;
			const material = starsRef.material;
			if (material && !Array.isArray(material) && 'opacity' in material) {
				material.opacity = 0.9 - scrollProgress * 0.4;
			}
		}

		if (coreGroupRef) {
			coreGroupRef.rotation.y = scrollProgress * Math.PI * 0.5;
			coreGroupRef.rotation.x = Math.sin(scrollProgress * Math.PI) * 0.15;
		}
	});
</script>

<T.DirectionalLight position={[8, 4, 6]} intensity={2.4} color="#fff4e6" />
<T.DirectionalLight position={[-4, -1, -3]} intensity={0.12} color="#3a3a40" />

<T.Group bind:ref={coreGroupRef}>
	<T.AmbientLight intensity={0.08} color="#1a1a1e" />

	{#if starGlowMap && starGeometry}
		<T.Points bind:ref={starsRef} geometry={starGeometry}>
			<T.PointsMaterial
				map={starGlowMap}
				alphaMap={starGlowMap}
				size={isMobile ? 0.05 : 0.065}
				color="#f4f3ee"
				transparent
				opacity={0.9}
				sizeAttenuation
				depthWrite={false}
				blending={AdditiveBlending}
			/>
		</T.Points>
	{/if}

	<Planet
		position={[-1.1, -0.5, 1.9]}
		radius={0.09}
		{isMobile}
		color="#c45c26"
		roughness={0.85}
		metalness={0.05}
	/>

	<Planet
		position={[0.5, 0.8, -2]}
		radius={0.1}
		{isMobile}
		color="#e8d5a8"
		roughness={0.9}
		metalness={0.02}
	/>
</T.Group>
