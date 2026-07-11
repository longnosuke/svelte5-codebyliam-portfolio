<script lang="ts">
	import {
		dimStarBackground,
		galaxyDimStars,
		galaxyGlowColors,
		galaxyGlowStars
	} from '$lib/data/galaxyStars';

	const dimField = dimStarBackground(galaxyDimStars);
</script>

<div class="galaxy-backdrop" aria-hidden="true">
	<div class="galaxy-backdrop__field" style:background-image={dimField}></div>
	{#each galaxyGlowStars as star, i (i)}
		<span
			class="galaxy-backdrop__glow galaxy-backdrop__glow--{star.hue}"
			class:galaxy-backdrop__glow--lite={i >= 6}
			style="
				left: {star.x}%;
				top: {star.y}%;
				--glow-size: {star.size}px;
				--glow-delay: {star.delay}s;
				--glow-duration: {star.duration}s;
				--glow-core: {galaxyGlowColors[star.hue].core};
				--glow-halo: {galaxyGlowColors[star.hue].halo};
			"
		></span>
	{/each}
</div>

<style>
	.galaxy-backdrop {
		position: fixed;
		inset: 0;
		z-index: var(--z-backdrop);
		pointer-events: none;
		overflow: hidden;
		background:
			radial-gradient(
				ellipse 90% 55% at 50% 40%,
				rgba(255, 255, 255, 0.02),
				transparent 55%
			),
			var(--color-bg);
	}

	.galaxy-backdrop__field {
		position: absolute;
		inset: 0;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		opacity: 0.62;
	}

	.galaxy-backdrop__glow {
		position: absolute;
		width: var(--glow-size);
		height: var(--glow-size);
		border-radius: 50%;
		transform: translate(-50%, -50%);
		background: radial-gradient(
			circle at 50% 50%,
			var(--glow-core) 0%,
			var(--glow-halo) 38%,
			transparent 72%
		);
		box-shadow:
			0 0 calc(var(--glow-size) * 1.8) var(--glow-halo),
			0 0 calc(var(--glow-size) * 3.2) color-mix(in srgb, var(--glow-halo) 55%, transparent);
		opacity: 0.55;
		animation: galaxy-glow-pulse var(--glow-duration) ease-in-out infinite;
		animation-delay: var(--glow-delay);
		will-change: opacity, transform;
	}

	@keyframes galaxy-glow-pulse {
		0%,
		100% {
			opacity: 0.35;
			transform: translate(-50%, -50%) scale(0.88);
		}

		50% {
			opacity: 1;
			transform: translate(-50%, -50%) scale(1.12);
		}
	}

	@media (max-width: 768px) {
		.galaxy-backdrop__field {
			opacity: 0.48;
		}

		.galaxy-backdrop__glow--lite {
			display: none;
		}

		.galaxy-backdrop__glow {
			box-shadow: 0 0 calc(var(--glow-size) * 1.4) var(--glow-halo);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.galaxy-backdrop__glow {
			animation: none;
			opacity: 0.72;
			transform: translate(-50%, -50%) scale(1);
			will-change: auto;
		}
	}
</style>
