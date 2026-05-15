<script lang="ts">
	import { site } from '$lib/data/site';
	import ClickMe from '$lib/ClickMe.svelte';
	import TerminalWindow from '$lib/components/TerminalWindow.svelte';
	import homeAvatar from '../../assets/home-avatar.jpg';
</script>

<svelte:head>
	<title>About — CodebyLiam</title>
</svelte:head>

<div class="page-shell">
	<TerminalWindow title="~/about" command="cat profile.md">
		<div class="profile">
			<img class="profile__avatar" src={homeAvatar} alt="Portrait of {site.name}" width="120" height="120" />
			<div class="profile__copy">
				<h1 class="terminal__title">{site.name}</h1>
				<p class="terminal__output terminal__output--muted">
					{site.title} · {site.location}
				</p>
				<p class="terminal__output">
					Fullstack developer — Svelte, TypeScript, WordPress. I care about performance and
					interaction.
				</p>
				<div class="profile__links">
					<a class="btn btn--primary" href={site.githubUrl} target="_blank" rel="noopener noreferrer"
						>github</a
					>
					<a class="btn" href={site.linkedinUrl} target="_blank" rel="noopener noreferrer">linkedin</a>
					<a class="btn" href={site.blogUrl} target="_blank" rel="noopener noreferrer">blog</a>
					<a class="btn" href="/portfolio">View work</a>
				</div>
			</div>
		</div>
	</TerminalWindow>

	<!-- <div class="easter">
		<TerminalWindow title="~/about" command="./run easter-egg.sh">
			<p class="terminal__output terminal__output--muted">Hold to increment · synced live</p>
			<ClickMe />
		</TerminalWindow>
	</div> -->
</div>

<style>
	.profile {
		display: grid;
		gap: 1.25rem;
		align-items: start;
	}

	@media (min-width: 36rem) {
		.profile {
			grid-template-columns: minmax(0, 7.5rem) minmax(0, 1fr);
			gap: 1.5rem 1.75rem;
		}
	}

	.profile__avatar {
		display: block;
		width: min(7.5rem, 38vw);
		max-width: 100%;
		aspect-ratio: 1;
		height: auto;
		border-radius: var(--radius-terminal);
		border: 1px solid var(--color-border);
		object-fit: cover;
	}

	@media (min-width: 36rem) {
		.profile__avatar {
			width: 100%;
		}
	}

	.profile__copy {
		min-width: 0;
	}

	.profile__links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 1.25rem;
	}

	.easter {
		margin-top: 1.5rem;
	}
</style>
