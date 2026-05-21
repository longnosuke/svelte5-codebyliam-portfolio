<script lang="ts">
	import {
		absoluteImageUrl,
		canonicalUrl,
		seoDefaults,
		type SeoConfig
	} from '$lib/seo';
	import { defaultDescription } from '$lib/data/site';

	let {
		title,
		description = defaultDescription,
		path = '/',
		image,
		imageAlt,
		type = 'website',
		robots,
		noindex = false,
		jsonLd
	}: SeoConfig = $props();

	const canonical = $derived(canonicalUrl(path));
	const imageUrl = $derived(absoluteImageUrl(image));
	const robotsContent = $derived(
		noindex ? 'noindex, nofollow' : (robots ?? seoDefaults.defaultRobots)
	);
	const jsonLdBlocks = $derived(
		jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []
	);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	<meta name="robots" content={robotsContent} />
	<meta name="author" content={seoDefaults.author} />
	<meta name="theme-color" content={seoDefaults.themeColor} />

	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:type" content={type} />
	<meta property="og:image" content={imageUrl} />
	{#if imageAlt}
		<meta property="og:image:alt" content={imageAlt} />
	{/if}
	<meta property="og:site_name" content={seoDefaults.siteName} />
	<meta property="og:locale" content={seoDefaults.locale} />

	<meta name="twitter:card" content={seoDefaults.twitterCard} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageUrl} />
	{#if imageAlt}
		<meta name="twitter:image:alt" content={imageAlt} />
	{/if}

	{#each jsonLdBlocks as block, i (i)}
		<script type="application/ld+json">
			{JSON.stringify(block)}
		</script>
	{/each}
</svelte:head>
