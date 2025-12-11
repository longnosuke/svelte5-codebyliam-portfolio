<script lang="ts">
    import { onMount } from "svelte";
    import { House } from 'lucide-svelte';
    import { Code } from 'lucide-svelte';
    import { Mail } from 'lucide-svelte';
    import { Rss } from 'lucide-svelte';

    let hasLoaded = false;

    onMount(() => {
        const dock = document.querySelector<HTMLDivElement>(".dock");
        const items = Array.from(document.querySelectorAll<HTMLDivElement>(".item"));

        if (!dock || !items.length) return;

        // Trigger appear animation
        setTimeout(() => {
            hasLoaded = true;
        }, 100);

        dock.addEventListener("mousemove", (e) => {
            const dockRect = dock.getBoundingClientRect();
            const mouseX = e.clientX - dockRect.left;

            items.forEach((item) => {
                const rect = item.getBoundingClientRect();
                const centerX = rect.left - dockRect.left + rect.width / 2;

                const distance = Math.abs(mouseX - centerX);
                const maxDist = 80;
                const t = Math.max(0, 1 - distance / maxDist);

                let scale = 1 + t * 0.6;
                scale = Math.floor(scale * 10) / 10;
                item.style.setProperty("--scale", scale.toString());
            });
        });

        dock.addEventListener("mouseleave", () => {
            items.forEach((item) => item.style.setProperty("--scale", "1"));
        });

        // click bounce
        items.forEach((item) => {
            item.addEventListener("click", () => {
                item.classList.remove("loading");
                void item.offsetWidth;
                item.classList.add("loading");
            });
        });
    });
</script>

<footer>
    <div class="dock" class:loaded={hasLoaded}>
        <div class="items">
            <div class="item" data-tooltip="Home">
                <House />
            </div>
            <div class="item" data-tooltip="Projects">
                <Code/>
            </div>
            <div class="item" data-tooltip="Blog">
                <Rss/>
            </div>
            <div class="item" data-tooltip="Contact">
                <Mail/>
            </div>
        </div>
    </div>
</footer>

<style>
  footer {
    position: fixed;
    bottom: 30px;
    left: 50%;
    z-index: 50;
    transform: translate(-50%, 0);
  }

  .dock {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 9999px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: auto;
    padding: 1rem;
    backdrop-filter: blur(10px);

    /* Initial state - collapsed from center */
    transform: scaleX(0) scaleY(0.4);
    opacity: 0;
    transform-origin: center bottom;
    transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .dock.loaded {
    /* Expanded state with liquid bounce */
    transform: scaleX(1) scaleY(1);
    opacity: 1;
    animation: liquidExpand 0.6s cubic-bezier(0.42, 0, 0.58, 1) forwards;
  }

  @keyframes liquidExpand {
    0% {
      transform: scaleX(0) scaleY(0.4);
      opacity: 0;
    }
    40% {
      transform: scaleX(1.05) scaleY(0.85);
      opacity: 0.8;
    }
    60% {
      transform: scaleX(0.95) scaleY(1.08);
      opacity: 1;
    }
    80% {
      transform: scaleX(1.02) scaleY(0.98);
    }
    100% {
      transform: scaleX(1) scaleY(1);
      opacity: 1;
    }
  }

  .items {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 1.5rem;
  }

  .item {
    --scale: 1;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;

    transform: translateY(calc((1 - var(--scale)) * 10px)) scale(var(--scale));
    transform-origin: center bottom;
    transition: all 0.3s ease;
  }

  .item::before {
    content: attr(data-tooltip);
    display: block;
    position: absolute;
    bottom: calc(100%);
    font-size: 10px;
    border-radius: 4px;
    color: #e0e0e0;
    border: 1px solid rgba(255, 255, 255, 0.04);
    background: #282828;
    padding: 3px 8px;
    opacity: 0;
    pointer-events: none;
    transition: 0.1s ease-out opacity;
    white-space: nowrap;
  }

  .item:hover::before {
    opacity: 1;
  }
</style>