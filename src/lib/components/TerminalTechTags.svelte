<script lang="ts">
	import { homeTech } from '$lib/data/home';
	import Code2 from '@lucide/svelte/icons/code-2';
	import Braces from '@lucide/svelte/icons/braces';
	import Layers from '@lucide/svelte/icons/layers';

	const icons = {
		svelte: Code2,
		typescript: Braces,
		wordpress: Layers
	} as const;
</script>

<ul class="terminal-tech" aria-label="Tech stack">
	{#each homeTech as item}
		{@const Icon = icons[item.icon]}
		<li>
			<span class="terminal-tech__pill">
				<span class="terminal-tech__icon" aria-hidden="true">
					<Icon size={16} strokeWidth={2} />
				</span>
				{item.name}
			</span>
		</li>
	{/each}
</ul>

<style>
	.terminal-tech__icon {
		display: flex;
		color: var(--color-accent);
		flex-shrink: 0;
	}
</style>
