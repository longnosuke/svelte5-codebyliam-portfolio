<script lang="ts">
	import { site } from '$lib/data/site';
	import SocialLinks from '$lib/SocialLinks.svelte';
</script>

<svelte:head>
	<title>Contact — CodebyLiam</title>
</svelte:head>

<div class="page-shell">
	<p class="eyebrow">Contact</p>
	<h1 class="title">Say hello</h1>
	<p class="lead">Open to freelance and full-time opportunities.</p>

	<p class="email">
		<a href="mailto:{site.email}">{site.email}</a>
	</p>

	<div class="links">
		<a class="btn btn--primary" href="mailto:{site.email}">Email me</a>
		<a class="btn" href={site.linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn</a>
		<a class="btn" href="/portfolio">View work</a>
	</div>

	<SocialLinks />
</div>

<style>
	.eyebrow {
		margin: 0 0 0.5rem;
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		color: var(--color-accent);
	}

	.title {
		margin: 0 0 1rem;
		font-family: var(--font-display);
		font-size: clamp(2rem, 5vw, 3rem);
	}

	.lead {
		margin: 0 0 1.5rem;
		color: var(--color-text-muted);
		max-width: 40ch;
	}

	.email {
		font-size: 1.25rem;
		margin: 0 0 2rem;
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-bottom: 2rem;
	}

	:global(.social-links) {
		margin-top: 0.5rem;
	}
</style>
