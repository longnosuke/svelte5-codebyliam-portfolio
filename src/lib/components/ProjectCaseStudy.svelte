<script lang="ts">
	import { onMount } from 'svelte';
	import ImageLightbox from '$lib/components/ImageLightbox.svelte';
	import ProjectTechStack from '$lib/components/ProjectTechStack.svelte';
	import TerminalWindow from '$lib/components/TerminalWindow.svelte';
	import { projects, type Project } from '$lib/data/projects';

	type Props = {
		project: Project;
	};

	let { project }: Props = $props();

	let heroViewport: HTMLDivElement | undefined = $state();

	const detail = $derived(project.detail);
	const hasLiveUrl = $derived(
		!project.comingSoon &&
			project.url.length > 0 &&
			project.url !== '#' &&
			project.url !== '/'
	);

	const index = $derived(projects.findIndex((p) => p.slug === project.slug));
	const prev = $derived(index > 0 ? projects[index - 1] : null);
	const next = $derived(index < projects.length - 1 ? projects[index + 1] : null);

	onMount(() => {
		if (!project.heroScroll || !heroViewport) return;

		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reducedMotion) return;

		const el = heroViewport;
		let direction = 1;
		let paused = false;
		let frame = 0;
		let resumeTimer: ReturnType<typeof setTimeout> | undefined;

		const pause = () => {
			paused = true;
		};
		const resume = () => {
			clearTimeout(resumeTimer);
			paused = false;
		};
		const pauseBriefly = () => {
			pause();
			clearTimeout(resumeTimer);
			resumeTimer = setTimeout(resume, 2400);
		};

		el.addEventListener('pointerenter', pause);
		el.addEventListener('pointerleave', resume);
		el.addEventListener('focusin', pause);
		el.addEventListener('focusout', resume);
		el.addEventListener('wheel', pauseBriefly, { passive: true });
		el.addEventListener('touchstart', pauseBriefly, { passive: true });

		const tick = () => {
			const maxScroll = el.scrollHeight - el.clientHeight;
			if (!paused && maxScroll > 4) {
				el.scrollTop += direction * 0.55;
				if (el.scrollTop >= maxScroll - 1) direction = -1;
				else if (el.scrollTop <= 1) direction = 1;
			}
			frame = requestAnimationFrame(tick);
		};

		frame = requestAnimationFrame(tick);

		return () => {
			cancelAnimationFrame(frame);
			clearTimeout(resumeTimer);
			el.removeEventListener('pointerenter', pause);
			el.removeEventListener('pointerleave', resume);
			el.removeEventListener('focusin', pause);
			el.removeEventListener('focusout', resume);
			el.removeEventListener('wheel', pauseBriefly);
			el.removeEventListener('touchstart', pauseBriefly);
		};
	});
</script>

