<script lang="ts">
    import { Tween } from 'svelte/motion';


    // Mouse/touch follower
    const mx = new Tween(0, { duration: 400 });
    const my = new Tween(0, { duration: 400 });

    let gridContainer: HTMLDivElement;
    const GLOW_RADIUS = 150;

    let gridSize = $state(50);

    if (typeof window !== "undefined") {
        if (window.innerWidth < 480) gridSize = 20;
        else if (window.innerWidth < 768) gridSize = 30;
    }

    const cells = Array.from({ length: gridSize * gridSize });

    // Detect mobile once
    const isMobile =
        typeof window !== "undefined" &&
        (window.innerWidth < 768 || "ontouchstart" in window);

    // If mobile → center follower
    if (isMobile) {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        mx.set(cx);
        my.set(cy);
    }

    function updatePosition(e: any) {
        if (isMobile) return; // ❗ No movement on mobile

        const x = e.touches ? e.touches[0].clientX : e.clientX;
        const y = e.touches ? e.touches[0].clientY : e.clientY;

        mx.set(x);
        my.set(y);
    }

    $effect(() => {
        if (!isMobile) {
            window.addEventListener("mousemove", updatePosition);
        }

        return () => {
            if (!isMobile) {
                window.removeEventListener("mousemove", updatePosition);
            }
        };
    });

    // Glow effect
    $effect(() => {
        if (!gridContainer) return;

        const x = mx.target;
        const y = my.target;

        const cells = gridContainer.querySelectorAll(".grid-cell");

        cells.forEach((cell: Element) => {
            const rect = cell.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;

            const dx = x - cx;
            const dy = y - cy;
            const distance = Math.sqrt(dx * dx + dy * dy);

            let glow = 0;
            if (distance < GLOW_RADIUS) {
                glow = 1 - distance / GLOW_RADIUS;
            }

            (cell as HTMLElement).style.setProperty("--glow-factor", glow.toString());
        });
    });
</script>

<div
        class="grid-container"
        bind:this={gridContainer}
        style="--grid-size: {gridSize}"
>
    {#each cells as _, i (i)}
        <span class="grid-cell"></span>
    {/each}
</div>

<div class="overlay-background"></div>

<!-- On mobile: fixed centered dot -->
<div
        class="mouse-follower {isMobile ? 'mobile-center' : ''}"
        style="left:{mx.current}px; top:{my.current}px;"
></div>

<style>
  :root {
    --color-accent: #FF5F2E;
    --color-background-primary: #1e1e1e;
  }

  .grid-container {
    position: fixed;
    inset: 0;
    z-index: -20;
    display: grid;
    grid-template-columns: repeat(var(--grid-size), 1fr);
    grid-auto-rows: 1fr;
    gap: 8px;
  }

  .grid-cell {
    --glow-factor: 0;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background-color: color-mix(in srgb, black, var(--color-accent) calc(var(--glow-factor) * 100%));
    opacity: calc(0.5 + var(--glow-factor) * 1.2);
    transform: scale(calc(1 + var(--glow-factor) * 1));
    box-shadow: 0 0 calc(20px * var(--glow-factor)) var(--color-accent);
    transition: background-color 180ms ease-out,
    opacity 180ms ease-out,
    transform 180ms ease-out;
  }

  @media (max-width: 768px) {
    .mouse-follower {
      opacity: 0.2;
      width: 10px;
      height: 10px;
    }
  }

  /* -------------------------------------------------
       BACKGROUND OVERLAY
  ------------------------------------------------- */
  .overlay-background {
    position: fixed;
    inset: 0;
    z-index: -40;
    background-color: rgba(62, 62, 62, 1);
  }

  @media (prefers-color-scheme: dark) {
    .overlay-background {
      background-color: rgba(0, 0, 0, 0.6);
    }
  }
</style>
