<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import clickSound from '../assets/sound/click.mp3';
	import { launchConfetti } from '../utils/launchConfetti';
	import { supabase } from '$lib/supabase';

	let count: number = $state(0);
	let pendingClicks: number = $state(0);
	let audio: HTMLAudioElement | undefined;
	let buttonRef: HTMLButtonElement;

	const HOLD_THRESHOLD = 150;
	const MIN_SEND_INTERVAL = 300;

	let isHolding = $state(false);
	let holdTimeout: ReturnType<typeof setTimeout> | undefined;
	let holdInterval: ReturnType<typeof setTimeout> | undefined;
	let lastSendTime = 0;
	let downTime = 0;

	let holdSpeed = 500;
	const MIN_SPEED = 40;
	const ACCEL_STEP = 10;

	let growScale = $state(1);
	const MAX_SCALE = 1.15;
	const GROW_RATE = 0.00003;
	let lastTickTime = 0;

	function playSound() {
		if (!audio) return;
		audio.currentTime = 0;
		audio.play();
	}

	async function sendClick(amount: number) {
		const now = Date.now();
		if (now - lastSendTime < MIN_SEND_INTERVAL) return;

		lastSendTime = now;
		count += amount;

		const { error } = await supabase
			.from('click_counter_dev')
			.update({ total: count })
			.eq('id', 1);

		if (error) {
			console.error('Update failed', error);
			getClicks();
		}
	}

	function handleMouseDown() {
		downTime = Date.now();
		pendingClicks = 0;
		isHolding = false;
		growScale = 1;
		playSound();

		holdTimeout = setTimeout(() => {
			isHolding = true;
			pendingClicks = 1;
			startHoldLoop();
		}, HOLD_THRESHOLD);
	}

	function handleMouseUp() {
		clearTimeout(holdTimeout);
		stopHoldLoop();
		growScale = 1;
		isHolding = false;

		const heldDuration = Date.now() - downTime;

		if (heldDuration < HOLD_THRESHOLD) {
			sendClick(1);
			pendingClicks = 0;
			growScale = 0.98;
			return;
		}

		if (pendingClicks > 0) {
			sendClick(pendingClicks);
			launchConfetti();
		}

		pendingClicks = 0;
	}

	function startHoldLoop() {
		holdSpeed = 200;
		lastTickTime = performance.now();

		const tick = (now: number) => {
			if (!isHolding) return;

			const delta = now - lastTickTime;
			lastTickTime = now;

			growScale = Math.min(MAX_SCALE, growScale + delta * GROW_RATE);
			pendingClicks += 1;
			playSound();
			holdSpeed = Math.max(MIN_SPEED, holdSpeed - ACCEL_STEP);

			holdInterval = setTimeout(() => requestAnimationFrame(tick), holdSpeed);
		};

		requestAnimationFrame(tick);
	}

	function stopHoldLoop() {
		clearTimeout(holdInterval);
	}

	async function getClicks() {
		const { data, error } = await supabase
			.from('click_counter_dev')
			.select('total')
			.eq('id', 1)
			.single();

		if (!error) count = data.total;
	}

	onMount(() => {
		if (browser) audio = new Audio(clickSound);
		getClicks();
	});
</script>

<div class="clickme">
	<button
		bind:this={buttonRef}
		type="button"
		class="clickme__btn"
		class:clickme__btn--holding={isHolding}
		style="transform: scale({growScale})"
		onmousedown={handleMouseDown}
		onmouseup={handleMouseUp}
		onmouseleave={handleMouseUp}
	>
		click [{count}]
		{#if pendingClicks > 0}
			<span class="clickme__pending">+{pendingClicks}</span>
		{/if}
	</button>
</div>

<style>
	.clickme {
		display: flex;
		justify-content: center;
		padding-top: 0.5rem;
	}

	.clickme__btn {
		padding: 0.65rem 1.25rem;
		border: 1px solid var(--color-accent);
		border-radius: var(--radius-terminal);
		background: rgba(217, 119, 87, 0.12);
		color: var(--color-accent);
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		transition:
			background var(--motion-fast),
			transform 0.1s ease;
	}

	.clickme__btn:hover {
		background: rgba(217, 119, 87, 0.22);
	}

	.clickme__btn--holding {
		animation: shake 0.25s ease-in-out infinite;
	}

	.clickme__pending {
		margin-left: 0.35rem;
		opacity: 0.7;
	}

	@keyframes shake {
		0%,
		100% {
			transform: rotate(0deg);
		}
		25% {
			transform: rotate(1deg);
		}
		75% {
			transform: rotate(-1deg);
		}
	}
</style>
