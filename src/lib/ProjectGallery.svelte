<script>
    import Project from './Project.svelte'
    import Modal from './Modal.svelte';

    let modal = $state({ active: false, index: 0 });

    function setModal(value) {
        modal = value;
    }

    let projects = [
        {
            title: "Ticket Support",
            type: "fullstack",
            imageUrl: "ticket.webp",
            url: "projects/helpdesk"
        },
        {
            title: "NewstyleDirect",
            type: "wordpress",
            imageUrl: "newstyledirect.webp",
            url: "projects/newstyledirect"
        },
        {
            title: "Universal WP Plugin",
            type: "wordpress",
            imageUrl: "universal-wp-plugin.webp",
            url: "https://github.com/imtbndev/newstyledirect-universal-wp-plugin"
        },
        {
            title: "Migration CI",
            type: "wordpress-tool",
            imageUrl: "migration-ci.webp",
            url: "/",
        },
        {
            title: "Internal Tool",
            type: "internal-app",
            imageUrl: "internal-tool.webp",
            url: "https://tool.newstyledirect.au/",
        },
        {
            title: "Kit502",
            type: "fullstack",
            imageUrl: "kit502.webp",
            url: "#",
        },
        {
            title: "NuWave Oxygen",
            type: "wordpress",
            imageUrl: "nuwaveoxypure.webp",
            url: "https://nuwaveoxypure.com.au/",
        },
        {
            title: "AlphaPak Website",
            type: "wordpress",
            imageUrl: "alphapak.webp",
            url: "https://alphapak.vn/",
        },
        {
            title: "An Thanh Commodity",
            type: "wordpress",
            imageUrl: "anthanhcommodity.webp",
            url: "https://anthanhcommodity.com.vn/",
        },
        {
            title: "Bep That",
            type: "wordpress",
            imageUrl: "bepthat.webp",
            url: "https://bepthat.com/",
        },
        {
            title: "Co Dong Son",
            type: "wordpress",
            imageUrl: "codongson.webp",
            url: "https://codongson.vn/",
        },
        {
            title: "Fata Villa",
            type: "wordpress",
            imageUrl: "fatavilla.webp",
            url: "https://fatavilla.com/",
        },
        {
            title: "GCO IARC Asia",
            type: "wordpress",
            imageUrl: "gco-iarc-asia.webp",
            url: "https://gco.iarc.asia/",
        },
        {
            title: "Leaparfum",
            type: "wordpress",
            imageUrl: "leaparfum.webp",
            url: "https://leaparfum.com/",
        },
        {
            title: "Mid-Man",
            type: "wordpress",
            imageUrl: "mid-man.webp",
            url: "https://mid-man.net/",
        },
        {
            title: "OPK.edu.vn",
            type: "wordpress",
            imageUrl: "opk-edu-vn.webp",
            url: "https://opk.edu.vn/",
        },
        {
            title: "TravelNow VN",
            type: "wordpress",
            imageUrl: "travelnow-vn.webp",
            url: "https://travelnow-vn.com/",
        },
    ];

</script>
<a id="projects" class="section-heading">PROJECTS</a>
<div class="project-gallery">
    {#each projects as project, index}
        <Project
                index={index}
                title={project.title}
                imageUrl={project.imageUrl}
                url={project.url}
                type={project.type}
                {setModal}
        />
    {/each}
</div>
<Modal {modal} {projects} />

<style>
  .section-heading {
    font-family: 'Apparel', sans-serif;
    font-weight: 700;
    color: white;
    display: flex;
    justify-content: center;
    text-align: center;
    box-sizing: border-box;

    /* Responsive font size */
    font-size: clamp(2rem, 8vw, 5rem);
    margin: clamp(1.5rem, 6vw, 4rem) 0;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .project-gallery > :global(.project) {
      padding: 1.5rem 1.5rem;
    }

    .section-heading {
      margin: 2rem 0;
      font-size: 2.5rem;
    }
  }

  @media (max-width: 480px) {
    .project-gallery > :global(.project) {
      padding: 1.25rem 1rem;
    }

    .section-heading {
      font-size: 2rem;
      margin: 1.5rem 0;
    }
  }

  /* Reduce motion & hover on touch devices */
  @media (hover: none) {
    .project-gallery > :global(.project):hover {
      opacity: 1;
    }
  }
</style>