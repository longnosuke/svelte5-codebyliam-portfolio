<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { planetMeta, type PlanetId } from '$lib/data/home';

	type Props = {
		planet: PlanetId;
		/** Mobile home: swap planets without remount / enter animation. */
		stableSwap?: boolean;
	};

	let { planet, stableSwap = false }: Props = $props();
	let tiltX = $state(0);
	let tiltY = $state(0);
	let spin = $state(0);
	let activated = $state(false);
	let tiltEnabled = $state(false);
	let activationTimeout: ReturnType<typeof setTimeout> | undefined;

	const meta = $derived(planetMeta[planet]);

	function setTilt(event: PointerEvent) {
		if (!tiltEnabled) return;

		const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
		const x = (event.clientX - rect.left) / rect.width - 0.5;
		const y = (event.clientY - rect.top) / rect.height - 0.5;

		tiltX = Number((-y * 16).toFixed(2));
		tiltY = Number((x * 18).toFixed(2));
	}

	function resetTilt() {
		tiltX = 0;
		tiltY = 0;
	}

	function activatePlanet() {
		spin += 1;
		activated = true;
		clearTimeout(activationTimeout);
		activationTimeout = setTimeout(() => {
			activated = false;
		}, 650);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key !== 'Enter' && event.key !== ' ') return;
		event.preventDefault();
		activatePlanet();
	}

	onDestroy(() => {
		clearTimeout(activationTimeout);
	});

	onMount(() => {
		tiltEnabled = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
	});
</script>

