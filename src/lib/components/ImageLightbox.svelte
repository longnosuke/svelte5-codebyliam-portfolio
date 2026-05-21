<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		src: string;
		alt: string;
		caption?: string;
		children: Snippet;
	};

	let { src, alt, caption, children }: Props = $props();

	let dialogEl: HTMLDialogElement | undefined = $state();
	let triggerEl: HTMLButtonElement | undefined = $state();

	function open() {
		dialogEl?.showModal();
	}

	function close() {
		dialogEl?.close();
		triggerEl?.focus();
	}

	function onDialogClick(event: MouseEvent) {
		if (event.target === dialogEl) close();
	}
</script>

<button
	type="button"
	class="lightbox-trigger"
	bind:this={triggerEl}
	onclick={open}
	aria-label="View full size: {alt}"
>
	{@render children()}
</button>

<dialog
	bind:this={dialogEl}
	class="lightbox"
	aria-modal="true"
	aria-label={alt}
	onclick={onDialogClick}
	onclose={() => triggerEl?.focus()}
>
	<div class="lightbox__panel">
		<button type="button" class="lightbox__close" onclick={close} aria-label="Close preview">
			<span aria-hidden="true">×</span>
		</button>
		<img class="lightbox__img" {src} {alt} decoding="async" />
		{#if caption}
			<p class="lightbox__caption">{caption}</p>
		{/if}
	</div>
</dialog>

<style>
	.lightbox-trigger {
		display: block;
		width: 100%;
		margin: 0;
		padding: 0;
		border: none;
		background: none;
		cursor: zoom-in;
		text-align: inherit;
		font: inherit;
		color: inherit;
	}

	.lightbox-trigger:focus-visible {
		outline: 2px solid var(--color-accent);
		outline-offset: 2px;
	}

	.lightbox-trigger :global(img) {
		display: block;
		width: 100%;
	}

	.lightbox {
		margin: auto;
		max-width: min(96vw, 1200px);
		max-height: 96vh;
		padding: 0;
		border: 1px solid var(--color-terminal-border);
		border-radius: var(--radius-terminal);
		background: var(--color-terminal-bg);
		color: var(--color-text);
		box-shadow: var(--shadow-terminal);
		overflow: visible;
	}

	.lightbox::backdrop {
		background: rgba(8, 10, 18, 0.88);
	}

	.lightbox__panel {
		position: relative;
		padding: 0.75rem;
	}

	.lightbox__close {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		padding: 0;
		border: 1px solid var(--color-border);
		border-radius: 4px;
		font-family: var(--font-mono);
		font-size: 1.25rem;
		line-height: 1;
		color: var(--color-text);
		background: rgba(0, 0, 0, 0.35);
		cursor: pointer;
		transition:
			color var(--motion-fast),
			border-color var(--motion-fast),
			background var(--motion-fast);
	}

	.lightbox__close:hover {
		color: var(--color-accent);
		border-color: var(--color-accent);
		background: var(--color-accent-soft);
	}

	.lightbox__close:focus-visible {
		outline: 2px solid var(--color-accent);
		outline-offset: 2px;
	}

	.lightbox__img {
		display: block;
		max-width: min(92vw, 1120px);
		max-height: min(82vh, 900px);
		width: auto;
		height: auto;
		margin: 0 auto;
		border-radius: 4px;
		border: 1px solid var(--color-border);
		object-fit: contain;
	}

	.lightbox__caption {
		margin: 0.75rem 0 0;
		padding-top: 0.65rem;
		border-top: 1px solid var(--color-border);
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--color-text-muted);
		text-align: center;
	}

	@media (prefers-reduced-motion: no-preference) {
		.lightbox[open] {
			animation: lightbox-in 0.18s ease-out;
		}

		.lightbox[open]::backdrop {
			animation: lightbox-backdrop-in 0.18s ease-out;
		}
	}

	@keyframes lightbox-in {
		from {
			opacity: 0;
			transform: scale(0.98);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	@keyframes lightbox-backdrop-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
