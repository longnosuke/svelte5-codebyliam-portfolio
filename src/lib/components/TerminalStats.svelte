<script lang="ts">
	import { homeStats } from '$lib/data/home';
</script>

<div class="terminal-stats" role="group" aria-label="Experience highlights">
	{#each homeStats as stat, i}
		{#if i > 0}
			<span class="terminal-stats__divider" aria-hidden="true"></span>
		{/if}
		<div class="terminal-stat">
			<span class="terminal-stat__value">{stat.value}</span>
			<span class="terminal-stat__label">{stat.label}</span>
		</div>
	{/each}
</div>
