<script lang="ts">
	import TerminalWindow from '$lib/components/TerminalWindow.svelte';
	import { projects, type Project } from '$lib/data/projects';

	type Props = {
		project: Project;
	};

	let { project }: Props = $props();

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

			<figure class="hero">
				<img
					src="/projects/{project.imageUrl}"
					alt={project.title}
					width="1200"
					height="720"
					decoding="async"
				/>
			</figure>
		</div>

		{#if project.promoVideoUrl}
			<section class="block block--video" aria-labelledby="demo-heading">
				<p id="demo-heading" class="block__label">$ demo</p>
				<video
					class="promo-video"
					controls
					playsinline
					preload="metadata"
					poster={project.promoVideoPoster
						? `/projects/${project.promoVideoPoster}`
						: undefined}
					aria-label="{project.title} product demo"
				>
					<source src={project.promoVideoUrl} type="video/mp4" />
					<track kind="captions" />
				</video>
			</section>
		{/if}

		<section class="block block--stack" aria-labelledby="stack-heading">
			<p id="stack-heading" class="block__label">$ stack</p>
			<ul class="stack">
				{#each detail.techStack as tech}
					<li>{tech}</li>
				{/each}
			</ul>
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
								<img
									src="/projects/{shot.src}"
									alt={shot.alt}
									loading="lazy"
									decoding="async"
									width="800"
									height="480"
								/>
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

	.hero img {
		display: block;
		width: 100%;
		aspect-ratio: 5 / 3;
		object-fit: cover;
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

	.promo-video {
		display: block;
		width: 100%;
		max-width: 720px;
		margin: 0 auto;
		border-radius: 6px;
		border: 1px solid var(--color-border);
		background: #000;
		aspect-ratio: 9 / 16;
		object-fit: contain;
	}

	.stack {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.stack li {
		padding: 0.35rem 0.85rem;
		border-radius: 4px;
		border: 1px solid var(--color-border);
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--color-text-muted);
		background: rgba(0, 0, 0, 0.2);
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

	.shot img {
		display: block;
		width: 100%;
		aspect-ratio: 5 / 3;
		object-fit: cover;
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
