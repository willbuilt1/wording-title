<script lang="ts">
  import { superForm } from "sveltekit-superforms";
  import SuperDebug from "sveltekit-superforms";

  export let data;

  console.log(data);

  // Client API:
  const { form, message } = superForm(data.form);
</script>

<SuperDebug data={$form} />

<form method="POST">
  <label for="category">Category</label>
  <input type="text" name="category" bind:value={$form.category} />

  <label for="icon">Icon</label>
  <input type="text" name="icon" bind:value={$form.icon} />

  <div><button>Submit</button></div>
  {#if $message}
    <div>{$message}</div>
  {/if}
</form>

<style>
  form {
    display: grid;
    gap: 1rem;
  }
</style>
