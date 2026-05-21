<script lang="ts">
	import SeoHead from '$lib/components/SeoHead.svelte';
	import TerminalTechTags from '$lib/components/TerminalTechTags.svelte';
	import TerminalWindow from '$lib/components/TerminalWindow.svelte';
	import { site } from '$lib/data/site';
	import { aboutSeo } from '$lib/seo';
	import homeAvatar from '../../assets/home-avatar.jpg';

	const chapters = [
		{
			index: '01',
			label: 'what I build',
			body: 'Client sites, internal tools, and fullstack apps in Svelte, TypeScript, and WordPress. I care about fast loads, clear interaction, and code that the next person can follow.'
		},
		{
			index: '02',
			label: 'how I work',
			body: 'Scoped milestones, honest timelines, and updates you can read without a meeting. I prototype in the open, ship in small slices, and leave production tidy.'
		},
		{
			index: '03',
			label: 'right now',
			body: 'Based in Vietnam, collaborating async across time zones. Open to freelance and full-time roles where craft and ownership matter.'
		}
	] as const;
</script>

<SeoHead {...aboutSeo} />

<div class="page-shell">
	<TerminalWindow
		class="terminal--profile"
		title="~/about"
		command="cat profile.md --human"
		split
		statusDot
	>
		{#snippet aside()}
			<figure class="profile-portrait">
				<div class="profile-portrait__frame">
					<img
						class="profile-portrait__img"
						src={homeAvatar}
						alt="Portrait of {site.name}"
						width="280"
						height="280"
						decoding="async"
					/>
				</div>
				<figcaption class="profile-portrait__caption">
					<span class="profile-portrait__uid">uid=1000({site.alias.toLowerCase()})</span>
					<span>{site.location} · ICT</span>
				</figcaption>
			</figure>
		{/snippet}

		<p class="eyebrow">profile</p>
		<h1 class="terminal__title profile__name">{site.name}</h1>
		<p class="profile__meta terminal__output terminal__output--muted">
			{site.title} · {site.location} · UTC+7
		</p>
		<p class="profile__hook">
			{site.bio} This page is the longer version: who I am, how I ship, and where to find me next.
		</p>

		<ol class="profile-chapters" aria-label="About Liam">
			{#each chapters as chapter}
				<li class="profile-chapter">
					<p class="profile-chapter__label">
						<span class="profile-chapter__index">{chapter.index}</span>
						// {chapter.label}
					</p>
					<p class="profile-chapter__body">{chapter.body}</p>
				</li>
			{/each}
		</ol>

		<p class="profile__stack-label">$ stack</p>
		<TerminalTechTags />

		<nav class="profile__links" aria-label="Profile links">
			<a class="btn btn--primary" href={site.githubUrl} target="_blank" rel="noopener noreferrer">
				github
			</a>
			<a class="btn" href={site.linkedinUrl} target="_blank" rel="noopener noreferrer">linkedin</a>
			<a class="btn" href={site.blogUrl} target="_blank" rel="noopener noreferrer">blog</a>
			<a class="btn" href="mailto:{site.email}">mail</a>
			<a class="btn" href="/portfolio">cd ./work</a>
			<a class="btn" href="/contact">ssh inbox</a>
		</nav>
	</TerminalWindow>
</div>

<style>
	:global(.terminal--profile.terminal--split .terminal__aside) {
		align-items: flex-start;
		justify-content: flex-start;
	}

	@media (max-width: 899px) {
		:global(.terminal--profile.terminal--split .terminal__aside) {
			order: -1;
			min-height: auto;
			max-height: none;
			padding-bottom: 0.25rem;
		}
	}

	@media (min-width: 900px) {
		:global(.terminal--profile.terminal--split .terminal__aside) {
			position: sticky;
			top: 0;
		}
	}

	.profile__name {
		margin-bottom: 0.35rem;
	}

	.profile__meta {
		margin: 0 0 1rem;
		font-family: var(--font-mono);
		font-size: var(--text-sm);
	}

	.profile__hook {
		margin: 0 0 clamp(1.5rem, 4vw, 2rem);
		max-width: 52ch;
		line-height: 1.7;
		color: var(--color-text-muted);
	}

	.profile-chapters {
		list-style: none;
		margin: 0 0 clamp(1.5rem, 4vw, 2rem);
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: clamp(1.35rem, 3vw, 1.85rem);
	}

	.profile-chapter {
		margin: 0;
		padding-top: 0.15rem;
	}

	.profile-chapter__label {
		margin: 0 0 0.5rem;
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}

	.profile-chapter__index {
		color: var(--color-accent);
		margin-right: 0.35rem;
	}

	.profile-chapter__body {
		margin: 0;
		padding: 0;
		border: none;
		border-radius: 0;
		background: transparent;
		color: var(--color-text-muted);
		line-height: 1.72;
		font-size: var(--text-sm);
		max-width: 58ch;
	}

	.profile__stack-label {
		margin: 0 0 0.5rem;
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-accent);
	}

	.profile__links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 1.5rem;
		padding-bottom: 0.25rem;
	}

	.profile-portrait {
		margin: 0;
		width: 100%;
		max-width: 15rem;
	}

	@media (max-width: 899px) {
		.profile-portrait {
			display: grid;
			grid-template-columns: min(7.5rem, 34vw) 1fr;
			align-items: center;
			gap: 1rem 1.15rem;
			max-width: none;
		}

		.profile-portrait__caption {
			margin-top: 0;
		}
	}

	.profile-portrait__frame {
		position: relative;
		border-radius: var(--radius-terminal);
		border: 1px solid var(--color-border);
		overflow: hidden;
		background: rgba(0, 0, 0, 0.35);
	}

	.profile-portrait__frame::after {
		content: '';
		position: absolute;
		inset: 0;
		background: repeating-linear-gradient(
			0deg,
			transparent,
			transparent 3px,
			rgba(0, 0, 0, 0.12) 3px,
			rgba(0, 0, 0, 0.12) 4px
		);
		pointer-events: none;
		opacity: 0.35;
	}

	.profile-portrait__img {
		display: block;
		width: 100%;
		aspect-ratio: 1;
		object-fit: cover;
	}

	.profile-portrait__caption {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		margin-top: 0.75rem;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--color-text-muted);
		line-height: 1.45;
	}

	.profile-portrait__uid {
		color: var(--color-accent);
	}

	.btn:focus-visible {
		outline: 2px solid var(--color-accent);
		outline-offset: 3px;
	}
</style>
