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

    // Config
    const HOLD_THRESHOLD = 150;   // ms before we treat as hold
    const MIN_SEND_INTERVAL = 300;

    let isHolding = $state(false);
    let holdTimeout: any;
    let holdInterval: any;
    let lastSendTime = 0;
    let downTime = 0;

    let holdSpeed = 500;       // start slower (ms)
    const MIN_SPEED = 40;      // fastest allowed
    const ACCEL_STEP = 10;     // speedup per tick

    // --- Grow animation config ---
    let growScale = $state(1);
    const MAX_SCALE = 1.2;   // limit growth
    const GROW_RATE = 0.00003;  // growth per ms (smooth)
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

        // Optimistic UI update
        count += amount;

        const { error } = await supabase
            .from("click_counter_dev")
            .update({ total: count })
            .eq("id", 1);

        if (error) {
            console.error("Update failed", error);
            getClicks();
        }
    }

    function handleMouseDown() {
        downTime = Date.now();
        pendingClicks = 0;
        isHolding = false;

        growScale = 1; // reset grow size

        playSound();

        // After HOLD_THRESHOLD → enter hold mode
        holdTimeout = setTimeout(() => {
            isHolding = true;
            pendingClicks = 1; // first hold increment
            startHoldLoop();
        }, HOLD_THRESHOLD);
    }

    function handleMouseUp() {
        clearTimeout(holdTimeout);
        stopHoldLoop();

        growScale = 1; // reset when released
        isHolding = false;

        const heldDuration = Date.now() - downTime;

        // Normal click
        if (heldDuration < HOLD_THRESHOLD) {
            sendClick(1);
            pendingClicks = 0;
            growScale = 0.95;
            return;
        }

        // Hold release → batch update
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

            // --- Add growth effect ---
            growScale = Math.min(MAX_SCALE, growScale + delta * GROW_RATE);

            pendingClicks += 1;
            playSound(); // sound on each increment
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
            .from("click_counter_dev")
            .select("total")
            .eq("id", 1)
            .single();

        if (!error) count = data.total;
    }

    onMount(() => {
        if (browser) audio = new Audio(clickSound);
        getClicks();
    });
</script>

<div class="container">
    <button
            bind:this={buttonRef}
            class="button"
            class:holding={isHolding}
            style="transform: scale({growScale})"
            onmousedown={handleMouseDown}
            onmouseup={handleMouseUp}
            onmouseleave={handleMouseUp}
    >
        <div class="top"> Click me {count}
            {#if pendingClicks > 0}
                <span class="pending">+{pendingClicks}</span>
            {/if}
        </div>
        <div class="bottom"></div>

    </button>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  button {
    width: 140px;
    height: 50px;
    position: relative;
    background: none;
    outline: none;
    border: none;
    padding: 0;
    margin: 0;
    -webkit-user-select:none;
    user-select:none;
  }
  .top {
    width: 100%;
    height: 100%;
    background: #ffa487;
    font-size: 16px;
    color: rgb(36, 38, 34);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 7mm;
    outline: 2px solid rgb(36, 38, 34);
    transition: 0.2s;
    position: relative;
    overflow: hidden;
  }
  .bottom {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #ffa487;
    top: 10px;
    left: 0;
    border-radius: 7mm;
    outline: 2px solid rgb(36, 38, 34);
    z-index: -1;
  }
  .bottom::before {
    position: absolute;
    content: "";
    width: 2px;
    height: 9px;
    background: rgb(36, 38, 34);
    bottom: 0;
    left: 15%;
  }
  .bottom::after {
    position: absolute;
    content: "";
    width: 2px;
    height: 9px;
    background: rgb(36, 38, 34);
    bottom: 0;
    left: 85%;
  }
  button:active .top {
    transform: translateY(10px);
  }
  button::before {
    position: absolute;
    content: "";
    width: calc(100% + 2px);
    height: 100%;
    background: rgb(140, 140, 140);
    top: 14px;
    left: -1px;
    border-radius: 7mm;
    outline: 2px solid rgb(36, 38, 34);
    z-index: -1;
  }
  .top::before {
    position: absolute;
    content: "";
    width: 15px;
    height: 100%;
    background: rgba(0, 0, 0, 0.1);
    transform: skewX(30deg);
    left: -20px;
    transition: 0.25s;
  }
  button:active .top::before {
    left: calc(100% + 20px);
  }

  .button.holding {
    border-color: #666;
    width: 160px;
    animation: tilt-shaking 0.3s ease-in-out infinite;
  }

  @keyframes tilt-shaking {
    0% { transform: rotate(0deg); }
    25% { transform: rotate(2deg); }
    50% { transform: rotate(0eg); }
    75% { transform: rotate(-2deg); }
    100% { transform: rotate(0deg); }
  }

  .pending {
    margin-left: 6px;
    color: #999;
    font-size: 0.85em;
    font-weight: bold;
  }

</style>