<div class="page-shell">
	<TerminalWindow title="~/work/{project.slug}" command="cat case-study.md">
		<a class="back" href="/portfolio">← cd ..</a>

		{#if project.comingSoon}
			<p class="banner" role="status">Coming soon — this project is still in progress.</p>
		{/if}

		<div class="hero-grid">
			<div class="meta-panel">
				<h1 class="terminal__title">{project.title}</h1>
				<p class="terminal__output terminal__output--muted">{detail.summary}</p>

				<div class="stats">
					<span class="tag">{project.type.replace(/-/g, ' ')}</span>
					{#if detail.year}
						<span class="tag">{detail.year}</span>
					{/if}
					{#if detail.role}
						<span class="tag">{detail.role}</span>
					{/if}
				</div>

				<div class="meta__actions">
					{#if hasLiveUrl}
						<a
							class="btn btn--primary"
							href={project.url}
							target="_blank"
							rel="noopener noreferrer"
						>
							Visit live site
						</a>
					{/if}
					{#if detail.repoUrl}
						<a class="btn" href={detail.repoUrl} target="_blank" rel="noopener noreferrer">
							View repo
						</a>
					{/if}
				</div>
			</div>

			<figure class="hero" class:hero--scroll={project.heroScroll}>
				{#if project.heroScroll}
					<div
						class="hero__viewport"
						bind:this={heroViewport}
						tabindex="0"
						aria-label="{project.title} app preview — scroll to explore"
					>
						<ImageLightbox
							src="/projects/{project.imageUrl}"
							alt="{project.title} mobile app screenshot"
						>
							<img
								src="/projects/{project.imageUrl}"
								alt="{project.title} mobile app screenshot"
								width="780"
								height="1688"
								decoding="async"
							/>
						</ImageLightbox>
					</div>
				{:else}
					<ImageLightbox src="/projects/{project.imageUrl}" alt={project.title}>
						<img
							src="/projects/{project.imageUrl}"
							alt={project.title}
							width="1200"
							height="720"
							decoding="async"
						/>
					</ImageLightbox>
				{/if}
			</figure>
		</div>

		<section class="block block--stack" aria-labelledby="stack-heading">
			<p id="stack-heading" class="block__label">$ stack</p>
			<ProjectTechStack items={detail.techStack} />
		</section>

		<div class="panels">
			<section class="panel" aria-labelledby="problem-heading">
				<p id="problem-heading" class="panel__label">
					<span class="panel__index">01</span> // problem
				</p>
				<div class="panel__body">
					<p class="prose">{detail.problem}</p>
				</div>
			</section>

			<section class="panel" aria-labelledby="solution-heading">
				<p id="solution-heading" class="panel__label">
					<span class="panel__index">02</span> // solution
				</p>
				<div class="panel__body">
					<p class="prose">{detail.solution}</p>
				</div>
			</section>
		</div>

		{#if detail.screenshots.length > 0}
			<section class="block" aria-labelledby="screenshots-heading">
				<p id="screenshots-heading" class="block__label">$ screenshots</p>
				<ul class="gallery">
					{#each detail.screenshots as shot}
						<li>
							<figure class="shot">
								<div class="shot__chrome" aria-hidden="true">
									<span></span><span></span><span></span>
								</div>
								<div
									class="shot__viewport"
									tabindex="0"
									aria-label="{shot.alt} — scroll to explore"
								>
									<ImageLightbox
										src="/projects/{shot.src}"
										alt={shot.alt}
										caption={shot.caption}
									>
										<img
											src="/projects/{shot.src}"
											alt={shot.alt}
											loading="lazy"
											decoding="async"
											width="800"
											height="480"
										/>
									</ImageLightbox>
								</div>
								{#if shot.caption}
									<figcaption>{shot.caption}</figcaption>
								{/if}
							</figure>
						</li>
					{/each}
				</ul>
			</section>
		{/if}

		<nav class="pager" aria-label="Other projects">
			{#if prev}
				<a class="pager__link" href="/portfolio/{prev.slug}">← {prev.title}</a>
			{:else}
				<span></span>
			{/if}
			{#if next}
				<a class="pager__link pager__link--next" href="/portfolio/{next.slug}">{next.title} →</a>
			{/if}
		</nav>
	</TerminalWindow>
</div>

<style>
	.back {
		display: inline-flex;
		align-items: center;
		margin-bottom: 1.25rem;
		padding: 0.4rem 0.75rem;
		border: 1px solid var(--color-border);
		border-radius: 4px;
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-text);
		background: rgba(255, 255, 255, 0.04);
		transition:
			color var(--motion-fast),
			border-color var(--motion-fast),
			background var(--motion-fast);
	}

	.back:hover {
		color: var(--color-accent);
		border-color: var(--color-accent);
		background: var(--color-accent-soft);
	}

	@media (hover: none), (pointer: coarse) {
		.back:hover {
			color: var(--color-text);
			border-color: var(--color-border);
			background: rgba(255, 255, 255, 0.04);
		}
	}

	.banner {
		margin: 0 0 1.25rem;
		padding: 0.75rem 1rem;
		border-radius: var(--radius-terminal);
		border: 1px solid var(--color-accent);
		background: var(--color-accent-soft);
		color: var(--color-text);
		font-size: var(--text-sm);
	}

	.hero-grid {
		display: grid;
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	@media (min-width: 768px) {
		.hero-grid {
			grid-template-columns: 1.1fr 1fr;
			align-items: start;
		}

		.hero {
			order: 1;
		}

		.meta-panel {
			order: 2;
		}
	}

	.meta-panel {
		padding: 1.25rem 1.5rem;
		border: 1px solid var(--color-terminal-border);
		border-radius: var(--radius-terminal);
		background: var(--color-terminal-bg);
		backdrop-filter: blur(20px) saturate(1.15);
		-webkit-backdrop-filter: blur(20px) saturate(1.15);
		box-shadow: var(--shadow-terminal);
	}

	.stats {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin: 1rem 0 1.25rem;
	}

	.meta__actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.hero {
		position: relative;
		margin: 0;
		border-radius: var(--radius-terminal);
		overflow: hidden;
		border: 1px solid var(--color-border);
	}

	.hero::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(
			135deg,
			rgba(107, 91, 149, 0.25) 0%,
			transparent 50%,
			rgba(217, 119, 87, 0.12) 100%
		);
		pointer-events: none;
		z-index: 1;
	}

	.hero :global(.lightbox-trigger img) {
		display: block;
		width: 100%;
		aspect-ratio: 5 / 3;
		object-fit: cover;
	}

	.hero--scroll .hero__viewport {
		max-height: min(52vh, 420px);
		overflow-y: auto;
		overflow-x: hidden;
		overscroll-behavior: contain;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: thin;
		scrollbar-color: var(--color-border) transparent;
	}

	.hero--scroll .hero__viewport:focus-visible {
		outline: 2px solid var(--color-accent);
		outline-offset: 2px;
	}

	.hero--scroll .hero__viewport::-webkit-scrollbar {
		width: 6px;
	}

	.hero--scroll .hero__viewport::-webkit-scrollbar-thumb {
		border-radius: 3px;
		background: var(--color-border);
	}

	.hero--scroll :global(.lightbox-trigger img) {
		width: 100%;
		height: auto;
		aspect-ratio: auto;
		object-fit: unset;
	}

	.hero--scroll::after {
		content: '';
		position: absolute;
		inset: auto 0 0;
		height: 2.75rem;
		background: linear-gradient(to top, rgba(12, 14, 24, 0.92), transparent);
		pointer-events: none;
		z-index: 2;
	}

	.block {
		margin-bottom: 2rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--color-border);
	}

	.block__label {
		margin: 0 0 1rem;
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-accent);
	}

	.panels {
		display: grid;
		gap: 1.25rem;
		margin-bottom: 2rem;
	}

	@media (min-width: 768px) {
		.panels {
			grid-template-columns: 1fr 1fr;
		}
	}

	.panel__label {
		margin: 0 0 0.75rem;
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}

	.panel__index {
		color: var(--color-accent);
		margin-right: 0.35rem;
	}

	.panel__body {
		padding: 1rem 1.25rem;
		border-left: 2px solid var(--color-accent);
		border-radius: 0 var(--radius-terminal) var(--radius-terminal) 0;
		background: rgba(0, 0, 0, 0.15);
	}

	.prose {
		margin: 0;
		color: var(--color-text-muted);
		line-height: 1.75;
		white-space: pre-line;
	}

	.gallery {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 1.25rem;
	}

	@media (min-width: 640px) {
		.gallery {
			grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		}
	}

	.shot {
		margin: 0;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-terminal);
		overflow: hidden;
		background: var(--color-bg-elevated);
	}

	.shot__chrome {
		display: flex;
		gap: 5px;
		padding: 0.5rem 0.75rem;
		background: rgba(0, 0, 0, 0.25);
		border-bottom: 1px solid var(--color-border);
	}

	.shot__chrome span {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--color-border);
	}

	.shot__chrome span:first-child {
		background: #c45c5c;
	}

	.shot__chrome span:nth-child(2) {
		background: #c9a227;
	}

	.shot__chrome span:nth-child(3) {
		background: #5c9e6b;
	}

	.shot__viewport {
		max-height: min(42vh, 360px);
		overflow-y: auto;
		overflow-x: hidden;
		overscroll-behavior: contain;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: thin;
		scrollbar-color: var(--color-border) transparent;
	}

	.shot__viewport:focus-visible {
		outline: 2px solid var(--color-accent);
		outline-offset: -2px;
	}

	.shot__viewport::-webkit-scrollbar {
		width: 6px;
	}

	.shot__viewport::-webkit-scrollbar-thumb {
		border-radius: 3px;
		background: var(--color-border);
	}

	.shot__viewport :global(.lightbox-trigger) {
		display: block;
	}

	.shot__viewport :global(.lightbox-trigger img) {
		display: block;
		width: 100%;
		height: auto;
		aspect-ratio: auto;
		object-fit: unset;
	}

	.shot figcaption {
		padding: 0.65rem 0.85rem;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--color-text-muted);
		border-top: 1px solid var(--color-border);
	}

	.pager {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--color-border);
	}

	.pager__link {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		max-width: 45%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.pager__link--next {
		text-align: right;
		margin-left: auto;
	}

	.pager__link:hover {
		color: var(--color-accent);
	}

	@media (hover: none), (pointer: coarse) {
		.pager__link:hover {
			color: inherit;
		}
	}
</style>
