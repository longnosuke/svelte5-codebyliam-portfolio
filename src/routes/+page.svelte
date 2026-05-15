<script lang="ts">
	import ScrollHomeLoader from '$lib/scene/ScrollHomeLoader.svelte';
	import { spaceBackdropAssets } from '$lib/data/spaceBackdrop';
</script>

<svelte:head>
	<title>CodebyLiam — Interactive portfolio</title>
	<link rel="preload" as="image" href={spaceBackdropAssets.background} />
</svelte:head>

<ScrollHomeLoader />
