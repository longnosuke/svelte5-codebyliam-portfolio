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
		<p class="eyebrow">boot</p>
		<h1 class="terminal__title">Loading galaxy…</h1>
		<p class="terminal__output terminal__output--muted">Initializing scene</p>
	</div>
{/if}

