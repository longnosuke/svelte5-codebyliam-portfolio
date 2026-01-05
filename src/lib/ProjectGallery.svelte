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
            url: "",
        },
        {
            title: "Internal Tool",
            type: "internal-app",
            imageUrl: "internal-tool.webp",
            url: "",
        },
        {
            title: "Kit502",
            type: "fullstack",
            imageUrl: "kit502.webp",
            url: "",
        },
        {
            title: "AlphaPak Website",
            type: "wordpress",
            imageUrl: "alphapak.webp",
            url: "",
        },
        {
            title: "An Thanh Commodity",
            type: "wordpress",
            imageUrl: "anthanhcommodity.webp",
            url: "",
        },
        {
            title: "Bep That",
            type: "wordpress",
            imageUrl: "bepthat.webp",
            url: "",
        },
        {
            title: "Co Dong Son",
            type: "wordpress",
            imageUrl: "codongson.webp",
            url: "",
        },
        {
            title: "Dumbbell VN",
            type: "wordpress",
            imageUrl: "dumbbellvn.webp",
            url: "",
        },
        {
            title: "Fata Villa",
            type: "wordpress",
            imageUrl: "fatavilla.webp",
            url: "",
        },
        {
            title: "Glandcore",
            type: "wordpress",
            imageUrl: "glandcore.webp",
            url: "",
        },
        {
            title: "GCO IARC Asia",
            type: "wordpress",
            imageUrl: "gco-iarc-asia.webp",
            url: "",
        },
        {
            title: "Leaparfum",
            type: "wordpress",
            imageUrl: "leaparfum.webp",
            url: "",
        },
        {
            title: "Mid-Man",
            type: "wordpress",
            imageUrl: "mid-man.webp",
            url: "",
        },
        {
            title: "OPK.edu.vn",
            type: "wordpress",
            imageUrl: "opk-edu-vn.webp",
            url: "",
        },
        {
            title: "NuWave Oxygen",
            type: "wordpress",
            imageUrl: "nuwaveoxypure.webp",
            url: "",
        },
        {
            title: "TravelNow VN",
            type: "wordpress",
            imageUrl: "travelnow-vn.webp",
            url: "",
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
  .project-gallery {
    min-height: 100vh;
    width: 100%;
  }

  /* Section heading */
  .section-heading {
    font-family: 'Apparel', sans-serif;
    font-weight: 700;
    color: white;
    display: flex;
    justify-content: center;
    text-align: center;

    /* Responsive font size */
    font-size: clamp(1rem, 8vw, 5rem);
    margin: clamp(1rem, 6vw, 4rem) 0;
  }

  /* Project list spacing */
  .project-gallery > :global(.project) {
    padding: clamp(1rem, 5vw, 3rem)
    clamp(1rem, 8vw, 6rem);
  }

  /* Reduce motion & hover on touch devices */
  @media (hover: none) {
    .project-gallery > :global(.project):hover {
      opacity: 1;
    }
  }

</style>