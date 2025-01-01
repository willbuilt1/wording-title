<script lang="ts">
  import { superForm } from "sveltekit-superforms/client";

  let { data } = $props();
  const { form, errors, constraints, message, enhance } = superForm(data.form);
</script>

<form method="POST" action="?/login" use:enhance>
  <label>
    Email
    <input
      name="email"
      type="email"
      bind:value={$form.email}
      aria-invalid={$errors.email ? "true" : undefined}
      {...$constraints.email}
    />
  </label>
  <label>
    Password
    <input
      name="password"
      type="password"
      bind:value={$form.password}
      aria-invalid={$errors.password ? "true" : undefined}
      {...$constraints.password}
    />
  </label>
  <button>Login</button>
  <button formaction="?/signup">Sign up</button>
  {#if $message}
    <div>{$message.message}</div>
  {/if}
</form>
