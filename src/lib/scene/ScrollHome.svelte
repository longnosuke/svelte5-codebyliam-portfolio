<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import Mail from '@lucide/svelte/icons/mail';
	import ScrollSpaceBackdrop from '$lib/components/ScrollSpaceBackdrop.svelte';
	import SceneCanvas from './SceneCanvas.svelte';
	import TerminalWindow from '$lib/components/TerminalWindow.svelte';
	import TerminalPlanet from '$lib/components/TerminalPlanet.svelte';
	import TerminalCommandInput from '$lib/components/TerminalCommandInput.svelte';
	import TerminalTechTags from '$lib/components/TerminalTechTags.svelte';
	import { homeSections } from '$lib/data/home';
	import { site } from '$lib/data/site';

	import { homeScroll } from './home-scroll';

	let activeSection = $state(0);
	let reducedMotion = $state(
		browser && window.matchMedia('(prefers-reduced-motion: reduce)').matches
	);
	let isMobile = $state(browser && window.matchMedia('(max-width: 768px)').matches);
	let scrollRoot: HTMLElement | undefined;
	let canvasReady = $state(false);

	const sections = homeSections;
	const current = $derived(sections[activeSection]);

	function sectionFromProgress(progress: number, count: number) {
		return Math.min(count - 1, Math.max(0, Math.floor(progress * count + 1e-6)));
	}

	onMount(() => {
		const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)');
		const mobileMq = window.matchMedia('(max-width: 768px)');

		const syncMedia = () => {
			reducedMotion = motionMq.matches;
			isMobile = mobileMq.matches;
		};
		syncMedia();
		motionMq.addEventListener('change', syncMedia);
		mobileMq.addEventListener('change', syncMedia);

		const id = requestAnimationFrame(() => {
			canvasReady = true;
		});

		if (reducedMotion || !scrollRoot) {
			return () => {
				cancelAnimationFrame(id);
				motionMq.removeEventListener('change', syncMedia);
				mobileMq.removeEventListener('change', syncMedia);
			};
		}

		document.documentElement.classList.add('is-home-scroll');

		gsap.registerPlugin(ScrollTrigger);
		ScrollTrigger.config({ ignoreMobileResize: true, limitCallbacks: true });

		if (isMobile) {
			ScrollTrigger.normalizeScroll(true);
		}

		const snapStep = 1 / (sections.length - 1);

		const trigger = ScrollTrigger.create({
			trigger: scrollRoot,
			start: 'top top',
			end: 'bottom bottom',
			scrub: isMobile ? 0.35 : 0.85,
			snap: isMobile
				? {
						snapTo: snapStep,
						duration: { min: 0.18, max: 0.42 },
						delay: 0.03,
						ease: 'power2.inOut'
					}
				: undefined,
			onUpdate: (self) => {
				homeScroll.progress = self.progress;
				const section = sectionFromProgress(self.progress, sections.length);
				if (section !== activeSection) activeSection = section;
			}
		});

		const refreshScroll = () => ScrollTrigger.refresh();
		window.addEventListener('resize', refreshScroll, { passive: true });
		window.visualViewport?.addEventListener('resize', refreshScroll, { passive: true });

		return () => {
			cancelAnimationFrame(id);
			document.documentElement.classList.remove('is-home-scroll');
			motionMq.removeEventListener('change', syncMedia);
			mobileMq.removeEventListener('change', syncMedia);
			window.removeEventListener('resize', refreshScroll);
			window.visualViewport?.removeEventListener('resize', refreshScroll);
			if (isMobile) ScrollTrigger.normalizeScroll(false);
			trigger.kill();
		};
	});
</script>

