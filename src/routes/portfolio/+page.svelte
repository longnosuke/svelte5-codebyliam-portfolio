<script lang="ts">
	import SeoHead from '$lib/components/SeoHead.svelte';
	import TerminalWindow from '$lib/components/TerminalWindow.svelte';
	import {
		partitionPortfolioProjects,
		projectImageSrc,
		projects,
		type Project
	} from '$lib/data/projects';
	import { site } from '$lib/data/site';
	import { portfolioIndexSeo } from '$lib/seo';

	const types = ['all', ...new Set(projects.map((p) => p.type))];

	let activeFilter = $state<string>('all');

	const filtered = $derived(
		activeFilter === 'all' ? projects : projects.filter((p) => p.type === activeFilter)
	);

	const sections = $derived(partitionPortfolioProjects(filtered));
	const showSections = $derived(activeFilter === 'all');

	const primaryFlagship = $derived(sections.flagship.slice(0, 2));
	const secondaryFlagship = $derived(sections.flagship.slice(2));

	function projectHref(project: Project): string {
		return `/portfolio/${project.slug}`;
	}

	function yearLabel(project: Project): string | null {
		const y = project.detail.year;
		return y ? String(y) : null;
	}

	function thumbAlt(project: Project): string {
		return project.detail.screenshots[0]?.alt ?? `${project.title} preview`;
	}
</script>

<SeoHead {...portfolioIndexSeo} />

