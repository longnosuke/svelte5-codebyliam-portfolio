<script lang="ts">
    let { index, title, type, url, setModal } = $props();
</script>

<a href={url}
    onmouseenter={() => setModal({ active: true, index })}
    onmouseleave={() => setModal({ active: false, index })}
    class="project"
>
    <h2>{title}</h2>
    <p class="project-type">{type}</p>
</a>

<style>
  .project {
    display: flex;
    justify-content: space-between;
    align-items: center;

    /* Responsive padding */
    padding: clamp(1.5rem, 5vw, 3rem)
    clamp(1.5rem, 8vw, 6.25rem);

    border-top: 1px solid rgb(201, 201, 201);
    cursor: pointer;
    transition: opacity 0.2s;
  }

  .project:last-of-type {
    border-bottom: 1px solid rgb(201, 201, 201);
  }

  /* Hover effects (desktop only) */
  .project:hover {
    opacity: 0.5;
  }

  .project:hover h2 {
    transform: translateX(-10px);
  }

  .project:hover p {
    transform: translateX(10px);
  }

  .project h2 {
    font-size: clamp(1.75rem, 5vw, 3.125rem);
    margin: 0;
    font-weight: 400;
    transition: transform 0.4s;
  }

  /* Type */
  .project-type {
    text-transform: capitalize;
    font-size: clamp(0.8rem, 2vw, 1rem);
    transition: transform 0.4s;
  }
  @media (max-width: 640px) {
    .project {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.75rem;
    }

    .project:hover {
      opacity: 1;
    }

    .project:hover h2,
    .project:hover p {
      transform: none;
    }
  }

  /* Disable hover effects on touch devices */
  @media (hover: none) {
    .project:hover {
      opacity: 1;
    }

    .project:hover h2,
    .project:hover p {
      transform: none;
    }
  }
</style>