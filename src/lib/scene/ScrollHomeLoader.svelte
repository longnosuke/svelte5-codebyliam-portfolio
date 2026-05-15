<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	let ScrollHome = $state<typeof import('./ScrollHome.svelte').default | null>(null);

	onMount(async () => {
		const mod = await import('./ScrollHome.svelte');
		ScrollHome = mod.default;
	});
</script>

{#if browser && ScrollHome}
	<ScrollHome />
{:else}
	<div class="scroll-fallback page-shell">
		<p class="eyebrow">Portfolio</p>
		<h1>I build interactive things.</h1>
		<p class="lead">Loading experience…</p>
		<a class="btn btn--primary" href="/portfolio">View work</a>
	</div>
{/if}

<style>
	.scroll-fallback {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.eyebrow {
		color: var(--color-accent);
		text-transform: uppercase;
		letter-spacing: 0.2em;
		font-size: 0.75rem;
	}

	h1 {
		font-family: var(--font-display);
		font-size: clamp(2rem, 6vw, 3.5rem);
	}
</style>
