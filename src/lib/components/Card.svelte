<script lang="ts">
  import type { Snippet } from "svelte";
  let { children } = $props<{ children: Snippet }>();
</script>

<div class="card">
  {@render children()}
</div>

<style>
  .card {
    border-radius: var(--unit-medium);
    background-color: var(--color, var(--primary-color));
    padding: var(--unit-medium);
  }
</style>
