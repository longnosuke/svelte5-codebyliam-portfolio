<svelte:head>
	<title>About — CodebyLiam</title>
</svelte:head>

<script lang="ts">
	import { site } from '$lib/data/site';
	import ClickMe from '$lib/ClickMe.svelte';
	import homeAvatar from '../../assets/home-avatar.JPG';
</script>

<div class="page-shell">
	<p class="eyebrow">About</p>
	<h1 class="title">{site.name}</h1>
	<p class="lead">{site.title} · {site.location}</p>

	<div class="about">
		<img class="avatar" src={homeAvatar} alt="Portrait of {site.name}" width="160" height="160" />
		<div class="copy">
			<p>
				I'm {site.name} ({site.alias}) — I build fullstack web apps and WordPress products with a focus on
				performance and interaction.
			</p>
			<p>Open to new projects. Explore <a href="/portfolio">work</a> or <a href="/contact">get in touch</a>.</p>
			<div class="links">
				<a class="btn btn--primary" href={site.githubUrl} target="_blank" rel="noopener noreferrer"
					>GitHub</a
				>
				<a class="btn" href={site.linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn</a>
				<a class="btn" href={site.blogUrl} target="_blank" rel="noopener noreferrer">Blog</a>
			</div>
		</div>
	</div>

	<section class="interactive" aria-labelledby="interactive-heading">
		<h2 id="interactive-heading">Interactive</h2>
		<p class="interactive__hint">Hold the button — clicks sync to a live counter.</p>
		<ClickMe />
	</section>
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
		margin: 0 0 0.5rem;
		font-family: var(--font-display);
		font-size: clamp(2rem, 5vw, 3rem);
	}

	.lead {
		margin: 0 0 2rem;
		color: var(--color-text-muted);
	}

	.about {
		display: grid;
		gap: 2rem;
		align-items: start;
	}

	@media (min-width: 640px) {
		.about {
			grid-template-columns: auto 1fr;
		}
	}

	.avatar {
		border-radius: var(--radius-md);
		object-fit: cover;
	}

	.copy p {
		color: var(--color-text-muted);
		line-height: 1.75;
		max-width: 55ch;
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 1.5rem;
	}

	.interactive {
		margin-top: 4rem;
		padding-top: 2rem;
		border-top: 1px solid var(--color-border);
	}

	.interactive h2 {
		margin: 0 0 0.5rem;
		font-family: var(--font-display);
		font-size: 1.5rem;
	}

	.interactive__hint {
		margin: 0 0 1.5rem;
		color: var(--color-text-muted);
		font-size: 0.9rem;
	}
</style>
