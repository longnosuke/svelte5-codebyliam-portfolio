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
			width="400"
			height="400"
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

	.terminal-planet::before {
		content: '';
		position: absolute;
		inset: 4%;
		z-index: -2;
		border-radius: 50%;
		background:
			radial-gradient(circle at 62% 42%, rgba(255, 255, 255, 0.08), transparent 18%),
			radial-gradient(circle at 50% 50%, var(--planet-accent-soft), transparent 62%);
		filter: blur(18px);
		opacity: 0.9;
	}

	.terminal-planet__orbit {
		position: absolute;
		inset: 10%;
		z-index: -1;
		border: 1px solid color-mix(in srgb, var(--planet-accent) 26%, transparent);
		border-radius: 50%;
		box-shadow:
			0 0 42px color-mix(in srgb, var(--planet-accent) 24%, transparent),
			inset 0 0 32px rgba(255, 255, 255, 0.03);
		opacity: 0.65;
		transform: rotate(-16deg) scaleX(1.08);
	}

	.terminal-planet__glow {
		position: absolute;
		inset: 3%;
		z-index: 0;
		background:
			radial-gradient(circle at 68% 36%, rgba(255, 255, 255, 0.18), transparent 10%),
			radial-gradient(circle at 50% 50%, var(--planet-accent-soft), transparent 64%);
		filter: blur(4px);
		opacity: 0.95;
		pointer-events: none;
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
		filter: drop-shadow(0 0 12px color-mix(in srgb, var(--planet-accent) 54%, transparent))
			drop-shadow(0 0 42px var(--planet-accent-soft))
			drop-shadow(0 20px 52px rgba(0, 0, 0, 0.72));
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
