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
    border: solid 4px var(--color, var(--primary-color));
    background-color: var(--primary-white);
    padding: var(--unit-medium);
    outline: solid 4px var(--primary-white);
    overflow: hidden;
  }
</style>
