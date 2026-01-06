<script lang="ts">
    let { index, title, type, url, setModal, comingSoon } = $props();
    
    function handleClick(e) {
        if (comingSoon) {
            e.preventDefault();
            // Optional: Add a toast notification here
            console.log('Coming soon!');
        }
    }

    function handleHover(isHovering) {
        if (comingSoon) return;
        setModal({ active: isHovering, index });
    }
</script>

<a 
    href={comingSoon ? '#' : url}
    on:click={handleClick}
    on:mouseenter={() => handleHover(true)}
    on:mouseleave={() => handleHover(false)}
    class="project"
    class:coming-soon={comingSoon}
    aria-label={comingSoon ? `${title} - Coming Soon` : title}
>
    <div class="project-content">
        <h2>{title} {#if comingSoon}<span class="coming-soon-badge">Coming Soon</span>{/if}</h2>
        <p class="project-type">{type}</p>
    </div>
    {#if comingSoon}
        <div class="coming-soon-overlay">
            <span>Coming Soon</span>
        </div>
    {/if}
</a>

<style>
  .project {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    padding: clamp(1.25rem, 3vw, 2.5rem) clamp(1.5rem, 5vw, 4rem);
    border-top: 1px solid rgba(201, 201, 201, 0.3);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .project:last-of-type {
    border-bottom: 1px solid rgba(201, 201, 201, 0.3);
  }

  .project-content {
    width: 100%;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }

  /* Hover effects (desktop only) */
  .project:not(.coming-soon):hover {
    background-color: rgba(255, 255, 255, 0.03);
  }

  .project:not(.coming-soon):hover h2 {
    transform: translateX(10px);
  }

  .project:not(.coming-soon):hover .project-type {
    transform: translateX(-10px);
  }

  .project h2 {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    margin: 0;
    font-weight: 400;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .coming-soon-badge {
    font-size: 0.65em;
    background: rgba(255, 255, 255, 0.1);
    padding: 0.25em 0.75em;
    border-radius: 20px;
    font-weight: 500;
    letter-spacing: 0.5px;
  }

  /* Project type */
  .project-type {
    text-transform: capitalize;
    font-size: clamp(0.8rem, 1.5vw, 0.95rem);
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    color: rgba(255, 255, 255, 0.7);
    margin: 0;
  }

  /* Coming soon overlay */
  .coming-soon-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  .coming-soon-overlay span {
    background: rgba(255, 255, 255, 0.9);
    color: #000;
    padding: 0.5rem 1.25rem;
    border-radius: 20px;
    font-weight: 600;
    font-size: 0.9rem;
    transform: translateY(10px);
    transition: transform 0.3s ease;
  }

  .coming-soon:hover .coming-soon-overlay {
    opacity: 1;
  }

  .coming-soon:hover .coming-soon-overlay span {
    transform: translateY(0);
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .project {
      padding: 1.25rem 1.5rem;
    }

    .project h2 {
      font-size: 1.75rem;
    }

    .project-type {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 480px) {
    .project {
      padding: 1.25rem 1rem;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }

    .project h2 {
      font-size: 1.5rem;
    }

    .project-content {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.25rem;
    }

    .coming-soon-badge {
      margin-top: 0.25rem;
    }
  }

  /* Disable hover effects on touch devices */
  @media (hover: none) {
    .project:not(.coming-soon):hover {
      background: transparent;
    }

    .project:not(.coming-soon):hover h2,
    .project:not(.coming-soon):hover .project-type {
      transform: none;
    }
  }
</style>