<script lang="ts">
	import { page } from '$app/stores';
	import { navLinks } from '$lib/data/site';

	let menuOpen = $state(false);

	function closeMenu() {
		menuOpen = false;
	}
</script>

<header class="nav">
	<a href="/" class="nav__brand" onclick={closeMenu}>codebyliam</a>

	<button
		type="button"
		class="nav__toggle"
		aria-expanded={menuOpen}
		aria-controls="site-nav-links"
		aria-label={menuOpen ? 'Close menu' : 'Open menu'}
		onclick={() => (menuOpen = !menuOpen)}
	>
		<span class="nav__toggle-bar"></span>
		<span class="nav__toggle-bar"></span>
	</button>

	<nav id="site-nav-links" class="nav__links" class:nav__links--open={menuOpen}>
		{#each navLinks as link}
			{#if 'external' in link && link.external}
				<a
					href={link.href}
					target="_blank"
					rel="noopener noreferrer"
					onclick={closeMenu}
				>
					{link.label}
				</a>
			{:else}
				<a
					href={link.href}
					class:active={$page.url.pathname === link.href}
					onclick={closeMenu}
				>
					{link.label}
				</a>
			{/if}
		{/each}
	</nav>
</header>

<style>
	.nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: var(--z-nav);
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem var(--space-page);
		background: linear-gradient(to bottom, rgba(10, 10, 10, 0.9), transparent);
		backdrop-filter: blur(8px);
	}

	.nav__brand {
		font-family: var(--font-display);
		font-size: 1.1rem;
		letter-spacing: 0.04em;
		text-transform: lowercase;
	}

	.nav__brand:hover {
		color: var(--color-accent);
	}

	.nav__toggle {
		display: none;
		flex-direction: column;
		gap: 6px;
		padding: 0.5rem;
		background: transparent;
		border: none;
	}

	.nav__toggle-bar {
		display: block;
		width: 22px;
		height: 2px;
		background: var(--color-text);
	}

	.nav__links {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}

	.nav__links a {
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		opacity: 0.75;
		transition: opacity var(--motion-fast);
	}

	.nav__links a:hover,
	.nav__links a.active {
		opacity: 1;
		color: var(--color-accent);
	}

	@media (max-width: 768px) {
		.nav__toggle {
			display: flex;
		}

		.nav__links {
			position: fixed;
			inset: 0;
			flex-direction: column;
			justify-content: center;
			gap: 2rem;
			background: rgba(10, 10, 10, 0.97);
			opacity: 0;
			pointer-events: none;
			transition: opacity var(--motion-fast);
		}

		.nav__links--open {
			opacity: 1;
			pointer-events: auto;
		}

		.nav__links a {
			font-size: 1.25rem;
		}
	}
</style>
