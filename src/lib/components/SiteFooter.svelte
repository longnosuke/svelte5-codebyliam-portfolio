<script lang="ts">
	const year = new Date().getFullYear();
</script>

<footer class="footer">
	<div class="footer__inner page-shell">
		<p class="footer__copy">© {year} Liam. All rights reserved.</p>
		<nav class="footer__links" aria-label="Footer">
			<a href="/about">About</a>
			<a href="/portfolio">Work</a>
			<a href="/contact">Contact</a>
		</nav>
	</div>
</footer>

<style>
	.footer {
		border-top: 1px solid var(--color-border);
		padding-block: 2rem;
	}

	.footer__inner {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding-block: 0;
	}

	.footer__copy {
		margin: 0;
		font-size: 0.85rem;
		color: var(--color-text-muted);
	}

	.footer__links {
		display: flex;
		gap: 1.5rem;
	}

	.footer__links a {
		font-size: 0.85rem;
		color: var(--color-text-muted);
	}

	.footer__links a:hover {
		color: var(--color-accent);
	}
</style>
