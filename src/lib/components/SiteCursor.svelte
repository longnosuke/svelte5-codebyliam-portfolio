<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	const INTERACTIVE =
		'a, button, [role="button"], [role="tab"], .btn, .filter, .project-row, .clickme__btn, .nav__toggle';

	let enabled = $state(false);
	let visible = $state(false);
	let pressing = $state(false);
	let isPointer = $state(false);
	let x = $state(0);
	let y = $state(0);

	function onPointerMove(e: PointerEvent) {
		x = e.clientX;
		y = e.clientY;
		visible = true;

		const el = document.elementFromPoint(e.clientX, e.clientY);
		isPointer = !!el?.closest(INTERACTIVE);
	}

	function onPointerLeave() {
		visible = false;
	}

	function onPointerEnter() {
		visible = true;
	}

	function onPointerDown() {
		pressing = true;
	}

	function onPointerUp() {
		pressing = false;
	}

	onMount(() => {
		if (!browser) return;

		const finePointer = window.matchMedia('(pointer: fine)').matches;
		if (!finePointer) return;

		enabled = true;
		document.documentElement.classList.add('has-custom-cursor');

		window.addEventListener('pointermove', onPointerMove, { passive: true });
		document.addEventListener('pointerleave', onPointerLeave);
		document.addEventListener('pointerenter', onPointerEnter);
		window.addEventListener('pointerdown', onPointerDown, { passive: true });
		window.addEventListener('pointerup', onPointerUp, { passive: true });

		return () => {
			document.documentElement.classList.remove('has-custom-cursor');
			window.removeEventListener('pointermove', onPointerMove);
			document.removeEventListener('pointerleave', onPointerLeave);
			document.removeEventListener('pointerenter', onPointerEnter);
			window.removeEventListener('pointerdown', onPointerDown);
			window.removeEventListener('pointerup', onPointerUp);
		};
	});
</script>

{#if enabled}
	<div
		class="site-cursor"
		class:site-cursor--hidden={!visible}
		class:site-cursor--pointer={isPointer}
		class:site-cursor--pressing={pressing}
		style="transform: translate3d({x}px, {y}px, 0) translate(-50%, -50%)"
		aria-hidden="true"
	>
		<span class="site-cursor__orbit"></span>
		<span class="site-cursor__core"></span>
		<span class="site-cursor__flare"></span>
	</div>
{/if}

<style>
	.site-cursor {
		position: fixed;
		top: 0;
		left: 0;
		z-index: var(--z-cursor);
		width: 0;
		height: 0;
		pointer-events: none;
		will-change: transform;
	}

	.site-cursor__orbit {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 44px;
		height: 44px;
		border: 2px solid rgba(107, 91, 149, 0.55);
		border-radius: 50%;
		transform: translate(-50%, -50%);
		transition:
			width 0.2s ease,
			height 0.2s ease,
			border-color 0.2s ease,
			opacity 0.2s ease;
	}

	.site-cursor__core {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: radial-gradient(
			circle at 35% 35%,
			#f4f3ee 0%,
			var(--color-accent) 45%,
			#b85a3f 100%
		);
		box-shadow:
			0 0 16px var(--color-accent-soft),
			0 0 32px rgba(217, 119, 87, 0.4);
		transform: translate(-50%, -50%);
		transition:
			width 0.2s ease,
			height 0.2s ease,
			box-shadow 0.2s ease,
			transform 0.1s ease;
	}

	.site-cursor__flare {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--color-nebula-blue);
		opacity: 0.7;
		transform: translate(calc(-50% + 22px), calc(-50% - 16px));
		transition:
			transform 0.25s ease,
			opacity 0.2s ease;
	}

	.site-cursor--pointer .site-cursor__orbit {
		width: 68px;
		height: 68px;
		border-color: var(--color-accent);
		border-width: 2.5px;
	}

	.site-cursor--pointer .site-cursor__core {
		width: 22px;
		height: 22px;
		box-shadow:
			0 0 20px var(--color-accent-soft),
			0 0 40px rgba(217, 119, 87, 0.5);
	}

	.site-cursor--pointer .site-cursor__flare {
		transform: translate(calc(-50% + 34px), calc(-50% - 24px));
		opacity: 1;
		background: var(--color-nebula-purple);
	}

	.site-cursor--pressing .site-cursor__core {
		transform: translate(-50%, -50%) scale(0.75);
	}

	.site-cursor--pressing .site-cursor__orbit {
		width: 34px;
		height: 34px;
	}

	.site-cursor--hidden {
		opacity: 0;
	}

	@media (min-width: 1920px) {
		.site-cursor__orbit {
			width: 52px;
			height: 52px;
		}

		.site-cursor__core {
			width: 20px;
			height: 20px;
		}

		.site-cursor__flare {
			width: 9px;
			height: 9px;
			transform: translate(calc(-50% + 26px), calc(-50% - 19px));
		}

		.site-cursor--pointer .site-cursor__orbit {
			width: 80px;
			height: 80px;
		}

		.site-cursor--pointer .site-cursor__core {
			width: 26px;
			height: 26px;
		}

		.site-cursor--pointer .site-cursor__flare {
			transform: translate(calc(-50% + 40px), calc(-50% - 28px));
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.site-cursor__orbit,
		.site-cursor__core,
		.site-cursor__flare {
			transition-duration: 0.01ms;
		}
	}
</style>
