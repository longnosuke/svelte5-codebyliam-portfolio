<script lang="ts">
	import SeoHead from '$lib/components/SeoHead.svelte';
	import ScrollHomeLoader from '$lib/scene/ScrollHomeLoader.svelte';
	import { spaceBackdropAssets } from '$lib/data/spaceBackdrop';
	import { homeSeo } from '$lib/seo';
</script>

<SeoHead {...homeSeo} />

<svelte:head>
	<link rel="preload" as="image" href={spaceBackdropAssets.background} />
</svelte:head>

<ScrollHomeLoader />
