<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		title?: string;
		command?: string;
		prompt?: string;
		children: Snippet;
		aside?: Snippet;
		footer?: Snippet;
		split?: boolean;
		homeChrome?: boolean;
		statusDot?: boolean;
		class?: string;
	};

	let {
		title = 'liam@portfolio',
		command,
		prompt = 'liam@portfolio:~',
		children,
		aside,
		footer,
		split = false,
		homeChrome = false,
		statusDot = false,
		class: className = ''
	}: Props = $props();
</script>

<article class="terminal {className}" class:terminal--split={split}>
	<div class="terminal__bar" class:terminal__bar--home={homeChrome}>
		<div class="terminal__dots" class:terminal__dots--home={homeChrome} aria-hidden="true">
			<span></span><span></span><span></span>
		</div>
		<span class="terminal__host">{title}</span>
		{#if statusDot}
			<span class="terminal__status" aria-hidden="true"></span>
		{/if}
	</div>
	<div class="terminal__body" class:terminal__body--split={split}>
		{#if command}
			<p class="terminal__prompt-line">
				<span class="terminal__prompt">{prompt}</span>
				<span class="terminal__command">{command}</span>
				<span class="terminal__cursor" aria-hidden="true"></span>
			</p>
		{/if}
		<div class="terminal__grid">
			<div class="terminal__main">
				{@render children()}
			</div>
			{#if aside}
				<aside class="terminal__aside">
					{@render aside()}
				</aside>
			{/if}
		</div>
	</div>
	{#if footer}
		<footer class="terminal__footer">
			{@render footer()}
		</footer>
	{/if}
</article>
