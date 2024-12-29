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
    background: linear-gradient(
      69deg,
      var(--primary-white) 0%,
      var(--color, var(--primary-color)) 100%
    );
    height: 100%;

    /* outline: solid 4px var(--primary-white); */
    overflow: hidden;
  }
</style>
