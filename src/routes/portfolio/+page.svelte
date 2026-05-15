<script lang="ts">
	import { projects } from '$lib/data/projects';
	import { site } from '$lib/data/site';

	const types = ['all', ...new Set(projects.map((p) => p.type))];

	let activeFilter = $state<string>('all');

	const filtered = $derived(
		activeFilter === 'all' ? projects : projects.filter((p) => p.type === activeFilter)
	);
</script>

<svelte:head>
	<title>Work — CodebyLiam</title>
</svelte:head>

<div class="page-shell">
	<p class="eyebrow">Work</p>
	<h1 class="title">Selected projects</h1>
	<p class="lead">A sample of what {site.alias} has shipped — full list on GitHub and client sites.</p>

	<div class="filters" role="tablist" aria-label="Filter by type">
		{#each types as type}
			<button
				type="button"
				role="tab"
				class:active={activeFilter === type}
				aria-selected={activeFilter === type}
				onclick={() => (activeFilter = type)}
			>
				{type === 'all' ? 'All' : type.replace(/-/g, ' ')}
			</button>
		{/each}
	</div>

	<ul class="grid">
		{#each filtered as project (project.title)}
			<li>
				<a
					class="card"
					class:card--soon={project.comingSoon}
					href={project.comingSoon ? undefined : project.url}
					target={project.comingSoon ? undefined : '_blank'}
					rel={project.comingSoon ? undefined : 'noopener noreferrer'}
				>
					<img
						src="/projects/{project.imageUrl}"
						alt={project.title}
						loading="lazy"
						decoding="async"
						width="400"
						height="240"
					/>
					<div class="card__body">
						<h2>{project.title}</h2>
						<p>{project.type}{#if project.comingSoon} · coming soon{/if}</p>
					</div>
				</a>
			</li>
		{/each}
	</ul>
</div>

<style>
	.eyebrow {
		margin: 0 0 0.5rem;
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		color: var(--color-accent);
	}

	.title {
		margin: 0 0 1rem;
		font-family: var(--font-display);
		font-size: clamp(2rem, 5vw, 3rem);
	}

	.lead {
		margin: 0 0 1.5rem;
		color: var(--color-text-muted);
		max-width: 50ch;
	}

	.filters {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 2rem;
	}

	.filters button {
		padding: 0.4rem 0.9rem;
		border-radius: 999px;
		border: 1px solid var(--color-border);
		background: transparent;
		color: var(--color-text-muted);
		font-size: 0.8rem;
		text-transform: capitalize;
		transition:
			border-color var(--motion-fast),
			color var(--motion-fast),
			background var(--motion-fast);
	}

	.filters button:hover,
	.filters button.active {
		border-color: var(--color-accent);
		color: var(--color-accent);
	}

	.filters button.active {
		background: var(--color-accent-soft);
	}

	.grid {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 1.25rem;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
	}

	.card {
		display: block;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		overflow: hidden;
		background: var(--color-bg-elevated);
		transition: border-color var(--motion-fast);
	}

	.card:hover {
		border-color: var(--color-accent);
		color: inherit;
	}

	.card--soon {
		opacity: 0.65;
		pointer-events: none;
	}

	.card img {
		display: block;
		width: 100%;
		aspect-ratio: 5 / 3;
		object-fit: cover;
	}

	.card__body {
		padding: 1rem 1.25rem 1.25rem;
	}

	.card h2 {
		margin: 0 0 0.35rem;
		font-size: 1.1rem;
	}

	.card p {
		margin: 0;
		font-size: 0.85rem;
		color: var(--color-text-muted);
		text-transform: capitalize;
	}
</style>
