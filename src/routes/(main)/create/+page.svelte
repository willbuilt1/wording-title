<script lang="ts">
  import { superForm } from "sveltekit-superforms/client";
  import SuperDebug from "sveltekit-superforms";

  let { data } = $props();
  let word = $state("");
  const { form, errors, constraints, message, enhance } = superForm(data.form, {
    dataType: "json",
    onError({ result }) {
      $message = result.error.message || "Unknown error";
    },
  });

  function addWord() {
    $form.words = [...$form.words, word];
    word = "";
  }
</script>

<SuperDebug data={$form} />

<h2>Name your category</h2>

<form method="POST" use:enhance>
  <label for="category">Category</label>
  <input
    type="text"
    name="category"
    placeholder="Category name"
    bind:value={$form.category}
    aria-invalid={$errors.category ? "true" : undefined}
  />
  {#if $errors.category}<span class="invalid">{$errors.category}</span>{/if}

  <label for="icon">Icon</label>
  <input
    type="text"
    name="icon"
    bind:value={$form.icon}
    aria-invalid={$errors.icon ? "true" : undefined}
    {...$constraints.icon}
  />
  {#if $errors.icon}<span class="invalid">{$errors.icon}</span>{/if}
  <button type="submit">Submit</button>

  <!-- <input type="text" hidden bind:value={$form.words} /> -->

  <h2>Add your words</h2>
  <input
    type="text"
    bind:value={word}
    placeholder="single word or comma separated list"
    max="100"
  />
  <button onclick={addWord} type="button">Add</button>

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
