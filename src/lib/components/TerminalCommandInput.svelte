<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import {
		ghostSuffixFromHints,
		resolveTerminalInput,
		terminalGhostHints
	} from '$lib/search/site-search';

	type Props = {
		hostPrompt?: string;
		/** ms between idle ghost rotations */
		rotateMs?: number;
	};

	let { hostPrompt = 'Liam@portfolio:~', rotateMs = 1000 }: Props = $props();

	const hints = terminalGhostHints();

	let query = $state('');
	let rotateIndex = $state(0);
	let focused = $state(false);
	let inputEl = $state<HTMLInputElement | null>(null);
	let didAutofocus = false;

	const ghost = $derived(ghostSuffixFromHints(query, hints, rotateIndex));
	const idleHint = $derived(hints[rotateIndex % hints.length] ?? '');

	const showIdleGhost = $derived(!query);

	$effect(() => {
		if (!browser || didAutofocus || !inputEl) return;
		inputEl.focus({ preventScroll: true });
		didAutofocus = true;
	});

	onMount(() => {
		if (!browser) return;

		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reducedMotion) return;

		const id = window.setInterval(() => {
			if (!query) {
				rotateIndex = (rotateIndex + 1) % Math.max(hints.length, 1);
			}
		}, rotateMs);

		return () => window.clearInterval(id);
	});

	function acceptGhost() {
		if (!ghost) return;
		query = query + ghost;
	}

	function submit() {
		const line = query.trim() || idleHint;
		const target = resolveTerminalInput(line);
		if (!target) return;

		if (target.external) {
			window.open(target.href, '_blank', 'noopener,noreferrer');
		} else {
			goto(target.href);
		}
		query = '';
		inputEl?.blur();
	}

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Tab') {
			if (ghost) {
				event.preventDefault();
				acceptGhost();
			}
			return;
		}

		if (event.key === 'Enter') {
			event.preventDefault();
			submit();
			return;
		}

		if (event.key === 'Escape') {
			event.preventDefault();
			query = '';
		}
	}
</script>

<div class="terminal-cmd">
	<label class="terminal-cmd__row terminal__prompt-line">
		<span class="terminal__prompt">{hostPrompt}</span>
		<span class="terminal-cmd__field">
			<span class="terminal-cmd__mirror" aria-hidden="true">
				{#if showIdleGhost}
					{#if focused}
						<span class="terminal__cursor" aria-hidden="true"></span>
					{/if}
					<span class="terminal-cmd__ghost">{idleHint}</span>
				{:else}
					<span class="terminal-cmd__typed">{query}</span>
					{#if focused}
						<span class="terminal__cursor" aria-hidden="true"></span>
					{/if}
					<span class="terminal-cmd__ghost">{ghost}</span>
				{/if}
			</span>
			<input
				bind:this={inputEl}
				class="terminal-cmd__input"
				type="text"
				spellcheck="false"
				autocomplete="off"
				autocapitalize="off"
				enterkeyhint="go"
				aria-label="Terminal command"
				bind:value={query}
				onfocus={() => (focused = true)}
				onblur={() => (focused = false)}
				onkeydown={onKeydown}
			/>
		</span>
	</label>

	<p class="terminal-cmd__hint" aria-hidden="true">
		<span>tab</span> complete · <span>enter</span> run
	</p>
</div>

<style>
	.terminal-cmd {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: 100%;
	}

	.terminal-cmd__row {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 0.35rem 0.5rem;
		width: 100%;
		margin: 0;
		cursor: text;
	}

	.terminal-cmd__field {
		position: relative;
		flex: 1;
		min-width: 0;
	}

	.terminal-cmd__mirror,
	.terminal-cmd__input {
		font: inherit;
		line-height: 1.5;
		letter-spacing: inherit;
	}

	.terminal-cmd__mirror {
		display: inline;
		white-space: nowrap;
		pointer-events: none;
		user-select: none;
	}

	.terminal-cmd__typed {
		color: var(--color-text);
	}

	.terminal-cmd__ghost {
		color: var(--color-text-muted);
		opacity: 0.42;
	}

	.terminal-cmd__input {
		position: absolute;
		inset: 0;
		width: 100%;
		margin: 0;
		padding: 0;
		border: 0;
		background: transparent;
		color: transparent;
		caret-color: transparent;
		outline: none;
	}

	.terminal-cmd__hint {
		margin: 0;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--color-text-muted);
		opacity: 0.65;
	}

	.terminal-cmd__hint span {
		color: var(--color-accent);
	}
</style>