{#snippet planetBody()}
	<div class="terminal-planet__glow" aria-hidden="true"></div>
	<div class="terminal-planet__sphere">
		<div class="terminal-planet__orbit-system" aria-hidden="true">
			{#if meta.orbit.ring}
				<div class="terminal-planet__ring"></div>
				<div class="terminal-planet__ring terminal-planet__ring--outer"></div>
			{/if}
			{#each meta.orbit.moons as moon (moon.inset + moon.duration)}
				<div
					class="terminal-planet__orbit"
					class:terminal-planet__orbit--reverse={moon.reverse}
					style={`--orbit-duration: ${moon.duration}s; --orbit-delay: ${moon.delay ?? 0}s; --orbit-inset: ${moon.inset}; --moon-size: ${moon.size}px; --orbit-angle: ${moon.angle ?? 0}deg;`}
				>
					<span class="terminal-planet__moon"></span>
				</div>
			{/each}
		</div>
		<div class="terminal-planet__spin" aria-hidden="true">
			<img
				class="terminal-planet__img"
				src={meta.src}
				alt=""
				aria-hidden="true"
				width="1254"
				height="1254"
				loading="lazy"
				decoding="async"
			/>
		</div>
	</div>
{/snippet}

{#if stableSwap}
	<button
		type="button"
		class="terminal-planet terminal-planet--stable"
		class:terminal-planet--active={activated}
		style={`--planet-accent: ${meta.accent}; --planet-accent-soft: ${meta.accentSoft}; --planet-tilt-x: ${tiltX}deg; --planet-tilt-y: ${tiltY}deg; --planet-spin: ${spin};`}
		aria-label={`Interact with ${meta.label}`}
		onpointermove={setTilt}
		onpointerleave={resetTilt}
		onclick={activatePlanet}
		onkeydown={handleKeydown}
	>
		{@render planetBody()}
	</button>
{:else}
	{#key planet}
		<button
			type="button"
			class="terminal-planet"
			class:terminal-planet--active={activated}
			style={`--planet-accent: ${meta.accent}; --planet-accent-soft: ${meta.accentSoft}; --planet-tilt-x: ${tiltX}deg; --planet-tilt-y: ${tiltY}deg; --planet-spin: ${spin};`}
			aria-label={`Interact with ${meta.label}`}
			onpointermove={setTilt}
			onpointerleave={resetTilt}
			onclick={activatePlanet}
			onkeydown={handleKeydown}
		>
			{@render planetBody()}
		</button>
	{/key}
{/if}

<style>
	.terminal-planet {
		position: relative;
		margin: 0;
		width: 100%;
		height: 100%;
		padding: 0;
		border: 0;
		background: transparent;
		font: inherit;
		min-height: 220px;
		max-height: 360px;
		isolation: isolate;
		display: flex;
		align-items: center;
		justify-content: center;
		animation: planet-enter 0.45s ease;
		cursor: grab;
		outline: none;
		touch-action: pan-y;
		--planet-scale: 1;
		--planet-tilt-x: 0deg;
		--planet-tilt-y: 0deg;
		--planet-spin: 0;
	}

	.terminal-planet:active {
		cursor: grabbing;
	}

	.terminal-planet:focus-visible {
		outline: 2px solid var(--planet-accent);
		outline-offset: 0.35rem;
		border-radius: var(--radius-terminal);
	}

	.terminal-planet--active {
		--planet-scale: 1.06;
	}

	.terminal-planet__sphere {
		position: relative;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		width: min(100%, 340px);
		height: min(100%, 340px);
		max-width: min(100%, 340px);
		max-height: min(100%, 340px);
		aspect-ratio: 1;
		border-radius: 50%;
		transform: perspective(800px) rotateX(var(--planet-tilt-x)) rotateY(var(--planet-tilt-y))
			rotateZ(calc(var(--planet-spin) * 1turn)) scale(var(--planet-scale));
		transition:
			transform 0.45s cubic-bezier(0.2, 0.9, 0.2, 1),
			filter var(--motion-fast);
		will-change: transform;
	}

	.terminal-planet--active .terminal-planet__sphere {
		filter: drop-shadow(0 0 24px var(--planet-accent-soft));
	}

	.terminal-planet--active .terminal-planet__glow {
		opacity: 0.95;
	}

	.terminal-planet__glow {
		position: absolute;
		inset: 12%;
		z-index: 0;
		border-radius: 50%;
		background: radial-gradient(circle, var(--planet-accent-soft) 0%, transparent 68%);
		opacity: 0.55;
		filter: blur(18px);
		pointer-events: none;
	}

	.terminal-planet__orbit-system {
		position: absolute;
		inset: 0;
		z-index: 0;
		pointer-events: none;
	}

	.terminal-planet__ring {
		position: absolute;
		inset: -5%;
		border-radius: 50%;
		border: 1px solid color-mix(in srgb, var(--planet-accent) 42%, transparent);
		box-shadow:
			0 0 10px color-mix(in srgb, var(--planet-accent-soft) 65%, transparent),
			inset 0 0 12px color-mix(in srgb, var(--planet-accent-soft) 35%, transparent);
		transform: rotateX(72deg);
		opacity: 0.7;
	}

	.terminal-planet__ring--outer {
		inset: -14%;
		border-style: dashed;
		border-width: 1px;
		opacity: 0.38;
		transform: rotateX(72deg) rotateZ(28deg);
		animation: ring-drift 48s linear infinite;
	}

	.terminal-planet__orbit {
		position: absolute;
		inset: var(--orbit-inset, -6%);
		transform: rotateX(72deg);
		animation: orbit-revolve var(--orbit-duration, 20s) linear infinite;
		animation-delay: var(--orbit-delay, 0s);
	}

	.terminal-planet__orbit--reverse {
		animation-direction: reverse;
	}

	.terminal-planet__moon {
		position: absolute;
		top: 0;
		left: 50%;
		width: var(--moon-size, 8px);
		height: var(--moon-size, 8px);
		margin-left: calc(var(--moon-size, 8px) / -2);
		margin-top: calc(var(--moon-size, 8px) / -2);
		border-radius: 50%;
		background: radial-gradient(
			circle at 30% 28%,
			color-mix(in srgb, var(--planet-accent) 80%, #fff 20%),
			#14161f 70%
		);
		box-shadow:
			0 0 8px var(--planet-accent-soft),
			inset -1px -2px 3px rgba(0, 0, 0, 0.5);
	}

	.terminal-planet__spin {
		position: relative;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		animation: planet-spin 72s linear infinite;
	}

	.terminal-planet__img {
		position: relative;
		z-index: 2;
		width: 100%;
		height: 100%;
		max-width: 100%;
		max-height: 100%;
		aspect-ratio: 1;
		object-fit: contain;
		border-radius: 50%;
		margin-inline: auto;
		display: block;
		animation: planet-float 6s ease-in-out infinite;
	}

	@keyframes planet-enter {
		from {
			opacity: 0;
			transform: scale(0.92);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	@keyframes planet-float {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-10px);
		}
	}

	@keyframes planet-spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	@keyframes orbit-revolve {
		from {
			transform: rotateX(72deg) rotateZ(0deg);
		}
		to {
			transform: rotateX(72deg) rotateZ(360deg);
		}
	}

	@keyframes ring-drift {
		from {
			transform: rotateX(72deg) rotateZ(0deg);
		}
		to {
			transform: rotateX(72deg) rotateZ(360deg);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.terminal-planet,
		.terminal-planet__img,
		.terminal-planet__spin,
		.terminal-planet__orbit,
		.terminal-planet__ring--outer,
		.terminal-planet__sphere {
			animation: none;
			transition: none;
		}

		.terminal-planet__orbit {
			transform: rotateX(72deg) rotateZ(var(--orbit-angle, 0deg));
		}

		.terminal-planet {
			opacity: 1;
			transform: none;
		}
	}

	@media (max-width: 899px) {
		.terminal-planet {
			min-height: 100%;
			max-height: none;
		}

		.terminal-planet__sphere {
			width: min(100%, 52vw, 24dvh, 13.75rem);
			height: min(100%, 52vw, 24dvh, 13.75rem);
			max-width: min(100%, 52vw, 24dvh, 13.75rem);
			max-height: min(100%, 52vw, 24dvh, 13.75rem);
		}
	}

	@media (max-width: 768px) {
		.terminal-planet,
		.terminal-planet--stable {
			animation: none;
		}

		.terminal-planet__sphere {
			width: min(100%, 72vw, 38dvh, 16.5rem);
			height: min(100%, 72vw, 38dvh, 16.5rem);
			max-width: min(100%, 72vw, 38dvh, 16.5rem);
			max-height: min(100%, 72vw, 38dvh, 16.5rem);
			transition: transform 0.35s ease-out;
		}

		.terminal-planet__img {
			animation: none;
		}

		.terminal-planet--stable .terminal-planet__img {
			transition: opacity 0.35s ease-out;
		}

		.terminal-planet--stable .terminal-planet__orbit-system {
			transition: opacity 0.35s ease-out;
		}
	}
</style>