<div class="page-shell">
	<TerminalWindow title="~/work" command="ls -la ./projects">
		<p class="terminal__output terminal__output--muted">
			{filtered.length} entries · shipped by {site.alias}
		</p>

		<div class="filters" role="tablist" aria-label="Filter by type">
			{#each types as type}
				<button
					type="button"
					role="tab"
					class="filter"
					class:filter--active={activeFilter === type}
					aria-selected={activeFilter === type}
					onclick={() => (activeFilter = type)}
				>
					[{type === 'all' ? 'all' : type}]
				</button>
			{/each}
		</div>

		{#if showSections}
			{#if sections.flagship.length > 0}
				<section class="block" aria-labelledby="flagship-heading">
					<header class="block__head">
						<h2 id="flagship-heading" class="block__kicker">// flagship</h2>
						<p class="block__note">Fullstack products and core client systems</p>
					</header>

					<div class="flagship-primary">
						{#each primaryFlagship as project (project.slug)}
							<a class="flagship-card flagship-card--lead" href={projectHref(project)}>
								<div class="flagship-card__media">
									<img
										src={projectImageSrc(project)}
										alt={thumbAlt(project)}
										width="640"
										height="400"
										loading="lazy"
										decoding="async"
									/>
								</div>
								<div class="flagship-card__body">
									<span class="flagship-card__badge">flagship</span>
									<span class="flagship-card__title">{project.title}</span>
									<p class="flagship-card__summary">{project.detail.summary}</p>
									<span class="tag">{project.type}{#if yearLabel(project)} · {yearLabel(project)}{/if}</span>
								</div>
							</a>
						{/each}
					</div>

					{#if secondaryFlagship.length > 0}
						<ul class="flagship-secondary">
							{#each secondaryFlagship as project (project.slug)}
								<li>
									<a class="flagship-card flagship-card--compact" href={projectHref(project)}>
										<div class="flagship-card__media">
											<img
												src={projectImageSrc(project)}
												alt={thumbAlt(project)}
												width="320"
												height="200"
												loading="lazy"
												decoding="async"
											/>
										</div>
										<div class="flagship-card__body">
											<span class="flagship-card__title">{project.title}</span>
											<p class="flagship-card__summary">{project.detail.summary}</p>
											<span class="tag">{project.type}</span>
										</div>
									</a>
								</li>
							{/each}
						</ul>
					{/if}
				</section>
			{/if}

			{#if sections.comingSoon.length > 0}
				<section class="block block--soon" aria-labelledby="soon-heading">
					<header class="block__head">
						<h2 id="soon-heading" class="block__kicker">// in_progress</h2>
						<p class="block__note">Case studies open when shipped</p>
					</header>
					<ul class="soon-list">
						{#each sections.comingSoon as project (project.slug)}
							<li>
								<a class="soon-row" href={projectHref(project)}>
									<span class="soon-row__status" aria-hidden="true">pending</span>
									<span class="soon-row__name">{project.title}</span>
									<span class="tag">{project.type}</span>
								</a>
							</li>
						{/each}
					</ul>
				</section>
			{/if}

			{#if sections.client.length > 0}
				<section class="block" aria-labelledby="client-heading">
					<header class="block__head">
						<h2 id="client-heading" class="block__kicker">// client_sites</h2>
						<p class="block__note">
							{sections.client.length} WordPress builds · retail, B2B, travel, education
						</p>
					</header>
					<ul class="client-list">
						{#each sections.client as project, i (project.slug)}
							<li>
								<a class="client-row" href={projectHref(project)}>
									<span class="client-row__index" aria-hidden="true"
										>{String(i + 1).padStart(2, '0')}</span
									>
									<img
										class="client-row__thumb"
										src={projectImageSrc(project)}
										alt=""
										aria-hidden="true"
										width="72"
										height="48"
										loading="lazy"
										decoding="async"
									/>
									<span class="client-row__name">{project.title}</span>
									{#if yearLabel(project)}
										<span class="client-row__year">{yearLabel(project)}</span>
									{/if}
								</a>
							</li>
						{/each}
					</ul>
				</section>
			{/if}
		{:else}
			<ul class="filter-list">
				{#each filtered as project (project.slug)}
					<li>
						<a
							class="filter-row"
							class:filter-row--flagship={project.tier === 'flagship'}
							class:filter-row--soon={project.comingSoon}
							href={projectHref(project)}
						>
							{#if project.tier === 'flagship'}
								<img
									class="filter-row__thumb"
									src={projectImageSrc(project)}
									alt={thumbAlt(project)}
									width="96"
									height="60"
									loading="lazy"
									decoding="async"
								/>
							{/if}
							<span class="filter-row__name">{project.title}</span>
							<span class="tag"
								>{project.type}{#if project.comingSoon} · soon{/if}{#if yearLabel(project)} · {yearLabel(project)}{/if}</span
							>
						</a>
					</li>
				{/each}
			</ul>
		{/if}

		<p class="terminal__output intro">
			Flagship apps and client ecosystems first; WordPress storefronts grouped below. Open a
			slug for problem, stack, and solution.
		</p>
	</TerminalWindow>
</div>

<style>
	.intro {
		margin: 1.75rem 0 0;
		max-width: 42rem;
		line-height: 1.65;
		color: var(--color-text-muted);
	}

	.filters {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin: 1rem 0 1.5rem;
	}

	.filter {
		padding: 0.25rem 0.5rem;
		border: 1px solid var(--color-border);
		border-radius: 4px;
		background: transparent;
		color: var(--color-text-muted);
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		transition:
			border-color var(--motion-fast),
			color var(--motion-fast);
	}

	.filter:hover,
	.filter--active {
		border-color: var(--color-accent);
		color: var(--color-accent);
	}

	.block {
		margin-top: 2rem;
	}

	.block:first-of-type {
		margin-top: 0.25rem;
	}

	.block__head {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.35rem 1rem;
		margin-bottom: 1rem;
		padding-bottom: 0.65rem;
		border-bottom: 1px solid var(--color-border);
	}

	.block__kicker {
		margin: 0;
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		font-weight: 500;
		color: var(--color-accent);
		letter-spacing: 0.02em;
	}

	.block__note {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}

	.flagship-primary {
		display: grid;
		gap: 1rem;
	}

	@media (min-width: 720px) {
		.flagship-primary {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	.flagship-secondary {
		list-style: none;
		margin: 1rem 0 0;
		padding: 0;
		display: grid;
		gap: 0.85rem;
		grid-template-columns: minmax(0, 1fr);
	}

	@media (min-width: 640px) {
		.flagship-secondary {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (min-width: 768px) {
		.flagship-secondary {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}

	.flagship-secondary li {
		min-width: 0;
	}

	.flagship-card {
		display: flex;
		flex-direction: column;
		height: 100%;
		border: 1px solid var(--color-border);
		border-radius: 6px;
		background: rgba(217, 119, 87, 0.04);
		color: var(--color-text);
		overflow: hidden;
		transition:
			border-color 0.22s ease-out,
			background-color 0.22s ease-out,
			transform 0.22s ease-out;
	}

	.flagship-card:hover {
		border-color: var(--color-accent-soft);
		background: rgba(217, 119, 87, 0.09);
	}

	.flagship-card:focus-visible {
		outline: 2px solid var(--color-accent);
		outline-offset: 2px;
	}

	.flagship-card__media {
		aspect-ratio: 16 / 10;
		overflow: hidden;
		background: rgba(0, 0, 0, 0.35);
	}

	.flagship-card--compact .flagship-card__media {
		aspect-ratio: 5 / 3;
	}

	.flagship-card__media img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: top center;
	}

	.flagship-card__body {
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
		padding: 0.9rem 1rem 1.1rem;
		flex: 1;
	}

	.flagship-card__badge {
		align-self: flex-start;
		padding: 0.15rem 0.45rem;
		border: 1px solid var(--color-accent-soft);
		border-radius: 3px;
		font-family: var(--font-mono);
		font-size: 0.7rem;
		letter-spacing: 0.06em;
		text-transform: lowercase;
		color: var(--color-accent);
	}

	.flagship-card__title {
		font-family: var(--font-mono);
		font-size: clamp(1rem, 0.9rem + 0.35vw, 1.2rem);
		font-weight: 600;
		line-height: 1.25;
	}

	.flagship-card__summary {
		margin: 0;
		flex: 1;
		font-size: var(--text-sm);
		line-height: 1.55;
		color: var(--color-text-muted);
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.flagship-card--compact .flagship-card__summary {
		-webkit-line-clamp: 2;
		line-clamp: 2;
	}

	.block--soon .block__kicker {
		color: var(--color-text-muted);
	}

	.soon-list {
		list-style: none;
		margin: 0;
		padding: 0;
		border: 1px dashed var(--color-border);
		border-radius: 6px;
		background: rgba(12, 14, 24, 0.5);
	}

	.soon-row {
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		gap: 0.75rem 1rem;
		padding: 0.85rem 1rem;
		border-bottom: 1px dashed var(--color-border);
		color: var(--color-text-muted);
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		transition: color var(--motion-fast);
	}

	.soon-list li:last-child .soon-row {
		border-bottom: none;
	}

	.soon-row:hover {
		color: var(--color-text);
	}

	.soon-row__status {
		padding: 0.12rem 0.4rem;
		border-radius: 3px;
		background: rgba(244, 243, 238, 0.06);
		font-size: 0.72rem;
		letter-spacing: 0.04em;
		text-transform: lowercase;
		color: var(--color-text-muted);
	}

	.soon-row__name {
		color: var(--color-text);
		opacity: 0.85;
	}

	.client-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 0;
		border-top: 1px solid var(--color-border);
	}

	.client-row {
		display: grid;
		grid-template-columns: 2.25rem 4.5rem 1fr auto;
		align-items: center;
		gap: 0.65rem 0.85rem;
		padding: 0.65rem 0;
		border-bottom: 1px solid var(--color-border);
		color: var(--color-text);
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		transition: color var(--motion-fast);
	}

	.client-row:hover {
		color: var(--color-accent);
	}

	.client-row__index {
		font-size: 0.75rem;
		color: var(--color-text-muted);
		opacity: 0.7;
	}

	.client-row__thumb {
		display: block;
		width: 4.5rem;
		height: 3rem;
		border-radius: 3px;
		object-fit: cover;
		object-position: top center;
		opacity: 0.88;
	}

	.client-row:hover .client-row__thumb {
		opacity: 1;
	}

	.client-row__name {
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.client-row__year {
		color: var(--color-text-muted);
		font-size: 0.8rem;
	}

	.filter-list {
		list-style: none;
		margin: 0;
		padding: 0;
		border-top: 1px solid var(--color-border);
	}

	.filter-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 1rem 0;
		border-bottom: 1px solid var(--color-border);
		color: var(--color-text);
		font-family: var(--font-mono);
		font-size: var(--text-base);
		transition: color var(--motion-fast);
	}

	.filter-row--flagship {
		flex-wrap: wrap;
		padding: 1.1rem 0;
	}

	.filter-row__thumb {
		flex: 0 0 6rem;
		width: 6rem;
		height: 3.75rem;
		border-radius: 4px;
		object-fit: cover;
	}

	.filter-row__name {
		flex: 1;
		min-width: 10rem;
	}

	.filter-row--soon {
		opacity: 0.7;
	}

	.filter-row:hover {
		color: var(--color-accent);
	}

	@media (hover: none), (pointer: coarse) {
		.filter:hover:not(.filter--active) {
			border-color: var(--color-border);
			color: var(--color-text-muted);
		}

		.flagship-card:hover {
			border-color: var(--color-border);
			background: rgba(217, 119, 87, 0.04);
		}

		.client-row:hover,
		.filter-row:hover,
		.soon-row:hover {
			color: inherit;
		}

		.client-row:hover {
			color: var(--color-text);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.flagship-card {
			transition: border-color var(--motion-fast), background-color var(--motion-fast);
		}
	}
</style>
