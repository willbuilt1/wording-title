<!-- <script lang="ts">
  import { superForm } from "sveltekit-superforms";

  let { data } = $props();
  const { form, errors, constraints, message, enhance } = superForm(data.form);
  //            ^^^^^^  ^^^^^^^^^^^  ^^^^^^^
</script>

{#if $message}<h3>{$message}</h3>{/if}

<form method="POST" use:enhance>
  <label for="name">Name</label>
  <input
    type="text"
    name="name"
    aria-invalid={$errors.name ? "true" : undefined}
    bind:value={$form.name}
    {...$constraints.name}
  />
  {#if $errors.name}<span class="invalid">{$errors.name}</span>{/if}

  <label for="email">E-mail</label>
  <input
    type="email"
    name="email"
    aria-invalid={$errors.email ? "true" : undefined}
    bind:value={$form.email}
    {...$constraints.email}
  />
  {#if $errors.email}<span class="invalid">{$errors.email}</span>{/if}

  <div><button>Submit</button></div>
</form>

<style>
  .invalid {
    color: red;
  }
</style> -->
<form method="POST" action="?/login">
  <label>
    Email
    <input name="email" type="email" />
  </label>
  <label>
    Password
    <input name="password" type="password" />
  </label>
  <button>Login</button>
  <button formaction="?/signup">Sign up</button>
</form>
