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
    /* border: solid 4px var(--color, var(--primary-color)); */
    /* background-color: var(--primary-white); */
    /* background: rgb(245, 245, 220); */
    background: linear-gradient(
      69deg,
      var(--primary-white) 0%,
      var(--color, var(--primary-color)) 100%
    );

    /* outline: solid 4px var(--primary-white); */
    overflow: hidden;
  }
</style>
