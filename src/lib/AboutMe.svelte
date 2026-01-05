<script>
    import ClickMe from "./ClickMe.svelte";
</script>
<a id="about-me" class="section-heading">ABOUT ME</a>
<div class="container">
    <h1>About me</h1>
    <div class="card hero">
        <div>fullstack web developer based in Vietnam.</div>
        <div class="icon-spiral"></div>
    </div>

    <div class="card click-me">
        <ClickMe />
    </div>
</div>

<style>
  .section-heading {
    font-size: 5rem;
    text-align: center;
    font-family: 'Apparel', sans-serif;
    font-weight: bold;
    color: white;
    display: flex;
    justify-content: center;
    margin-top: 10rem;
  }

  .container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 50px 100px 50px 100px;
    gap: 15px;
    margin: 0 auto;
  }

  .card {
    border-radius: 24px;
    padding: 30px;
    overflow: hidden;
    display: grid;
    align-content: center;
    border: 1px solid rgb(201, 201, 201);
  }

  .hero {
    grid-column: 1 / span 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>