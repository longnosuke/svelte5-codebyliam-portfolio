<script lang="ts">
	import { projects } from '$lib/data/projects';
	import { site } from '$lib/data/site';
	import TerminalWindow from '$lib/components/TerminalWindow.svelte';

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

		<ul class="project-list">
			{#each filtered as project (project.slug)}
				<li>
					<a
						class="project-row"
						class:project-row--soon={project.comingSoon}
						href="/portfolio/{project.slug}"
					>
						<span class="project-row__name">{project.title}</span>
						<span class="tag">{project.type}{#if project.comingSoon} · soon{/if}</span>
					</a>
				</li>
			{/each}
		</ul>
	</TerminalWindow>
</div>

<style>
	.filters {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin: 1rem 0 1.25rem;
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

	.project-list {
		list-style: none;
		margin: 0;
		padding: 0;
		border-top: 1px solid var(--color-border);
	}

	.project-row {
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

	.project-row:hover {
		color: var(--color-accent);
	}

	@media (hover: none), (pointer: coarse) {
		.filter:hover:not(.filter--active) {
			border-color: var(--color-border);
			color: var(--color-text-muted);
		}

		.project-row:hover {
			color: var(--color-text);
		}
	}

	.project-row--soon {
		opacity: 0.65;
	}

	.project-row__name {
		flex: 1;
	}
</style>
