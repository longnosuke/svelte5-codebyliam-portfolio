<script>
    import { scale } from 'svelte/transition';
    import gsap from 'gsap';
    let { modal, projects } = $props();

    let modalContainer = $state();
    let cursor = $state();
    let cursorLabel = $state();

    $effect(() => {
        if (!modalContainer || !cursor || !cursorLabel) return;

        let xMoveContainer = gsap.quickTo(modalContainer, "left", { duration: 0.8, ease: "power3" });
        let yMoveContainer = gsap.quickTo(modalContainer, "top", { duration: 0.8, ease: "power3" });

        let xMoveCursor = gsap.quickTo(cursor, "left", { duration: 0.5, ease: "power3" });
        let yMoveCursor = gsap.quickTo(cursor, "top", { duration: 0.5, ease: "power3" });

        let xMoveCursorLabel = gsap.quickTo(cursorLabel, "left", { duration: 0.45, ease: "power3" });
        let yMoveCursorLabel = gsap.quickTo(cursorLabel, "top", { duration: 0.45, ease: "power3" });

        const moveStuff = (e) => {
            const { pageX, pageY } = e;

            const rect = modalContainer.getBoundingClientRect();
            const offsetX = rect.width / 2;
            const offsetY = rect.height / 2;

            xMoveContainer(pageX - offsetX);
            yMoveContainer(pageY - offsetY);

            xMoveCursor(pageX);
            yMoveCursor(pageY);

            xMoveCursorLabel(pageX);
            yMoveCursorLabel(pageY);
        };


        window.addEventListener('mousemove', moveStuff);

        return () => {
            window.removeEventListener('mousemove', moveStuff);
        }
    });
</script>

{#if modal.active}
    <div
            bind:this={modalContainer}
            class="modalContainer"
            transition:scale={{ duration: 400 }}
    >
        <div style="top: {modal.index * -100}%" class="modalSlider">
            {#each projects as project}
                <div
                        class="modal"
                >
                    <img
                            src="/projects/{project.imageUrl}"
                            width="400"
                            alt="project preview"
                    />
                </div>
            {/each}
        </div>
    </div>

    <div
            bind:this={cursor}
            class="cursor"
            transition:scale={{ duration: 400 }}
    ></div>

    <div
            bind:this={cursorLabel}
            class="cursorLabel"
            transition:scale={{ duration: 400 }}
    >
        view
    </div>
{/if}

<style>
  .modalContainer{
    height: 300px;
    width: 450px;
    position: absolute;
    background-color: white;
    overflow: hidden;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modalSlider{
    height: 100%;
    width: 100%;
    position: absolute;
    transition: top 0.5s cubic-bezier(0.76, 0, 0.24, 1);
  }

  .modal{
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #272727;
  }

  .modal img{
    height: auto;
  }

  .cursor, .cursorLabel{
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #ff6b00;
    color: white;
    position: absolute;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
    pointer-events: none;
  }

  .cursorLabel{
    background-color: transparent;
  }

  .cursor, .cursorLabel{
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
</style>