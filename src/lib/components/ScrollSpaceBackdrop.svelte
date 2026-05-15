<script lang="ts">
	import { browser } from '$app/environment';
	import {
		easeScrollProgress,
		planetScaleFromScroll,
		spaceBackdropAssets,
		spaceBackdropMotion
	} from '$lib/data/spaceBackdrop';

	type Props = {
		scrollProgress?: number;
		animate?: boolean;
	};

	let { scrollProgress = 0, animate = true }: Props = $props();

	let isMobile = $state(false);

	$effect(() => {
		if (!browser) return;
		isMobile = window.matchMedia('(max-width: 768px)').matches;
	});

	const eased = $derived(easeScrollProgress(animate ? scrollProgress : 0));
	const planetScale = $derived(planetScaleFromScroll(eased, isMobile));
	const parallaxY = $derived(-eased * spaceBackdropMotion.parallaxVh);
	const planetOpacity = $derived(1 - eased * spaceBackdropMotion.planetOpacityFade);
</script>

<div
	class="scroll-space"
	style="--scroll: {eased}; --planet-scale: {planetScale}; --parallax-y: {parallaxY}vh; --planet-opacity: {planetOpacity}; --space-background: url('{spaceBackdropAssets.background}')"
	aria-hidden="true"
>
	<div class="scroll-space__background"></div>
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
		transform: translate3d(0, var(--parallax-y), 0);
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
		transform: scale(var(--planet-scale));
		transform-origin: 100% 100%;
		opacity: var(--planet-opacity);
		will-change: transform, opacity;
	}

	@media (max-width: 768px) {
		.scroll-space__planet {
			width: min(62vw, 420px);
		}
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
