<script lang="ts">
    import Background from "./lib/Background.svelte";
    import Header from "./lib/Header.svelte";
    import Loader from "./lib/Loader.svelte";
    import GrainOverlay from "./lib/GrainOverlay.svelte";
    import Hero from "./lib/Hero.svelte";
    import Scroll from "./lib/Scroll.svelte";
    import Dock from "./lib/Dock.svelte";
    import Projects from "./lib/Projects.svelte";

    import gsap from "gsap";
    import { ScrollTrigger } from "gsap/ScrollTrigger";
    import { ScrollSmoother } from "gsap/ScrollSmoother";

    import { onMount } from "svelte";

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    onMount(() => {
        ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 1,
            effects: true,
            smoothTouch: 0.1
        });
    });
</script>

<!-- FIXED ELEMENTS (MUST STAY OUTSIDE smoother) -->
<Loader />
<GrainOverlay />
<Background />
<Header />
<Scroll />
<Dock />

<!-- SMOOTHER WRAPPER -->
<div id="smooth-wrapper">
    <div id="smooth-content">
        <main class="page-wrapper">
            <Hero />
            <Projects />
        </main>
    </div>
</div>
