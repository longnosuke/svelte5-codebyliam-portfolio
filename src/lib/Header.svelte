<script lang="ts">
    import gsap from 'gsap';
    import { cubicInOut, cubicOut } from 'svelte/easing';
    import { fade, fly } from 'svelte/transition';

    const SLIDE_DURATION = 1000;
    const SLIDE_DELAY = 200;

    let isOpen = $state(false);

    function toggle() {
        isOpen = !isOpen;
    }

    const navItems = [
        {
            title: 'home',
            href: '/'
        },
        {
            title: 'projects',
            href: '#projects'
        },
        {
            title: 'blog',
            href: 'https://blog.codebyliam.com'
        }
    ] as const;

    let container: HTMLDivElement;

    $effect(() => {
        if (!isOpen) return;
        let ctx = gsap.context(() => {
            const links = container.querySelectorAll('a');
            gsap.utils.toArray(links).forEach((link: unknown) => {
                if (link instanceof HTMLAnchorElement) {
                    const spans = link.querySelectorAll('span');
                    gsap.utils.toArray(spans).forEach((span) => {
                        let animation = gsap.to(span as HTMLSpanElement, {
                            paused: true,
                            y: gsap.utils.random(-30, 30),
                            x: gsap.utils.random(-10, 10),
                            opacity: gsap.utils.random(0.5, 1),
                            duration: 0.3
                        });

                        link.addEventListener('mouseenter', () => animation.play());
                        link.addEventListener('mouseleave', () => animation.reverse());
                    });
                }
            });
        }, container);

        return () => ctx.kill();
    });
</script>

<header
        class="main-header"
>
    <div class="header-container">
        <a href="/" class="header-logo"> Liam. </a>

        <div class="header-controls">
            <button
                    aria-label="switch menu"
                    class="menu-toggle group"
                    onclick={toggle}
            >
                <div class="toggle-icon">
                    <div
                            class="toggle-line"
                            class:is-open={isOpen}
                    ></div>
                    <div
                            class="toggle-line short-line"
                            class:is-open={isOpen}
                    ></div>
                    <div
                            class="toggle-line shorter-line"
                            class:is-open={isOpen}
                    ></div>
                </div>
            </button>
        </div>
    </div>
</header>

{#each [0, 1, 2, 3] as i (i)}
    {#if isOpen}
        <div
            transition:fly={{
                y: `-100vh`,
                duration: SLIDE_DURATION,
                delay: i * SLIDE_DELAY,
                opacity: 1,
                easing: cubicInOut
            }}
            class="menu-slide-panel"
            style="left: {i * 25}%"
        ></div>
    {/if}
{/each}

<div bind:this={container}>
    {#if isOpen}
        <div
            out:fade
            in:fade={{ delay: 5 * SLIDE_DELAY }}
            class="fullscreen-menu-overlay"
        >
            <nav>
                <ul class="fullscreen-nav-list">
                    {#each navItems as { title, href }, i (i)}
                        <li
                                in:fly|global={{
                                x: -50,
                                duration: 1000,
                                easing: cubicOut,
                                delay: i * 200 + 5 * SLIDE_DELAY
                            }}
                        >
                            <a
                                    onclick={toggle}
                                    class="fullscreen-nav-link"
                                    {href}
                            >
                                {#each title.split('') as char, i (i)}
                                    <span class="inline-char">
                                        {char}
                                    </span>
                                {/each}
                            </a>
                        </li>
                    {/each}
                </ul>
            </nav>
        </div>
    {/if}
</div>

<style>
  :root {
    --color-accent: #f97316;
    --color-primary: #fdb077;
    --color-comment: #6b7280;
    --color-paragraph: #a1a1aa;
    --color-background-secondary: #27272a; /* Example color for the slides */
  }


  /* --- Main Header --- */
  .main-header {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 50;
    width: 100%;
  }

  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--color-accent);
    max-width: 1280px;
    width: 90%;
    margin: 2rem auto;
  }

  .header-logo {
    pointer-events: auto;
    font-size: 1.25rem;
    font-weight: 500;
    text-transform: capitalize;
    color: white;
    text-decoration: none;
  }

  /* --- Header Controls (Theme and Menu Button) --- */
  .header-controls {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .menu-toggle {
    pointer-events: auto;
    background: none;
    border: none;
    padding: 0.5rem 0;
    cursor: pointer;
    transform-origin: center;
  }

  .toggle-icon {
    position: relative;
    display: flex;
    width: 2rem;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;
  }

  .toggle-line {
    height: 1px;
    width: 100%;
    border-radius: 0.125rem;
    background-color: white;
    transition: all 200ms;
  }

  .short-line {
    width: 70%;
    align-self: flex-end;
  }
  .short-line.is-open {
    width: 100% !important;
  }

  .shorter-line {
    width: 50%;
    align-self: flex-end;
  }
  /* class:!w-full={isOpen} on shorter-line */
  .shorter-line.is-open {
    width: 100% !important;
  }

  /* --- Sliding Menu Panels --- */
  .menu-slide-panel {
    position: fixed;
    top: 0;
    z-index: 40;
    height: 100%;
    width: 25%;
    background-color: black;
  }

  /* --- Fullscreen Menu Links Overlay --- */
  .fullscreen-menu-overlay {
    /* container fixed inset-0 z-40 flex flex-col justify-center */
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 40;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }

  .fullscreen-nav-list {
    /* flex flex-col gap-10 */
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .fullscreen-nav-link {
    /* text-4xl capitalize text-paragraph transition-colors duration-200 hover:text-primary */
    font-size: 2.25rem; /* text-4xl */
    text-transform: capitalize;
    color: var(--color-paragraph);
    transition: color 200ms;
    text-decoration: none;
    cursor: pointer;
  }

  .fullscreen-nav-link:hover {
    color: var(--color-primary);
  }

  /* Responsive font sizes for menu links */
  @media (min-width: 640px) {
    .fullscreen-nav-link {
      font-size: 4rem; /* sm:text-6xl */
    }
  }
  @media (min-width: 768px) {
    .fullscreen-nav-link {
      font-size: 4.5rem; /* md:text-7xl */
    }
  }
  @media (min-width: 1024px) {
    .fullscreen-nav-link {
      font-size: 8rem; /* lg:text-9xl */
    }
  }

  .inline-char {
    /* inline-block transition-all duration-200 ease-out */
    display: inline-block;
    transition: all 200ms ease-out;
  }
</style>