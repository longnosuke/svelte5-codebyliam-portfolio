<script lang="ts">
	import { browser } from '$app/environment';
	import {
		easeScrollProgress,
		planetScaleFromScroll,
		spaceBackdropAssets,
		spaceBackdropMotion
	} from '$lib/data/spaceBackdrop';
	import { homeScroll } from '$lib/scene/home-scroll';

	type Props = {
		animate?: boolean;
		/** Mobile: static stars only — no hero planet or parallax rAF. */
		lite?: boolean;
	};

	let { animate = true, lite = false }: Props = $props();

	let root = $state<HTMLDivElement | undefined>();
	let isMobile = $state(false);

	$effect(() => {
		if (!browser) return;
		isMobile = window.matchMedia('(max-width: 768px)').matches;
	});

	$effect(() => {
		if (!browser || !root || !animate || lite) return;

		let frame = 0;
		let lastEased = -1;

		const tick = () => {
			if (!root) return;
			const eased = easeScrollProgress(homeScroll.progress);
			if (eased !== lastEased) {
				lastEased = eased;
				const planetScale = planetScaleFromScroll(eased, isMobile);
				root.style.setProperty('--scroll', String(eased));
				root.style.setProperty('--planet-scale', String(planetScale));
				root.style.setProperty('--parallax-y', `${-eased * spaceBackdropMotion.parallaxVh}vh`);
				root.style.setProperty(
					'--planet-opacity',
					String(1 - eased * spaceBackdropMotion.planetOpacityFade)
				);
			}
			frame = requestAnimationFrame(tick);
		};

		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	});

	$effect(() => {
		if (!browser || !root || (animate && !lite)) return;
		root.style.setProperty('--scroll', '0');
		root.style.setProperty('--planet-scale', '1');
		root.style.setProperty('--parallax-y', '0vh');
		root.style.setProperty('--planet-opacity', '1');
	});
</script>

<div
	bind:this={root}
	class="scroll-space"
	class:scroll-space--lite={lite}
	style="--space-background: url('{spaceBackdropAssets.background}')"
	aria-hidden="true"
>
	<div class="scroll-space__background"></div>
	{#if !lite}
		<img
			class="scroll-space__planet"
			src={spaceBackdropAssets.planet}
			alt=""
			width="520"
			height="420"
			loading="eager"
			decoding="async"
			draggable="false"
		/>
	{/if}
</div>

<style>
	.scroll-space {
		position: fixed;
		inset: 0;
		z-index: var(--z-space-backdrop);
		pointer-events: none;
		opacity: 0.85;
		overflow: hidden;
	}

	.scroll-space__background {
		position: absolute;
		inset: 0;
		background-color: var(--color-bg);
		background-image: var(--space-background);
		background-size: auto 160%;
		background-position: left center;
		transform: translate3d(0, var(--parallax-y, 0), 0);
		will-change: transform;
	}

	.scroll-space__planet {
		position: absolute;
		right: 0;
		bottom: 0;
		z-index: 1;
		width: min(55vw, 720px);
		height: auto;
		object-fit: contain;
		object-position: 100% 100%;
		transform: scale(var(--planet-scale, 1));
		transform-origin: 100% 100%;
		opacity: var(--planet-opacity, 1);
		will-change: transform, opacity;
	}

	.scroll-space--lite {
		opacity: 0.65;
	}

	.scroll-space--lite .scroll-space__background {
		background-size: cover;
		background-position: center;
		transform: none;
		will-change: auto;
	}

	@media (prefers-reduced-motion: reduce) {
		.scroll-space__background {
			transform: none;
		}

		.scroll-space__planet {
			transform: scale(1);
			opacity: 1;
		}
	}
</style>
