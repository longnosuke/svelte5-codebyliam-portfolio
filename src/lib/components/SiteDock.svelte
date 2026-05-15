<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { dockLinks } from '$lib/data/site';
	import { createDockMagnify } from '$lib/components/dockMagnify';
	import Home from '@lucide/svelte/icons/home';
	import Code2 from '@lucide/svelte/icons/code-2';
	import Rss from '@lucide/svelte/icons/rss';
	import Mail from '@lucide/svelte/icons/mail';
	import User from '@lucide/svelte/icons/user';

	const icons = { home: Home, code: Code2, rss: Rss, mail: Mail, user: User } as const;

	let dockEl: HTMLElement | undefined = $state();
	let scales = $state<number[]>(dockLinks.map(() => 1));
	let magnifyEnabled = $state(false);
	let reducedMotion = $state(false);

	function isActive(href: string, pathname: string): boolean {
		if (href === '/') return pathname === '/';
		if (href === '/portfolio') {
			return pathname === '/portfolio' || pathname.startsWith('/portfolio/');
		}
		return pathname === href;
	}

	function iconTransform(index: number): string {
		const scale = scales[index] ?? 1;
		const lift = (scale - 1) * -12;
		return `translateY(${lift}px) scale(${scale})`;
	}

	function getCenters(): number[] {
		if (!dockEl) return [];
		const items = dockEl.querySelectorAll<HTMLElement>('.site-dock__item');
		return [...items].map((el) => {
			const rect = el.getBoundingClientRect();
			return rect.left + rect.width / 2;
		});
	}

	onMount(() => {
		reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const finePointer = window.matchMedia('(pointer: fine)').matches;
		magnifyEnabled = finePointer && !reducedMotion;

		if (!magnifyEnabled) return;

		const magnify = createDockMagnify(getCenters);
		magnify.onUpdate = (next) => {
			scales = next;
		};

		const onMove = (e: PointerEvent) => magnify.pointerMove(e.clientX);
		const onLeave = () => magnify.pointerLeave();

		dockEl?.addEventListener('pointermove', onMove);
		dockEl?.addEventListener('pointerleave', onLeave);

		return () => {
			dockEl?.removeEventListener('pointermove', onMove);
			dockEl?.removeEventListener('pointerleave', onLeave);
			magnify.destroy();
		};
	});
</script>

<nav class="site-dock" aria-label="Site">
	<div class="site-dock__enter" class:site-dock__enter--static={reducedMotion}>
		<div class="site-dock__pill" bind:this={dockEl}>
			{#each dockLinks as link, i}
				{@const Icon = icons[link.icon]}
				{@const active = isActive(link.href, $page.url.pathname)}
				{@const external = 'external' in link && link.external}
				<a
					href={link.href}
					class="site-dock__item"
					class:site-dock__item--active={active}
					style={magnifyEnabled ? `transform: ${iconTransform(i)}` : undefined}
					aria-label={link.label}
					aria-current={active ? 'page' : undefined}
					title={link.label}
					target={external ? '_blank' : undefined}
					rel={external ? 'noopener noreferrer' : undefined}
				>
					<span class="site-dock__icon" style="animation-delay: calc(0.15s + {i} * 40ms)">
						<Icon size={24} strokeWidth={1.85} aria-hidden="true" />
					</span>
					{#if active}
						<span class="site-dock__dot" aria-hidden="true"></span>
					{/if}
					<span class="site-dock__tooltip">{link.label}</span>
				</a>
			{/each}
		</div>
	</div>
</nav>

<style>
	.site-dock {
		position: fixed;
		left: 50%;
		bottom: max(1rem, env(safe-area-inset-bottom));
		z-index: var(--z-dock);
		transform: translateX(-50%);
		pointer-events: none;
	}

	.site-dock__enter {
		pointer-events: auto;
		animation: dock-enter 0.65s cubic-bezier(0.34, 1.2, 0.64, 1) both;
		animation-delay: 0.15s;
	}

	.site-dock__enter--static {
		animation: none;
	}

	.site-dock__pill {
		display: flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.5rem 1.1rem;
		border-radius: 9999px;
		background: var(--color-dock-bg);
		backdrop-filter: blur(20px) saturate(1.15);
		-webkit-backdrop-filter: blur(20px) saturate(1.15);
		border: 1px solid var(--color-dock-border);
		box-shadow: var(--shadow-dock);
	}

	.site-dock__item {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-width: 44px;
		min-height: 44px;
		padding: 0.25rem;
		color: var(--color-text);
		transform-origin: center bottom;
		will-change: transform;
		transition: color var(--motion-fast);
	}

	.site-dock__item:hover,
	.site-dock__item--active {
		color: var(--color-accent);
	}

	.site-dock__item:focus-visible {
		outline: 2px solid var(--color-accent);
		outline-offset: 3px;
		border-radius: 10px;
	}

	@media (pointer: coarse) {
		.site-dock__item:active .site-dock__icon {
			transform: scale(1.12);
		}
	}

	.site-dock__icon {
		display: flex;
		align-items: center;
		justify-content: center;
		animation: dock-icon-enter 0.5s cubic-bezier(0.34, 1.2, 0.64, 1) both;
		transition: transform var(--motion-fast);
		filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.65));
	}

	.site-dock__icon :global(svg) {
		stroke: currentColor;
	}

	.site-dock__dot {
		position: absolute;
		bottom: 4px;
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: var(--color-accent);
	}

	.site-dock__tooltip {
		position: absolute;
		bottom: calc(100% + 0.5rem);
		left: 50%;
		transform: translateX(-50%) translateY(4px);
		padding: 0.2rem 0.5rem;
		font-family: var(--font-sans);
		font-size: 0.7rem;
		white-space: nowrap;
		color: var(--color-text);
		background: var(--color-dock-bg);
		border: 1px solid var(--color-dock-border);
		box-shadow: var(--shadow-dock);
		border-radius: 6px;
		opacity: 0;
		pointer-events: none;
		transition:
			opacity var(--motion-fast),
			transform var(--motion-fast);
	}

	.site-dock__item:hover .site-dock__tooltip,
	.site-dock__item:focus-visible .site-dock__tooltip {
		opacity: 1;
		transform: translateX(-50%) translateY(0);
	}

	@keyframes dock-enter {
		from {
			opacity: 0;
			transform: translateY(18px) scale(0.92);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	@keyframes dock-icon-enter {
		from {
			opacity: 0;
			transform: translateY(8px) scale(0.85);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.site-dock__enter {
			animation: none;
		}

		.site-dock__icon {
			animation: none;
		}
	}
</style>
