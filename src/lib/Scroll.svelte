<script>
    import { onDestroy } from "svelte";

    let isScroll = $state(false);
    const OFFSET = 1000;

    const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        isScroll = scrollTop > OFFSET;
        console.log(isScroll);
    };

    document.addEventListener("scroll", handleScroll);

    onDestroy(() => {
        document.removeEventListener("scroll", handleScroll);
    });
</script>


{#if !isScroll}
    <div class="scroll">
        <div class="box">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
{/if}

<style>
  .scroll{
    position: fixed;
    bottom: 10%;
    left: 50%;
  }

  .box span{
    display: block;
    width: 20px;
    height: 20px;
    border-bottom: 2px solid white;
    border-right: 2px solid white;
    transform: rotate(45deg);
    margin: -10px;
    animation: animate 2s infinite;
  }

  .box span:nth-child(2)
  {
    animation-delay: -0.2s;
  }

  .box span:nth-child(3)
  {
    animation-delay: -0.4s;
  }

  @keyframes animate{
    0%{
      opacity: 0;
      transform: rotate(45deg) translate(-20px, -20px);
    }
    50%{
      opacity: 1;
    }
    100%{
      opacity: 0;
      transform: rotate(45deg) translate(20px, 20px);
    }
  }

  @media (max-width: 768px) {
    .scroll {
      scale: 0.7;
      bottom: 17%;
    }
  }
</style>