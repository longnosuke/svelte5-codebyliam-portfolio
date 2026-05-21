<script lang="ts">
	import { getTechIcon } from '$lib/data/tech-icons';

	type Props = {
		items: string[];
	};

	let { items }: Props = $props();
</script>

<div class="stack-marquee" role="region" aria-label="Tech stack">
	<div class="stack-marquee__fade stack-marquee__fade--left" aria-hidden="true"></div>
	<div class="stack-marquee__fade stack-marquee__fade--right" aria-hidden="true"></div>
	<div class="stack-marquee__viewport">
		<div class="stack-marquee__track">
			{#each [0, 1] as copy (copy)}
				<ul class="stack-marquee__group" aria-hidden={copy === 1}>
					{#each items as tech (copy + tech)}
						{@const Icon = getTechIcon(tech)}
						<li>
							<span class="stack-marquee__pill">
								<span class="stack-marquee__icon" aria-hidden="true">
									<Icon size={15} strokeWidth={2} />
								</span>
								<span class="stack-marquee__label">{tech}</span>
							</span>
						</li>
					{/each}
				</ul>
			{/each}
		</div>
	</div>
</div>

<style>
	.stack-marquee {
		position: relative;
		margin: 0 -0.25rem;
	}

	.stack-marquee__viewport {
		overflow: hidden;
	}

	.stack-marquee__fade {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 2.5rem;
		z-index: 2;
		pointer-events: none;
	}

	.stack-marquee__fade--left {
		left: 0;
		background: linear-gradient(90deg, var(--color-terminal-bg, #10121e) 15%, transparent);
	}

	.stack-marquee__fade--right {
		right: 0;
		background: linear-gradient(270deg, var(--color-terminal-bg, #10121e) 15%, transparent);
	}

	.stack-marquee__track {
		display: flex;
		width: max-content;
		animation: stack-marquee-scroll 36s linear infinite;
	}

	.stack-marquee:hover .stack-marquee__track,
	.stack-marquee:focus-within .stack-marquee__track {
		animation-play-state: paused;
	}

	.stack-marquee__group {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		gap: 0.5rem;
		margin: 0;
		padding: 0 0.35rem 0 0;
		list-style: none;
	}

	.stack-marquee__pill {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.45rem 0.9rem;
		border: 1px solid var(--color-border);
		border-radius: 6px;
		background: rgba(0, 0, 0, 0.28);
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--color-text-muted);
		white-space: nowrap;
		transition:
			color var(--motion-fast),
			border-color var(--motion-fast),
			background var(--motion-fast),
			transform var(--motion-fast),
			box-shadow var(--motion-fast);
	}

	.stack-marquee__icon {
		display: flex;
		color: var(--color-text-muted);
		flex-shrink: 0;
		transition: color var(--motion-fast);
	}

	.stack-marquee__pill:hover,
	.stack-marquee__pill:focus-visible {
		color: var(--color-text);
		border-color: var(--color-accent);
		background: var(--color-accent-soft);
		transform: translateY(-2px);
		box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
	}

	.stack-marquee__pill:hover .stack-marquee__icon,
	.stack-marquee__pill:focus-visible .stack-marquee__icon {
		color: var(--color-accent);
	}

	@keyframes stack-marquee-scroll {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}

	@media (hover: none), (pointer: coarse) {
		.stack-marquee__pill:hover {
			transform: none;
			box-shadow: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.stack-marquee__track {
			animation: none;
			flex-wrap: nowrap;
			overflow-x: auto;
			max-width: 100%;
			scrollbar-width: thin;
			scrollbar-color: var(--color-border) transparent;
		}

		.stack-marquee__viewport {
			overflow-x: auto;
		}

		.stack-marquee__group[aria-hidden='true'] {
			display: none;
		}
	}
</style>
