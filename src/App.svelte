<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import Lenis from "@studio-freight/lenis";
    import favicon from "./assets/favicon.png";
    import Background from "./lib/Background.svelte";
    import Header from "./lib/Header.svelte";
    import GrainOverlay from "./lib/GrainOverlay.svelte";
    import Hero from "./lib/Hero.svelte";
    import Scroll from "./lib/Scroll.svelte";
    import Dock from "./lib/Dock.svelte";
    import ProjectGallery from "./lib/ProjectGallery.svelte";
    import AboutMe from "./lib/AboutMe.svelte";
    import Footer from "./lib/Footer.svelte";

    let lenis: Lenis;
    let rafId: number;

    onMount(() => {
        lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) =>
                Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 1.5
        });

        const raf = (time: number) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };

        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    });
</script>

<svetle:head>
    <link rel="icon" href={favicon} />
</svetle:head>

<div id="smooth-wrapper">
    <div id="smooth-content">
        <main class="page-wrapper" id="home">
            <div class="snap-section">
                <Hero />
            </div>
            <div class="snap-section">
                <ProjectGallery />
            </div>
            <div class="snap-section">
                <AboutMe />
            </div>
            <div class="">
                <Footer />
            </div>
        </main>
    </div>
</div>

<GrainOverlay />
<Background />
<Header />
<Scroll />
<Dock />

<style>
    .snap-section {
      min-height: 100vh;
    }
</style>