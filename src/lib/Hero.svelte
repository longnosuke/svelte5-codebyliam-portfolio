<script lang="ts">
    import SocialLinks from './SocialLinks.svelte';
    import CtaButton from "./CtaButton.svelte";
</script>

<section class="hero">
    <div class="hero-content">
        <div class="title-group">
            <h1 class="top-heading">FULLSTACK WEB</h1>
            <h1 class="bottom-heading"><span class="slash"> // </span> DEVELOPER <span class="dot">.</span></h1>
        </div>

        <div class="content-row">
            <SocialLinks />
            <p class="description">
                Hi! I'm Thanh Long. Also known as <span class="alias">Liam</span>.
                I'm a 23 y.o fullstack web developer based in Vietnam.
            </p>

            <CtaButton href="https://youtube.com/c/shortcode" label="Contact me" />
        </div>
    </div>
</section>

<style>
    /* CSS Variables */
    :root {
        --accent: #ff6b00;
        --accent-60: rgba(255, 107, 0, 0.6);
    }

    /* Hero Container */
    .hero {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        padding: 0 2rem;
    }

    .hero-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 2.5rem;
        width: 100%;
        max-width: 1400px;
    }

    /* Title Group */
    .title-group {
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        text-transform: uppercase;
    }

    h1 {
        font-size: clamp(2.1rem, 8vw, 9rem);
        line-height: 1.1;
        margin: 0;
    }

    .top-heading {
        font-weight: bold;
        font-family: 'Apparel', sans-serif;
        background: linear-gradient(0deg, #979797, #E0E0E0);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        color: transparent;
        transition: color 0.5s;
        line-height: 1.1;
        margin: 0;
        position: relative;
        left: -70px;
    }

    .bottom-heading {
        color: #979797;
        position: relative;
        right: -70px;
    }

    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }

    /* Content Row */
    .content-row {
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
        gap: 5rem;
        width: 100%;
    }

    .description {
        font-size: clamp(0.875rem, 2vw, 1.125rem);
        font-weight: 300;
        line-height: 1.75;
        letter-spacing: 0.05em;
        color: var(--paragraph);
        transition: color 0.5s;
    }

    .alias {
        font-weight: 500;
        color: var(--primary);
        cursor: help;
    }

    .slash {
        font-weight: normal;
        margin-right: 10px;
        position: relative;
        top: -10px;
    }

    .dot {
        color: var(--accent);
        animation: pulse 2s infinite;
    }

    @media (max-width: 768px) {
      .hero {
        margin-top: 15vh;
        align-items: flex-start;
      }
        .content-row {
          grid-template-columns: 1fr;
          justify-items: center;
          gap: 0;
        }

          .title-group {
            align-items: center;
          }

        .top-heading, .bottom-heading, .slash{
          position: unset;
        }
    }
</style>