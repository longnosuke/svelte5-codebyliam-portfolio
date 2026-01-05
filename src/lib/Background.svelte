<script lang="ts">
    import {onMount} from "svelte";
    let canvasElement: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D | null = null;

    const GLOW_RADIUS = 200;
    const GAP = 8;
    const CELL_SIZE = 3;
    const COLOR_ACCENT = '#FF5F2E';

    let gridSize = $state(40);
    let mouseX = $state(0);
    let mouseY = $state(0);
    let targetX = $state(0);
    let targetY = $state(0);
    let cellPositions: Array<{x: number, y: number}> = $state([]);

    // Detect mobile
    const isMobile = $state(
        typeof window !== "undefined" &&
        (window.innerWidth < 768 || "ontouchstart" in window)
    );

    // Set initial grid size
    if (typeof window !== "undefined") {
        if (window.innerWidth < 480) gridSize = 15;
        else if (window.innerWidth < 768) gridSize = 20;
    }

    // Initialize mouse position
    if (isMobile && typeof window !== "undefined") {
        targetX = mouseX = window.innerWidth / 2;
        targetY = mouseY = window.innerHeight / 2;
    }

    // Calculate cell positions
    function calculateCellPositions() {
        if (!canvasElement) return;

        const width = canvasElement.width / (window.devicePixelRatio || 1);
        const height = canvasElement.height / (window.devicePixelRatio || 1);

        const cellWidth = (width - GAP * (gridSize - 1)) / gridSize;
        const cellHeight = (height - GAP * (gridSize - 1)) / gridSize;

        const positions: Array<{x: number, y: number}> = [];

        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const x = col * (cellWidth + GAP) + cellWidth / 2;
                const y = row * (cellHeight + GAP) + cellHeight / 2;
                positions.push({ x, y });
            }
        }

        cellPositions = positions;
    }

    // Setup canvas
    function setupCanvas() {
        if (!canvasElement) return;

        const dpr = window.devicePixelRatio || 1;
        const rect = canvasElement.getBoundingClientRect();

        canvasElement.width = rect.width * dpr;
        canvasElement.height = rect.height * dpr;

        ctx = canvasElement.getContext('2d');
        if (ctx) {
            ctx.scale(dpr, dpr);
        }

        calculateCellPositions();
    }

    // Smooth mouse movement
    function updateMousePosition() {
        const lerp = 0.15;
        mouseX += (targetX - mouseX) * lerp;
        mouseY += (targetY - mouseY) * lerp;
    }

    // Draw cells
    function drawCells() {
        if (!ctx || !canvasElement) return;

        const width = canvasElement.width / (window.devicePixelRatio || 1);
        const height = canvasElement.height / (window.devicePixelRatio || 1);

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Draw overlay background
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.fillRect(0, 0, width, height);

        // Draw gradient overlay
        if (!isMobile) {
            const gradient = ctx.createRadialGradient(
                width / 2, 0, 0,
                width / 2, 0,
                height * 0.6
            );
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
            gradient.addColorStop(0.05, 'rgba(255, 255, 255, 0.2)');
            gradient.addColorStop(0.1, 'rgba(255, 255, 255, 0.15)');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
        } else {
            const gradient = ctx.createRadialGradient(
                width / 2, 0,
                0,
                width / 2, 0,
                height * 0.8
            );
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
            gradient.addColorStop(0.05, 'rgba(255, 255, 255, 0.3)');
            gradient.addColorStop(0.1, 'rgba(255, 255, 255, 0)');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
        }

        // Draw cells
        cellPositions.forEach(pos => {
            const dx = mouseX - pos.x;
            const dy = mouseY - pos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            let glow = 0;
            if (distance < GLOW_RADIUS) {
                glow = 1 - distance / GLOW_RADIUS;
            }

            const opacity = 0.5 + glow * 1.2;
            const scale = 1 + glow * 1;
            const size = CELL_SIZE * scale;

            // Draw glow
            if (glow > 0.1) {
                const glowGradient = ctx.createRadialGradient(
                    pos.x, pos.y, 0,
                    pos.x, pos.y, 20 * glow
                );
                glowGradient.addColorStop(0, `${COLOR_ACCENT}${Math.floor(glow * 100).toString(16).padStart(2, '0')}`);
                glowGradient.addColorStop(1, 'rgba(255, 95, 46, 0)');

                ctx.fillStyle = glowGradient;
                ctx.fillRect(pos.x - 20 * glow, pos.y - 20 * glow, 40 * glow, 40 * glow);
            }

            // Draw cell
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, size / 2, 0, Math.PI * 2);

            // Mix black with accent color based on glow
            const r = Math.floor(255 * glow);
            const g = Math.floor(95 * glow);
            const b = Math.floor(46 * glow);

            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
            ctx.fill();
        });
    }

    // Animation loop
    function animate() {
        updateMousePosition();
        drawCells();
        requestAnimationFrame(animate);
    }

    // Handle mouse/touch movement
    function handleMove(e: MouseEvent | TouchEvent) {
        if (isMobile) return;

        const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const y = 'touches' in e ? e.touches[0].clientY : e.clientY;

        targetX = x;
        targetY = y;
    }

    onMount(() => {
        setupCanvas();
        animate();
        const handleResize = () => setupCanvas();
        window.addEventListener('resize', handleResize);

        if (!isMobile) {
            window.addEventListener('mousemove', handleMove);
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            if (!isMobile) {
                window.removeEventListener('mousemove', handleMove);
            }
        };
    })

</script>

<canvas
        bind:this={canvasElement}
        class="canvas-background"
></canvas>

<!-- Mouse follower dot -->
{#if !isMobile}
    <div
            class="mouse-follower"
            style="left:{mouseX}px; top:{mouseY}px;"
    ></div>
{:else}
    <div
            class="mouse-follower mobile-center"
            style="left:{mouseX}px; top:{mouseY}px;"
    ></div>
{/if}

<style>
  .canvas-background {
    position: fixed;
    inset: 0;
    z-index: -20;
    width: 100%;
    height: 100%;
  }

  .mouse-follower {
    position: fixed;
  }

  @media (max-width: 768px) {
    .mouse-follower.mobile-center {
      opacity: 0;
      width: 10px;
      height: 10px;
    }
  }
</style>