<script lang="ts">
	import { planetMeta, type PlanetId } from '$lib/data/home';

	type Props = {
		planet: PlanetId;
	};

	let { planet }: Props = $props();

	const meta = $derived(planetMeta[planet]);
</script>

{#key planet}
	<figure
		class="terminal-planet"
		style={`--planet-accent: ${meta.accent}; --planet-accent-soft: ${meta.accentSoft};`}
	>
		<div class="terminal-planet__orbit" aria-hidden="true"></div>
		<div class="terminal-planet__glow" aria-hidden="true"></div>
		<img
			class="terminal-planet__img"
			src={meta.src}
			alt={meta.label}
			width="1254"
			height="1254"
			loading="lazy"
			decoding="async"
		/>
	</figure>
{/key}

<style>
	.terminal-planet {
		position: relative;
		margin: 0;
		width: 100%;
		height: 100%;
		min-height: 220px;
		max-height: 360px;
		isolation: isolate;
		display: flex;
		align-items: center;
		justify-content: center;
		animation: planet-enter 0.45s ease;
	}

	.terminal-planet__img {
		position: relative;
		z-index: 1;
		width: min(100%, 340px);
		max-height: min(100%, 340px);
		height: auto;
		aspect-ratio: 1;
		object-fit: contain;
		border-radius: 50%;
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

	@media (prefers-reduced-motion: reduce) {
		.terminal-planet,
		.terminal-planet__img,
		.terminal-planet__orbit {
			animation: none;
		}

		.terminal-planet {
			opacity: 1;
			transform: none;
		}
	}

	@media (max-width: 899px) {
		.terminal-planet {
			min-height: 200px;
			max-height: 240px;
		}

		.terminal-planet__img {
			width: min(92%, 180px);
			max-height: 180px;
		}
	}
</style>
