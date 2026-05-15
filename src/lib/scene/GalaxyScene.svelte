<script lang="ts">
	import { onMount } from 'svelte';
	import { T, useTask } from '@threlte/core';
	import { AdditiveBlending } from 'three';
	import * as THREE from 'three';
	import type { Group, Mesh, Points } from 'three';
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

	let cometGroupRef = $state<Group | undefined>();
	let cometNucleusRef = $state<Mesh | undefined>();
	let cometNucleusGeometry = $state<THREE.IcosahedronGeometry | undefined>();
	let cometDustTailGeometry = $state<THREE.BufferGeometry | undefined>();
	let cometIonTailGeometry = $state<THREE.BufferGeometry | undefined>();

	let cometT = 0;
	let cometActive = false;
	let cometCooldown = 1.4;
	let cometVisible = $state(false);
	let cometFade = $state(0);

	onMount(() => {
		starGlowMap = getGlowSpriteTexture();
	});

	let starGeometry = $state<THREE.BufferGeometry | undefined>();

	const cometForward = new THREE.Vector3(1, 0, 0);
	const cometPosition = new THREE.Vector3();
	const cometNextPosition = new THREE.Vector3();
	const cometVelocity = new THREE.Vector3();
	const cometQuaternion = new THREE.Quaternion();

	const cometScale = $derived(isMobile ? 0.78 : 1);

	function cometPath(t: number, target: THREE.Vector3): THREE.Vector3 {
		const arc = Math.sin(t * Math.PI);
		const wobble = Math.sin(t * Math.PI * 2);
		return target.set(-9.4 + t * 18.8, 4.15 - arc * 0.55 + wobble * 0.12, -4.8 + arc * 2.6);
	}

	function makeNucleusGeometry(radius: number, detail: number): THREE.IcosahedronGeometry {
		const geo = new THREE.IcosahedronGeometry(radius, detail);
		const position = geo.attributes.position as THREE.BufferAttribute;
		const vertex = new THREE.Vector3();

		for (let i = 0; i < position.count; i++) {
			vertex.fromBufferAttribute(position, i).normalize();
			const ridge =
				Math.sin(vertex.x * 17.1 + vertex.y * 4.3) * 0.1 +
				Math.cos(vertex.y * 13.7 - vertex.z * 8.9) * 0.08 +
				Math.sin((vertex.x + vertex.z) * 21.4) * 0.05;
			const squash = 1 + vertex.x * 0.12 - Math.abs(vertex.y) * 0.05;
			const r = radius * squash * (0.9 + ridge);
			position.setXYZ(i, vertex.x * r, vertex.y * r, vertex.z * r);
		}

		position.needsUpdate = true;
		geo.computeVertexNormals();
		return geo;
	}

	function makeTailGeometry(
		count: number,
		length: number,
		spread: number,
		innerColor: THREE.Color,
		outerColor: THREE.Color
	): THREE.BufferGeometry {
		const geo = new THREE.BufferGeometry();
		const positions = new Float32Array(count * 3);
		const colors = new Float32Array(count * 3);
		const color = new THREE.Color();

		for (let i = 0; i < count; i++) {
			const f = Math.pow(Math.random(), 0.72);
			const bloom = spread * (0.24 + f * 1.35);
			const twist = Math.random() * Math.PI * 2;
			const drift = (Math.random() - 0.5) * bloom;
			const tailIndex = i * 3;

			positions[tailIndex] = -0.18 - f * length;
			positions[tailIndex + 1] = Math.cos(twist) * bloom * 0.42 + drift * 0.16;
			positions[tailIndex + 2] = Math.sin(twist) * bloom * 0.34 + drift * 0.2;

			color.copy(innerColor).lerp(outerColor, f);
			const falloff = 1 - f * 0.82;
			colors[tailIndex] = color.r * falloff;
			colors[tailIndex + 1] = color.g * falloff;
			colors[tailIndex + 2] = color.b * falloff;
		}

		geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
		return geo;
	}

	function resetCometCooldown(): void {
		cometCooldown = isMobile ? 10 : 6;
	}

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

	$effect(() => {
		const nucleus = makeNucleusGeometry(isMobile ? 0.105 : 0.13, isMobile ? 1 : 2);
		const dustTail = makeTailGeometry(
			isMobile ? 90 : 160,
			isMobile ? 1.85 : 2.6,
			isMobile ? 0.12 : 0.16,
			new THREE.Color('#ffe0a8'),
			new THREE.Color('#9e5334')
		);
		const ionTail = makeTailGeometry(
			isMobile ? 70 : 130,
			isMobile ? 2.4 : 3.4,
			isMobile ? 0.07 : 0.1,
			new THREE.Color('#d9f3ff'),
			new THREE.Color('#5f8cff')
		);

		cometNucleusGeometry = nucleus;
		cometDustTailGeometry = dustTail;
		cometIonTailGeometry = ionTail;

		return () => {
			nucleus.dispose();
			dustTail.dispose();
			ionTail.dispose();
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

		if (!cometGroupRef) return;
		if (scrollProgress >= 0.6) {
			cometActive = false;
			cometVisible = false;
			cometFade = 0;
			resetCometCooldown();
			return;
		}

		if (!cometActive) {
			cometCooldown -= delta;
			if (cometCooldown <= 0 && scrollProgress < 0.6) {
				cometActive = true;
				cometT = 0;
				cometVisible = true;
			}
			return;
		}

		cometT += delta * (isMobile ? 0.15 : 0.17);
		const clampedT = Math.min(cometT, 1);
		cometPath(clampedT, cometPosition);
		cometPath(Math.min(clampedT + 0.012, 1), cometNextPosition);
		cometVelocity.subVectors(cometNextPosition, cometPosition).normalize();
		cometQuaternion.setFromUnitVectors(cometForward, cometVelocity);

		cometGroupRef.position.copy(cometPosition);
		cometGroupRef.quaternion.copy(cometQuaternion);
		cometFade = Math.min(1, Math.sin(clampedT * Math.PI) * 1.35);

		if (cometNucleusRef) {
			cometNucleusRef.rotation.x += delta * 1.2;
			cometNucleusRef.rotation.y += delta * 0.8;
			cometNucleusRef.rotation.z -= delta * 0.55;
		}

		if (cometT >= 1) {
			cometActive = false;
			resetCometCooldown();
			cometVisible = false;
			cometFade = 0;
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

{#if starGlowMap && cometNucleusGeometry && cometDustTailGeometry && cometIonTailGeometry}
	<T.Group
		bind:ref={cometGroupRef}
		visible={cometVisible}
		scale={[cometScale, cometScale, cometScale]}
	>
		<T.Points geometry={cometIonTailGeometry}>
			<T.PointsMaterial
				map={starGlowMap}
				alphaMap={starGlowMap}
				size={isMobile ? 0.075 : 0.095}
				transparent
				opacity={cometFade * 0.68}
				sizeAttenuation
				vertexColors
				depthWrite={false}
				blending={AdditiveBlending}
			/>
		</T.Points>

		<T.Points geometry={cometDustTailGeometry}>
			<T.PointsMaterial
				map={starGlowMap}
				alphaMap={starGlowMap}
				size={isMobile ? 0.09 : 0.12}
				transparent
				opacity={cometFade * 0.62}
				sizeAttenuation
				vertexColors
				depthWrite={false}
				blending={AdditiveBlending}
			/>
		</T.Points>

		<T.Mesh scale={[1.55, 1, 1]}>
			<T.SphereGeometry args={[isMobile ? 0.2 : 0.26, 24, 16]} />
			<T.MeshBasicMaterial
				color="#dcefff"
				transparent
				opacity={cometFade * 0.28}
				depthWrite={false}
				blending={AdditiveBlending}
			/>
		</T.Mesh>

		<T.Mesh bind:ref={cometNucleusRef} geometry={cometNucleusGeometry}>
			<T.MeshStandardMaterial
				color="#28231f"
				emissive="#2a1608"
				emissiveIntensity={cometFade * 0.18}
				roughness={0.96}
				metalness={0.02}
				flatShading
			/>
		</T.Mesh>

		<T.Mesh>
			<T.SphereGeometry args={[isMobile ? 0.145 : 0.18, 16, 12]} />
			<T.MeshBasicMaterial
				color="#fff3d4"
				transparent
				opacity={cometFade * 0.12}
				depthWrite={false}
				blending={AdditiveBlending}
			/>
		</T.Mesh>
	</T.Group>
{/if}
