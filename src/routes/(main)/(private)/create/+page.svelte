<script lang="ts">
  import { superForm } from "sveltekit-superforms/client";
  // import SuperDebug from "sveltekit-superforms";

  let { data } = $props();
  let word = $state("");
  const { form, errors, constraints, message, enhance } = superForm(data.form, {
    dataType: "json",
    onError({ result }) {
      $message = result.error.message || "Unknown error";
    },
  });

  function addWord() {
    if (!word) return;
    let words = word.split(",").map((w) => w.trim());
    $form.words = [...$form.words, ...words];
    word = "";
  }
</script>

<!-- <SuperDebug data={$form} /> -->

<h2>Create your category</h2>

<form method="POST" use:enhance>
  <label for="category"
    >Category name
    <input
      type="text"
      name="category"
      placeholder="Category name"
      bind:value={$form.category}
      aria-invalid={$errors.category ? "true" : undefined}
    />
  </label>
  {#if $errors.category}<span class="invalid">{$errors.category}</span>{/if}

  <label for="icon"
    >Icon
    <input
      type="text"
      name="icon"
      bind:value={$form.icon}
      aria-invalid={$errors.icon ? "true" : undefined}
      {...$constraints.icon}
    />
    {#if $errors.icon}<span class="invalid">{$errors.icon}</span>{/if}
  </label>

  <h3>Add your words</h3>
  <ul>
    {#each $form.words as word, i}
      <li>{word}</li>
    {/each}
  </ul>
  <label>
    <input
      type="text"
      bind:value={word}
      placeholder="single word or comma separated list"
      max="100"
    />
  </label>
  <button onclick={addWord} type="button" class="button" disabled={!word}
    >Add</button
  >

  <hr />
  <button
    type="submit"
    class="button"
    disabled={!$form.category || !$form.icon || !$form.words.length}
    >Submit</button
  >

  {#if $message}
    <div>{$message}</div>
  {/if}
</form>

<style>
  h3 {
    margin-top: var(--unit-large);
  }
  form {
    display: flex;
    flex-direction: column;
  }
  button {
    margin-top: var(--unit-medium);
  }

  hr {
    margin-block: var(--unit-large);
    background-color: var(--primary-white);
  }
  ul {
    display: grid;
    grid-template-columns: auto auto;
  }
</style>
