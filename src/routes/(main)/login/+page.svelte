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
  <div class="buttons">
    <button class="button" disabled={!$form.email || !$form.password}
      >Login</button
    >
    <button
      formaction="?/signup"
      class=" button"
      disabled={!$form.email || !$form.password}>Sign up</button
    >
  </div>
  {#if $message}
    <div>{$message.message}</div>
  {/if}
</form>

<style>
  .buttons {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: var(--unit-large);
    margin-top: var(--unit-large);
  }
</style>
