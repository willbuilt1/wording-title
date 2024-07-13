<script lang="ts">
  import type { Snippet } from "svelte";
  let { children }: { children: Snippet } = $props();
</script>

<div class="card">
  {@render children()}
</div>

<style>
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--unit-large);
    border-radius: var(--unit-medium);
    background-color: var(--color, var(--primary-color));
  }
</style>
