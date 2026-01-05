<script lang="ts">
    import Background from "./lib/Background.svelte";
    import Header from "./lib/Header.svelte";
    import GrainOverlay from "./lib/GrainOverlay.svelte";
    import Hero from "./lib/Hero.svelte";
    import Scroll from "./lib/Scroll.svelte";
    import Dock from "./lib/Dock.svelte";
    import ProjectGallery from "./lib/ProjectGallery.svelte";
    import AboutMe from "./lib/AboutMe.svelte";
</script>

<div id="smooth-wrapper">
    <div id="smooth-content">
        <main class="page-wrapper">
            <div class="snap-section">
                <Hero />
            </div>
            <div class="snap-section">
                <ProjectGallery />
            </div>
            <div class="snap-section">
                <AboutMe />
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