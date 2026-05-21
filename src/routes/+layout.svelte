<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import favicon from '../assets/favicon.png';
	import GalaxyBackdrop from '$lib/components/GalaxyBackdrop.svelte';
	import SiteCursor from '$lib/components/SiteCursor.svelte';
	import ScrollHint from '$lib/components/ScrollHint.svelte';
	import SiteDock from '$lib/components/SiteDock.svelte';
	import { installInteractionGuards } from '$lib/interactionGuards';

	let { children } = $props();

	onMount(installInteractionGuards);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<GalaxyBackdrop />
<SiteCursor />
<SiteDock />
<ScrollHint />
<main class="main--terminal main--with-dock">{@render children()}</main>
