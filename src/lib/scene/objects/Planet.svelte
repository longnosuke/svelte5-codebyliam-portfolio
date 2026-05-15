<script lang="ts">
	import { T } from '@threlte/core';
	import { theme } from '$lib/theme';
	import { BackSide } from 'three';
	import type * as THREE from 'three';
	import { getPlanetSegments } from '../segments';

	type Props = {
		position?: [number, number, number];
		radius?: number;
		segments?: number;
		isMobile?: boolean;
		color?: string;
		emissive?: string;
		emissiveIntensity?: number;
		metalness?: number;
		roughness?: number;
		maps?: {
			map?: THREE.Texture;
			normalMap?: THREE.Texture;
			roughnessMap?: THREE.Texture;
		};
		atmosphere?: boolean;
		atmosphereColor?: string;
	};

	let {
		position = [0, 0, 0],
		radius = 0.08,
		segments: segmentsProp,
		isMobile = false,
		color = theme.text,
		emissive = '#000000',
		emissiveIntensity = 0,
		metalness = 0.1,
		roughness = 0.85,
		maps,
		atmosphere = false,
		atmosphereColor = theme.nebulaBlue
	}: Props = $props();

	const segments = $derived(segmentsProp ?? getPlanetSegments(isMobile));
</script>

<T.Group {position}>
	<T.Mesh>
		<T.SphereGeometry args={[radius, segments, segments]} />
		<T.MeshStandardMaterial
			{color}
			{emissive}
			{emissiveIntensity}
			{metalness}
			{roughness}
			map={maps?.map}
			normalMap={maps?.normalMap}
			roughnessMap={maps?.roughnessMap}
		/>
	</T.Mesh>

	{#if atmosphere}
		<T.Mesh>
			<T.SphereGeometry args={[radius * 1.03, segments, segments]} />
			<T.MeshPhysicalMaterial
				color={atmosphereColor}
				transparent
				opacity={0.15}
				roughness={0.2}
				metalness={0}
				depthWrite={false}
				side={BackSide}
			/>
		</T.Mesh>
	{/if}
</T.Group>
