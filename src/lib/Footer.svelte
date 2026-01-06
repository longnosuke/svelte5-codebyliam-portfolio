<script lang="ts">
    const year = new Date().getFullYear();
</script>

<footer class="footer">
    <div class="footer__content">
        <p class="footer__copy">
            © {year} Liam. All rights reserved.
        </p>

        <nav class="footer__links">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
        </nav>
    </div>
</footer>

<style>
  .footer {
    padding: 2rem 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    background: transparent;
  }

  .footer__content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .footer__copy {
    font-size: 0.85rem;
    opacity: 0.7;
  }

  .footer__links {
    display: flex;
    gap: 1.5rem;
  }

  .footer__links a {
    font-size: 0.85rem;
    opacity: 0.7;
    text-decoration: none;
    transition: opacity 0.2s ease;
  }

  .footer__links a:hover {
    opacity: 1;
  }
</style>
