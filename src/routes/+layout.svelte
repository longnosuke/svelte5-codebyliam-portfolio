<script lang="ts">
	import '../app.css';
	import favicon from '../assets/favicon.png';
	import SiteNav from '$lib/components/SiteNav.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>CodebyLiam — Fullstack Developer</title>
</svelte:head>

<SiteNav />
<main>{@render children()}</main>
<SiteFooter />

<style>
	main {
		min-height: 100vh;
	}
</style>
