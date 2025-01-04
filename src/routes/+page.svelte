<script>
  const { data } = $props();
  let { supabase, user } = $derived(data);

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
  };
</script>

<main class="fadeIn">
  <h1 class="headline">Wording Title</h1>
  <h2>The word guessing game</h2>

  <div class="buttons">
    <a href="/categories" class="button"
      >{user ? "Start game" : "Quick Start"}</a
    >
    <a href="/settings" class="button">Settings</a>
    {#if user}
      <a href="/create" class="button">Create category</a>
    {/if}
    {#if user}
      <button class="button" onclick={logout}>Logout</button>
    {:else}
      <a href="/login" class="button">Login</a>
    {/if}
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-left: 16px;
    padding-right: 16px;
    text-align: center;
    height: 100vh;
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
