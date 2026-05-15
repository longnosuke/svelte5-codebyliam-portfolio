<script lang="ts">
	import { T } from '@threlte/core';
	import { Float } from '@threlte/extras';
	import type { Group } from 'three';

	type Props = {
		scrollProgress?: number;
	};

	let { scrollProgress = 0 }: Props = $props();

	const accent = '#ff6b00';
	const muted = '#2a2a2a';

	const nodes: { position: [number, number, number]; scale: number; rot: number }[] = [
		{ position: [-3, 0.5, -2], scale: 1.2, rot: 0.3 },
		{ position: [2.5, -0.8, -1], scale: 0.9, rot: -0.2 },
		{ position: [0, 1.2, -4], scale: 1.5, rot: 0.1 },
		{ position: [-1.5, -1.5, -3], scale: 0.7, rot: 0.5 },
		{ position: [3.5, 1.5, -5], scale: 1.1, rot: -0.4 },
		{ position: [-4, 2, -6], scale: 0.8, rot: 0.15 },
		{ position: [1, -2, -5], scale: 1.3, rot: 0.25 }
	];

	let groupRef = $state<Group | undefined>();

	$effect(() => {
		if (!groupRef) return;
		const t = scrollProgress;
		groupRef.rotation.y = t * Math.PI * 0.35;
		groupRef.position.y = -t * 1.5;
	});
</script>

<T.Group bind:ref={groupRef}>
	<T.AmbientLight intensity={0.35} />
	<T.DirectionalLight position={[5, 8, 5]} intensity={1.2} color="#fff5ee" />
	<T.PointLight position={[-4, 2, 2]} intensity={2} color={accent} distance={12} />

	<T.Mesh position={[0, 0, -8]} rotation={[0.2, 0.4, 0]}>
		<T.BoxGeometry args={[14, 0.15, 14]} />
		<T.MeshStandardMaterial color={muted} metalness={0.6} roughness={0.4} />
	</T.Mesh>

	{#each nodes as node, i}
		<Float speed={1.5 + i * 0.2} rotationIntensity={0.2} floatIntensity={0.4}>
			<T.Mesh position={node.position} rotation={[node.rot, node.rot * 1.2, 0]}>
				<T.BoxGeometry args={[node.scale, node.scale * 0.6, node.scale * 0.35]} />
				<T.MeshStandardMaterial
					color={i % 2 === 0 ? accent : '#1a1a1a'}
					emissive={i % 2 === 0 ? accent : '#000000'}
					emissiveIntensity={i % 2 === 0 ? 0.25 : 0}
					metalness={0.5}
					roughness={0.35}
				/>
			</T.Mesh>
		</Float>
	{/each}

	<T.Mesh position={[0, 3, -10]}>
		<T.TorusGeometry args={[2.5, 0.04, 16, 64]} />
		<T.MeshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.5} />
	</T.Mesh>
</T.Group>
