<script lang="ts">
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';

	type Props = {
		placement?: 'fixed' | 'inline';
		label?: string;
	};

	let { placement = 'fixed', label = 'scroll ↓' }: Props = $props();

	let visible = $state(false);
	let dismissed = $state(false);
	let reducedMotion = $state(false);

	const HIDE_AFTER_MS = 9000;
	const SCROLL_THRESHOLD = 12;

	function isHome(pathname: string): boolean {
		return pathname === '/';
	}

	function findScrollTarget(): HTMLElement | null {
		const body =
			document.querySelector<HTMLElement>('.page-shell .terminal__body') ?? null;
		return body;
	}

	function isScrollable(el: HTMLElement): boolean {
		if (el === document.documentElement) {
			return document.documentElement.scrollHeight > window.innerHeight + SCROLL_THRESHOLD;
		}
		return el.scrollHeight > el.clientHeight + SCROLL_THRESHOLD;
	}

	function getScrollTop(el: HTMLElement): number {
		return el === document.documentElement ? window.scrollY : el.scrollTop;
	}

	function dismiss() {
		dismissed = true;
		visible = false;
	}

	function evaluate() {
		if (dismissed || isHome($page.url.pathname)) {
			visible = false;
			return;
		}

		const target = findScrollTarget();
		if (!target) {
			visible = false;
			return;
		}

		visible = isScrollable(target) && getScrollTop(target) < SCROLL_THRESHOLD;
	}

	let scrollTarget: HTMLElement | null = null;
	let resizeObserver: ResizeObserver | undefined;
	let hideTimer: ReturnType<typeof setTimeout> | undefined;

	function onTargetScroll() {
		if (!scrollTarget) return;
		if (getScrollTop(scrollTarget) >= SCROLL_THRESHOLD) dismiss();
		else evaluate();
	}

	function teardownListeners() {
		clearTimeout(hideTimer);
		resizeObserver?.disconnect();
		resizeObserver = undefined;
		if (scrollTarget === document.documentElement) {
			window.removeEventListener('scroll', onTargetScroll);
		} else if (scrollTarget) {
			scrollTarget.removeEventListener('scroll', onTargetScroll);
		}
		scrollTarget = null;
	}

	function setup() {
		teardownListeners();
		if (isHome($page.url.pathname)) return;

		scrollTarget = findScrollTarget();
		if (!scrollTarget) return;

		if (scrollTarget === document.documentElement) {
			window.addEventListener('scroll', onTargetScroll, { passive: true });
		} else {
			scrollTarget.addEventListener('scroll', onTargetScroll, { passive: true });
		}

		resizeObserver = new ResizeObserver(() => evaluate());
		resizeObserver.observe(scrollTarget);
		const shell = document.querySelector('.page-shell');
		if (shell && shell !== scrollTarget) resizeObserver.observe(shell);

		evaluate();

		if (!reducedMotion) {
			hideTimer = setTimeout(() => {
				if (visible && scrollTarget && getScrollTop(scrollTarget) < SCROLL_THRESHOLD) {
					dismiss();
				}
			}, HIDE_AFTER_MS);
		}
	}

	function queueSetup() {
		requestAnimationFrame(() => {
			requestAnimationFrame(setup);
		});
	}

	onMount(() => {
		reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		queueSetup();

		const unsub = page.subscribe(() => {
			if (isHome($page.url.pathname)) {
				visible = false;
				teardownListeners();
				return;
			}
			dismissed = false;
			queueSetup();
		});

		return () => {
			unsub();
			teardownListeners();
		};
	});

	afterNavigate(() => {
		if (isHome($page.url.pathname)) return;
		dismissed = false;
		queueSetup();
	});
</script>

{#if visible && placement === 'fixed'}
	<p
		class="scroll-hint scroll-hint--fixed"
		class:scroll-hint--static={reducedMotion}
		aria-hidden="true"
	>
		{label}
	</p>
{/if}
