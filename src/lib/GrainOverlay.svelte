<script lang="ts">
    import images from '../types/images';
</script>

<div class="grain-overlay" style="background-image: url({images.grain});"></div>

<style>
  .grain-overlay {
    pointer-events: none;
    position: fixed;
    left: -50%;
    top: -100%;
    z-index: 50;
    width: 300%;
    height: 300%;
    background-position: center;
    background-size: cover;
    opacity: 0.1;
    animation: grain 2s steps(10) infinite;
  }

  @keyframes grain {
    0%, 100% { transform: translate(0, 0); }
    10% { transform: translate(-5%, -10%); }
    20% { transform: translate(-15%, 5%); }
    30% { transform: translate(7%, -25%); }
    40% { transform: translate(-5%, 25%); }
    50% { transform: translate(-15%, 10%); }
    60% { transform: translate(15%, 0%); }
    70% { transform: translate(0%, 15%); }
    80% { transform: translate(3%, 25%); }
    90% { transform: translate(-10%, 10%); }
  }
</style>
