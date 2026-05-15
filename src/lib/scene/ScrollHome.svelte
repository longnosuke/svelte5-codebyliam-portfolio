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

	let scrollProgress = $state(0);
	let activeSection = $state(0);
	let reducedMotion = $state(false);
	let scrollRoot: HTMLElement | undefined;
	let canvasReady = $state(false);

	const sections = homeSections;
	const current = $derived(sections[activeSection]);
	onMount(() => {
		reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		const id = requestAnimationFrame(() => {
			canvasReady = true;
		});

		if (reducedMotion || !scrollRoot) {
			return () => cancelAnimationFrame(id);
		}

		gsap.registerPlugin(ScrollTrigger);

		ScrollTrigger.create({
			trigger: scrollRoot,
			start: 'top top',
			end: 'bottom bottom',
			scrub: 0.9,
			onUpdate: (self) => {
				scrollProgress = self.progress;
				activeSection = Math.min(
					sections.length - 1,
					Math.floor(self.progress * sections.length)
				);
			}
		});

		return () => {
			cancelAnimationFrame(id);
			ScrollTrigger.getAll().forEach((t) => t.kill());
		};
	});
</script>

{#if browser && canvasReady && !reducedMotion}
	<ScrollSpaceBackdrop {scrollProgress} />
	<SceneCanvas {scrollProgress} />
{:else if browser && canvasReady}
	<ScrollSpaceBackdrop scrollProgress={0} animate={false} />
	<div class="static-fallback galaxy-backdrop" aria-hidden="true"></div>
{/if}

<div
	class="scroll-home"
	bind:this={scrollRoot}
	style="--section-count: {sections.length}; --section-scroll: 50vh"
>
	<div class="scroll-home__stage">
		<TerminalWindow split homeChrome statusDot class="scroll-home__terminal">
			{#snippet aside()}
				{#key current.planet}
					<TerminalPlanet planet={current.planet} />
				{/key}
			{/snippet}

			{#snippet footer()}
				<TerminalCommandInput hostPrompt="Liam@portfolio:~" />
			{/snippet}

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

			<p class="scroll-home__hint" aria-hidden="true">
				scroll · {activeSection + 1}/{sections.length}
			</p>
		</TerminalWindow>
	</div>
</div>

<style>
	.scroll-home {
		position: relative;
		z-index: var(--z-overlay);
		height: calc(var(--section-count) * var(--section-scroll, 100vh));
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

	.scroll-home__hint {
		margin: 1.25rem 0 0;
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		opacity: 0.7;
	}

	.static-fallback {
		position: fixed;
		inset: 0;
		z-index: var(--z-canvas);
		pointer-events: none;
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
