<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import SceneCanvas from './SceneCanvas.svelte';
	import { site } from '$lib/data/site';

	let scrollProgress = $state(0);
	let reducedMotion = $state(false);
	let scrollRoot: HTMLElement | undefined;
	let canvasReady = $state(false);

	const sections = [
		{
			eyebrow: 'Portfolio',
			title: 'I build interactive things.',
			body: `Hi — I'm ${site.name}, also known as ${site.alias}. Fullstack developer based in ${site.location}.`
		},
		{
			eyebrow: 'Focus',
			title: 'Interfaces that feel alive.',
			body: 'Svelte, TypeScript, WordPress, and tools that ship. The scene scrolls with you — same idea I bring to products.'
		},
		{
			eyebrow: 'Work',
			title: 'Selected projects.',
			body: 'Client sites, internal tools, and fullstack apps. See the full list on the work page.'
		},
		{
			eyebrow: 'Next',
			title: 'Let\'s build something.',
			body: 'Open to work. Browse the portfolio or get in touch.'
		}
	];

	onMount(async () => {
		reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		canvasReady = true;

		if (reducedMotion || !scrollRoot) return;

		gsap.registerPlugin(ScrollTrigger);

		ScrollTrigger.create({
			trigger: scrollRoot,
			start: 'top top',
			end: 'bottom bottom',
			scrub: 0.6,
			onUpdate: (self) => {
				scrollProgress = self.progress;
			}
		});

		const panels = scrollRoot.querySelectorAll<HTMLElement>('.scroll-panel');
		panels.forEach((panel) => {
			gsap.fromTo(
				panel,
				{ autoAlpha: 0.15, y: 40 },
				{
					autoAlpha: 1,
					y: 0,
					scrollTrigger: {
						trigger: panel,
						start: 'top 75%',
						end: 'top 35%',
						scrub: 0.5
					}
				}
			);
		});

		return () => ScrollTrigger.getAll().forEach((t) => t.kill());
	});
</script>

{#if browser && canvasReady && !reducedMotion}
	<SceneCanvas {scrollProgress} />
{:else if browser && canvasReady}
	<div class="static-fallback" aria-hidden="true"></div>
{/if}

<div class="scroll-home" bind:this={scrollRoot}>
	<div class="scroll-home__track">
		{#each sections as section, i}
			<section class="scroll-panel" style:--i={i}>
				<p class="scroll-panel__eyebrow">{section.eyebrow}</p>
				<h1 class="scroll-panel__title">{section.title}</h1>
				<p class="scroll-panel__body">{section.body}</p>
				{#if i === sections.length - 1}
					<div class="scroll-panel__actions">
						<a class="btn btn--primary" href="/portfolio">View work</a>
						<a class="btn" href="/contact">Contact</a>
					</div>
				{:else if i === 2}
					<a class="btn" href="/portfolio">View work →</a>
				{/if}
			</section>
		{/each}
	</div>
</div>

<style>
	.scroll-home {
		position: relative;
		z-index: var(--z-overlay);
	}

	.scroll-home__track {
		position: relative;
	}

	.scroll-panel {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 6rem var(--space-page) 4rem;
		max-width: 720px;
	}

	.scroll-panel__eyebrow {
		margin: 0 0 0.75rem;
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		color: var(--color-accent);
	}

	.scroll-panel__title {
		margin: 0 0 1rem;
		font-family: var(--font-display);
		font-size: clamp(2.25rem, 7vw, 4.5rem);
		line-height: 1.05;
		font-weight: 700;
	}

	.scroll-panel__body {
		margin: 0;
		font-size: clamp(1rem, 2.2vw, 1.15rem);
		color: var(--color-text-muted);
		line-height: 1.75;
		max-width: 38ch;
	}

	.scroll-panel__actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 2rem;
	}

	.static-fallback {
		position: fixed;
		inset: 0;
		z-index: var(--z-canvas);
		background:
			radial-gradient(ellipse 80% 50% at 50% 0%, var(--color-accent-soft), transparent),
			var(--color-bg);
		pointer-events: none;
	}

	@media (max-width: 768px) {
		.scroll-panel {
			padding-top: 5rem;
		}
	}
</style>
