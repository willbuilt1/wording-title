<script>
  import Button from "$lib/components/Button.svelte";
</script>

<main>
  <h1 class="title">A Wording Title</h1>
  <h2 class="subtitle">The word guessing game</h2>

  <div class="buttons">
    <Button>
      <a href="/categories">Quick Start</a>
    </Button>

    <Button>
      <a href="/login">Login</a>
    </Button>
  </div>
</main>

<style>
  main {
    margin-top: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-left: 16px;
    padding-right: 16px;
    text-align: center;
  }

  h2 {
    margin-top: 16px;
  }

  .buttons {
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
</style>
