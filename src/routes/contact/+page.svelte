<script lang="ts">
	import { site } from '$lib/data/site';
	import TerminalWindow from '$lib/components/TerminalWindow.svelte';
</script>

<svelte:head>
	<title>Contact — CodebyLiam</title>
</svelte:head>

<div class="page-shell">
	<TerminalWindow title="~/contact" command='mail -s "hello"'>
		<p class="terminal__output terminal__output--muted">Open to freelance and full-time.</p>
		<p class="contact__email">
			<a href="mailto:{site.email}">{site.email}</a>
		</p>
		<div class="contact__actions">
			<a class="btn btn--primary" href="mailto:{site.email}">send mail</a>
			<a class="btn" href={site.linkedinUrl} target="_blank" rel="noopener noreferrer">linkedin</a>
			<a class="btn" href="/portfolio">cd ./work</a>
		</div>
	</TerminalWindow>
</div>

<style>
	.contact__email {
		margin: 1rem 0;
		font-family: var(--font-mono);
		font-size: 1rem;
	}

	.contact__email a {
		color: var(--color-accent);
		word-break: break-all;
	}

	.contact__actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
</style>