{#if browser && canvasReady && !reducedMotion}
	<ScrollSpaceBackdrop lite={isMobile} />
	{#if !isMobile}
		<SceneCanvas />
	{/if}
{:else if browser && canvasReady}
	<ScrollSpaceBackdrop animate={false} />
{/if}

<div
	class="scroll-home"
	bind:this={scrollRoot}
	style="--section-count: {sections.length}"
>
	{#each sections as _, index (index)}
		<div class="scroll-home__track" aria-hidden="true"></div>
	{/each}
	<div class="scroll-home__stage">
		<TerminalWindow
			split
			homeChrome
			statusDot
			class="scroll-home__terminal scroll-home__terminal--{current.id}"
		>
			{#snippet aside()}
				{#if isMobile}
					<TerminalPlanet planet={current.planet} stableSwap />
				{:else}
					{#key current.planet}
						<TerminalPlanet planet={current.planet} />
					{/key}
				{/if}
			{/snippet}

			{#snippet footer()}
				<TerminalCommandInput hostPrompt="Liam@portfolio:~" />
			{/snippet}

			{#if isMobile}
				<div class="scroll-home__content">
					<h1 class="terminal__title">{current.title}</h1>
					{#each current.lines as line}
						<p
							class="terminal__output"
							class:terminal__output--muted={!line.accent}
							class:terminal__line--accent={line.accent}
						>
							{line.text}
						</p>
					{/each}

					{#if current.showBio}
						<p class="scroll-home__bio terminal__output terminal__output--muted">{site.bio}</p>
					{/if}
					{#if current.showTech}
						<TerminalTechTags />
					{/if}

					{#if 'primaryCta' in current && current.primaryCta}
						<div class="scroll-home__actions">
							<a class="btn btn--primary" href={current.primaryCta.href}>
								{current.primaryCta.label}
								<ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
							</a>
							{#if current.secondaryCta}
								<a class="btn scroll-home__btn-outline" href={current.secondaryCta.href}>
									<Mail size={18} strokeWidth={2} aria-hidden="true" />
									{current.secondaryCta.label}
								</a>
							{/if}
						</div>
					{:else if 'linkCta' in current && current.linkCta}
						<a class="btn" href={current.linkCta.href}>{current.linkCta.label}</a>
					{/if}
				</div>
			{:else}
				{#key activeSection}
					<div class="scroll-home__content">
						<h1 class="terminal__title">{current.title}</h1>
						{#each current.lines as line}
							<p
								class="terminal__output"
								class:terminal__output--muted={!line.accent}
								class:terminal__line--accent={line.accent}
							>
								{line.text}
							</p>
						{/each}

						{#if current.showBio}
							<p class="scroll-home__bio terminal__output terminal__output--muted">{site.bio}</p>
						{/if}
						{#if current.showTech}
							<TerminalTechTags />
						{/if}

						{#if 'primaryCta' in current && current.primaryCta}
							<div class="scroll-home__actions">
								<a class="btn btn--primary" href={current.primaryCta.href}>
									{current.primaryCta.label}
									<ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
								</a>
								{#if current.secondaryCta}
									<a class="btn scroll-home__btn-outline" href={current.secondaryCta.href}>
										<Mail size={18} strokeWidth={2} aria-hidden="true" />
										{current.secondaryCta.label}
									</a>
								{/if}
							</div>
						{:else if 'linkCta' in current && current.linkCta}
							<a class="btn" href={current.linkCta.href}>{current.linkCta.label}</a>
						{/if}
					</div>
				{/key}
			{/if}

			<p class="scroll-hint scroll-hint--inline" aria-hidden="true">
				scroll · {activeSection + 1}/{sections.length}
			</p>
		</TerminalWindow>
	</div>
</div>

<style>
	.scroll-home {
		position: relative;
		z-index: var(--z-overlay);
		--section-scroll: 50vh;
	}

	.scroll-home__track {
		height: var(--section-scroll);
		pointer-events: none;
	}

	.scroll-home__stage {
		position: fixed;
		inset: 0;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: clamp(5rem, 12vh, 7rem) var(--space-page) 2rem;
		pointer-events: none;
		transform: translateZ(0);
	}

	.scroll-home__stage :global(.scroll-home__terminal) {
		width: var(--terminal-max);
		max-height: calc(100vh - clamp(5rem, 12vh, 7rem) - 2rem);
		pointer-events: auto;
	}

	.scroll-home__content {
		animation: fade-in 0.35s ease;
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.scroll-home__bio {
		margin-top: 0.75rem;
		max-width: 42ch;
	}

	:global(.terminal__line--accent) {
		color: var(--color-accent);
		font-size: var(--text-base);
	}

	.scroll-home__actions {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-top: 1.75rem;
	}

	.scroll-home__btn-outline {
		background: transparent;
	}

	@media (max-width: 768px) {
		.scroll-home {
			--section-scroll: 100svh;
			--scroll-home-planet-max: min(22dvh, 8.75rem);
		}

		.scroll-home__track {
			scroll-snap-align: start;
			scroll-snap-stop: always;
		}

		.scroll-home__stage {
			box-sizing: border-box;
			flex-direction: column;
			height: 100svh;
			max-height: 100svh;
			align-items: stretch;
			padding: max(0.5rem, env(safe-area-inset-top)) 0.625rem var(--site-dock-clearance)
				0.625rem;
		}

		.scroll-home__stage :global(.scroll-home__terminal) {
			width: 100%;
			max-width: none;
			flex: 1 1 auto;
			min-height: 0;
			height: 100%;
			max-height: none;
			display: flex;
			flex-direction: column;
			overflow: hidden;
		}

		.scroll-home__stage :global(.scroll-home__terminal .terminal__bar) {
			flex-shrink: 0;
		}

		.scroll-home__stage :global(.scroll-home__terminal .terminal__body) {
			flex: 1 1 auto;
			min-height: 0;
			display: flex;
			flex-direction: column;
			overflow: hidden;
		}

		.scroll-home__stage :global(.scroll-home__terminal .terminal__grid) {
			display: flex;
			flex: 1 1 auto;
			flex-direction: column;
			min-height: 0;
			gap: 0;
			grid-template-columns: none;
		}

		.scroll-home__stage :global(.scroll-home__terminal .terminal__main) {
			position: relative;
			flex: 1 1 0;
			min-height: 0;
			max-height: none;
			overflow: hidden;
			overscroll-behavior: none;
		}

		.scroll-home__stage :global(.scroll-home__terminal--whoami) {
			--scroll-home-planet-max: min(20dvh, 7.5rem);
		}

		.scroll-home__stage :global(.scroll-home__terminal--work) {
			--scroll-home-planet-max: min(24dvh, 9rem);
		}

		.scroll-home__stage :global(.scroll-home__terminal--contact) {
			--scroll-home-planet-max: min(17dvh, 6.75rem);
		}

		.scroll-home__stage :global(.scroll-home__terminal .terminal__aside) {
			order: 2;
			flex: 0 0 auto;
			min-height: 0;
			max-height: var(--scroll-home-planet-max);
			align-items: center;
			justify-content: center;
			overflow: hidden;
		}

		.scroll-home__stage :global(.scroll-home__terminal .terminal-planet) {
			min-height: 0;
			max-height: 100%;
		}

		.scroll-home__stage :global(.scroll-home__terminal .terminal-planet__sphere) {
			width: min(100%, 62vw, var(--scroll-home-planet-max), 30dvh);
			height: min(100%, 62vw, var(--scroll-home-planet-max), 30dvh);
			max-width: min(100%, 62vw, var(--scroll-home-planet-max), 30dvh);
			max-height: min(100%, 62vw, var(--scroll-home-planet-max), 30dvh);
		}

		.scroll-home__stage :global(.scroll-home__terminal .terminal__footer) {
			flex-shrink: 0;
		}

		.scroll-home__content {
			animation: none;
		}

		.scroll-home__actions {
			flex-direction: column;
			gap: 0.65rem;
			margin-top: 1.25rem;
		}

		.scroll-home__actions :global(.btn) {
			width: 100%;
		}

		.scroll-hint--inline {
			position: absolute;
			right: 0;
			bottom: 0;
			left: 0;
			margin: 0;
			padding-top: 1rem;
			font-size: 0.6875rem;
			opacity: 0.55;
			pointer-events: none;
			background: linear-gradient(
				to top,
				rgba(16, 18, 30, 0.98) 50%,
				rgba(16, 18, 30, 0.65) 75%,
				transparent
			);
		}
	}

	@media (max-width: 768px) and (max-height: 700px) {
		.scroll-home {
			--scroll-home-planet-max: min(19dvh, 7.25rem);
		}

		.scroll-home__stage :global(.scroll-home__terminal--whoami) {
			--scroll-home-planet-max: min(17dvh, 6.5rem);
		}

		.scroll-home__stage :global(.scroll-home__terminal--work) {
			--scroll-home-planet-max: min(20dvh, 7.5rem);
		}

		.scroll-home__stage :global(.scroll-home__terminal--contact) {
			--scroll-home-planet-max: min(15dvh, 6rem);
		}

		.scroll-home__stage :global(.scroll-home__terminal .terminal__body) {
			--terminal-body-pad: 0.85rem 0.95rem 0.95rem;
		}

		.scroll-home__bio {
			margin-top: 0.5rem;
			font-size: 0.9375rem;
			line-height: 1.45;
		}

		.scroll-home__actions {
			margin-top: 1rem;
			gap: 0.5rem;
		}

		.scroll-home__stage :global(.scroll-home__terminal--contact .scroll-home__actions) {
			margin-top: 0.75rem;
		}

		.scroll-home__stage :global(.scroll-home__terminal--contact .terminal__title) {
			font-size: clamp(1.75rem, 8vw, 2.25rem);
		}
	}

	@media (max-width: 768px) and (max-height: 600px) {
		.scroll-home {
			--scroll-home-planet-max: min(16dvh, 6.25rem);
		}

		.scroll-home__stage :global(.scroll-home__terminal--whoami) {
			--scroll-home-planet-max: min(14dvh, 5.5rem);
		}

		.scroll-home__stage :global(.scroll-home__terminal--contact) {
			--scroll-home-planet-max: min(12dvh, 5rem);
		}

		.scroll-home__stage :global(.scroll-home__terminal .terminal__body) {
			--terminal-body-pad: 0.7rem 0.8rem 0.8rem;
		}

		.scroll-home__stage :global(.scroll-home__content .terminal__title) {
			font-size: clamp(1.55rem, 7.5vw, 2rem);
		}

		.scroll-home__actions :global(.btn) {
			padding-block: 0.6rem;
			font-size: 0.9375rem;
		}

		.scroll-home__stage :global(.scroll-home__terminal--whoami .terminal-tech) {
			gap: 0.35rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.scroll-home {
			height: auto;
			min-height: 100vh;
		}

		.scroll-home__stage {
			position: relative;
			inset: auto;
		}

		.scroll-home__content {
			animation: none;
		}
	}
</style>
